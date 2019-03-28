class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    this.load.spritesheet("Water", "assets/Water.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("Sand", "assets/Sand.png");
    this.load.image('Sea', 'assets/Sea.png');
    this.load.image("Grass", "assets/Grass.png");
    this.load.image("Tree1", "assets/Tree1.png");
    this.load.image("Tree2", "assets/Tree2.png");
    this.load.image("Tree3", "assets/Tree3.png");
    this.load.image("Boat1", "assets/Boat1.png");
    this.load.image("Boat2", "assets/Boat2.png");
    noise.seed(Math.random());

  }

  create() {
    this.chunkSize = 16;
    this.tileSize = 16;
    this.cameraSpeed = 10;

    this.followPoint = new Phaser.Math.Vector2(
      this.cameras.main.worldView.x + (this.cameras.main.worldView.width * 0.5),
      this.cameras.main.worldView.y + (this.cameras.main.worldView.height * 0.5)
    );

    this.chunks = [];

    this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  getChunk(x, y) {
    var chunk = null;
    for (var i = 0; i < this.chunks.length; i++) {
      if (this.chunks[i].x == x && this.chunks[i].y == y) {
        chunk = this.chunks[i];
      }
    }
    return chunk;
  }

  update() {

    var snappedChunkX = (this.chunkSize * this.tileSize) * Math.round(this.followPoint.x / (this.chunkSize * this.tileSize));
    var snappedChunkY = (this.chunkSize * this.tileSize) * Math.round(this.followPoint.y / (this.chunkSize * this.tileSize));

    snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize;
    snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize;

    for (var x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
      for (var y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
        var existingChunk = this.getChunk(x, y);

        if (existingChunk == null) {
          var newChunk = new Chunk(this, x, y);
          this.chunks.push(newChunk);
        }
      }
    }

    for (var i = 0; i < this.chunks.length; i++) {
      var chunk = this.chunks[i];

      if (Phaser.Math.Distance.Between(
        snappedChunkX,
        snappedChunkY,
        chunk.x,
        chunk.y
      ) < 3) {
        if (chunk !== null) {
          chunk.load();
        }
      }
      else {
        if (chunk !== null) {
          chunk.unload();
        }
      }
    }

    if (this.keyUP.isDown) {
      this.followPoint.y -= this.cameraSpeed;
    }
    if (this.keyDOWN.isDown) {
      this.followPoint.y += this.cameraSpeed;
    }
    if (this.keyLEFT.isDown) {
      this.followPoint.x -= this.cameraSpeed;
    }
    if (this.keyRIGHT.isDown) {
      this.followPoint.x += this.cameraSpeed;
    }

    this.cameras.main.centerOn(this.followPoint.x, this.followPoint.y);
  }
}