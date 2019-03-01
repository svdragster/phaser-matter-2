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
    }

    update() {

    }

    destroy() {
        this.sprite.destroy();
    }
}
