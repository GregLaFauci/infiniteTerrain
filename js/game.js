var config = {
  type: Phaser.WEBGL,
  width: 640,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [
    SceneMain
  ],
  pixelArt: true,
  zoom: 1.5,
  roundPixels: true
};

var game = new Phaser.Game(config);