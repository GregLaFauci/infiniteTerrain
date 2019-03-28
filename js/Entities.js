class Chunk {
    constructor(scene, x, y) {
      this.scene = scene;
      this.x = x;
      this.y = y;
      this.tiles = this.scene.add.group();
      this.isLoaded = false;
    }
  
    unload() {
      if (this.isLoaded) {
        this.tiles.clear(true, true);
        this.isLoaded = false;
      }
    }

    load() {
      if (!this.isLoaded) {
        for (var x = 0; x < this.scene.chunkSize; x++) {
          for (var y = 0; y < this.scene.chunkSize; y++) {
  
            var tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
            var tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);
  
            var value = noise.perlin2(tileX / 150, tileY / 150);
  
            var key = "";
  
            if (between(value, -1, -0.15)) {
              key = "Grass";
              var tile = new Tile(this.scene, tileX, tileY, key, (Math.abs(value + 1.5)));
              this.tiles.add(tile)
            }
            else if (between(value, -0.15, -0.1)) {
              key = "Sand";
              var tile = new Tile(this.scene, tileX, tileY, key, 1);
              this.tiles.add(tile)
            }
            else {
              key = "Sea";
              var tile = new Tile(this.scene, tileX, tileY, key, (Math.abs(1 - (value/2))));
              this.tiles.add(tile)
              
          }

          if (between(value, 0.2, 0.21)) {
            key = "Boat1"
            var tile = new Tile(this.scene, tileX, tileY, key, 1);
            this.tiles.add(tile)
          }
          else if (between(value, 0.21, 0.215)) {
            key = "Boat2"
            var tile = new Tile(this.scene, tileX, tileY, key, 1);
            this.tiles.add(tile)
          }
          else if (between(value, -1, -0.5)) {
              let value2 = value.toString().slice(-1);
              if (value2 > 6) {
                key = "Tree1"
                  var tile = new Tile(this.scene, tileX, tileY, key, 1);
                  this.tiles.add(tile)
              }
              else if (value2 > 3) {
                key = "Tree2"
              var tile = new Tile(this.scene, tileX, tileY, key, 1);
              this.tiles.add(tile)
              }
              else {
                key = "Tree3"
              var tile = new Tile(this.scene, tileX, tileY, key);
              this.tiles.add(tile)
              }
          }
        }
      }
      this.isLoaded = true;
    }
  }
}

  
class Tile extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, value) {
    super(scene, x, y, key);
    this.scene = scene;
    this.alpha = value;
    this.scene.add.existing(this);
    this.setOrigin(0);
  }
}

function between(value1, value2, value3) {
  return (value2 < value1 && value1 < value3)
}