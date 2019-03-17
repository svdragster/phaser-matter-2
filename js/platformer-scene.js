import Player from "./player.js";

/**
* A class that extends Phaser.Scene and wraps up the core logic for the platformer level.
*/
export default class PlatformerScene extends Phaser.Scene {
    preload() {
        this.load.spritesheet(
            "player",
            "../assets/player.png",
            {
                frameWidth: 32,
                frameHeight: 32,
                margin: 1,
                spacing: 2
            }
        );
        this.load.image("platform", "../assets/platform.png");
    }

    create() {
        let spawnPoint = {x: 50, y: 50}
        this.player = new Player(this, spawnPoint.x, spawnPoint.y);

        // Collide the player against the ground layer - here we are grabbing the sprite property from
        // the player (since the Player class is not a Phaser.Sprite).
        //this.groundLayer.setCollisionByProperty({ collides: true });
        //this.physics.world.addCollider(this.player.sprite, this.groundLayer);

        this.cameras.main.startFollow(this.player.sprite);
        //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Help text that has a "fixed" position on the screen
        this.add.text(16, 16, "Arrow keys or WASD to move & jump", {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
        })
        .setScrollFactor(0);
    }

    update(time, delta) {
        // Allow the player to respond to key presses and move itself
        this.player.update();

        /*if (this.player.sprite.y > this.groundLayer.height) {
            this.player.destroy(); this.scene.restart();
        }*/
    }
}
