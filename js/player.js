import MultiKey from "./multi-key.js";

export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        // Create the animations we need from the player spritesheet
        const anims = scene.anims;
        anims.create({
          key: "player-idle",
          frames: anims.generateFrameNumbers("player", { start: 0, end: 3 }),
          frameRate: 3,
          repeat: -1
        });
        anims.create({
          key: "player-run",
          frames: anims.generateFrameNumbers("player", { start: 8, end: 15 }),
          frameRate: 12,
          repeat: -1
        });

        // Track the keys
        const { LEFT, RIGHT, UP, A, D, W } = Phaser.Input.Keyboard.KeyCodes;
        this.leftInput = new MultiKey(scene, [LEFT, A]);
        this.rightInput = new MultiKey(scene, [RIGHT, D]);
        this.jumpInput = new MultiKey(scene, [UP, W]);

        this.scene.events.on("update", this.update, this);

        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.matter.add.sprite(x, y, "player", 0);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter; // Native Matter modules
        const { width: w, height: h } = this.sprite;
        const mainBody = Bodies.rectangle(0, 0, w * 0.6, h, { chamfer: { radius: 10 } });
        this.sensors = {
            bottom: Bodies.rectangle(0, h * 0.5, w * 0.25, 2, { isSensor: true }),
            left: Bodies.rectangle(-w * 0.35, 0, 2, h * 0.5, { isSensor: true }),
            right: Bodies.rectangle(w * 0.35, 0, 2, h * 0.5, { isSensor: true })
        };
        const compoundBody = Body.create({
            parts: [mainBody, this.sensors.bottom, this.sensors.left, this.sensors.right],
            frictionStatic: 0,
            frictionAir: 0.02,
            friction: 0.1
        });
        this.sprite
            .setExistingBody(compoundBody)
            .setScale(2)
            .setFixedRotation() // Sets inertia to infinity so the player can't rotate
            .setPosition(x, y);

        // Track which sensors are touching something
        this.isTouching = { left: false, right: false, ground: false };
    }

    update() {
        //if (this.destroyed) return;

        const sprite = this.sprite;
        const velocity = sprite.body.velocity;
        const isRightKeyDown = this.rightInput.isDown();
        const isLeftKeyDown = this.leftInput.isDown();
        const isJumpKeyDown = this.jumpInput.isDown();
        //const isOnGround = this.isTouching.ground;
        //const isInAir = !isOnGround;

        // --- Move the player horizontally ---

        // Adjust the movement so that the player is slower in the air
        //const moveForce = isOnGround ? 0.01 : 0.005;
        const moveForce = 0.01;

        if (isLeftKeyDown) {
            sprite.setFlipX(true);

            // Don't let the player push things left if they in the air
            //if (!(isInAir && this.isTouching.left)) {
                sprite.applyForce({ x: -moveForce, y: 0 });
            //}
        } else if (isRightKeyDown) {
            sprite.setFlipX(false);

            // Don't let the player push things right if they in the air
            //if (!(isInAir && this.isTouching.right)) {
                sprite.applyForce({ x: moveForce, y: 0 });
            //}
        }

        // Limit horizontal speed, without this the player's velocity would just keep increasing to
        // absurd speeds. We don't want to touch the vertical velocity though, so that we don't
        // interfere with gravity.
        if (velocity.x > 7) sprite.setVelocityX(7);
        else if (velocity.x < -7) sprite.setVelocityX(-7);

        // --- Move the player vertically ---

        if (isJumpKeyDown && this.canJump/* && isOnGround*/) {
            sprite.setVelocityY(-11);

            // Add a slight delay between jumps since the bottom sensor will still collide for a few
            // frames after a jump is initiated
            this.canJump = false;
            this.jumpCooldownTimer = this.scene.time.addEvent({
              delay: 250,
                callback: () => (this.canJump = true)
            });
        }

        // Update the animation/texture based on the state of the player's state
        /*if (isOnGround) {
            if (sprite.body.force.x !== 0) sprite.anims.play("player-run", true);
            else sprite.anims.play("player-idle", true);
        } else {
            sprite.anims.stop();
            sprite.setTexture("player", 10);
        }*/
    }

    destroy() {
        this.sprite.destroy();
    }
}
