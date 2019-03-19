import PlatformerScene from "./platformer-scene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  backgroundColor: "#1d212d",
  scene: PlatformerScene,
  pixelArt: true,
  physics: {
    default: "matter",
    matter: {
      debug: true
    }
  }
};

const game = new Phaser.Game(config);
