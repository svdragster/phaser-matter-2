export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        // Track the arrow keys & WASD
        const { LEFT, RIGHT, UP, W, A, D } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
          left: LEFT,
          right: RIGHT,
          up: UP,
          w: W,
          a: A,
          d: D
        });

        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.matter.add.sprite(x, y, "player", null);
    }

    update() {

    }

    destroy() {
        this.sprite.destroy();
    }
}
