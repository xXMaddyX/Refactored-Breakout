import Phaser from "phaser";
import NormalBallObj from "../Balls/NormalBall/NormalBall";
import { PlayerNormalPaddel } from "../../CoreSystem/AssetLoader";

const KEYS = {
    PLAYER: "player-paddle"
}

export default class Player  {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.maxLeft = 0;
        this.maxRight = 0;
        this.SPEED = 1500;
        this.aiPlayerIsActive = null;
        this.glowIsActive = false;

        this.MOVE_STATES = {
            HOLD: 0,
            LEFT: -1,
            RIGHT: 1,
        };
        this.currentMoveState = 0;

        this.PLAYER_SKILLS = {
            aiPlayer: false,
        }

        this.is
    };

    static loadSprites(scene) {
        if (!scene.textures.exists(KEYS.PLAYER)) scene.load.image(KEYS.PLAYER, PlayerNormalPaddel);
    };

    setAiPlayerActive(bool) {
        this.aiPlayerIsActive = bool;
    };

    animations() {

    };

    create(x, y) {
        this.playerPaddle = this.scene.physics.add.sprite(x, y, KEYS.PLAYER);
        this.playerPaddle.postFX.addShadow(-1, 1, 0.015)
        this.glow = this.playerPaddle.preFX.addGlow("0xFF4433" , 10, undefined, undefined, undefined, 20)
        this.glow.active = false;
        this.playerPaddle.scale = this.playerPaddle.scale / 3

        this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.SpaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    };

    addBallRef(data) {
        /**@type {NormalBallObj} */
        this.ballRef = data;
    }

    checkCurrentMoveKey() {
        if (this.leftKey.isDown) {
            this.currentMoveState = this.MOVE_STATES.LEFT
        } else if (this.rightKey.isDown) {
            this.currentMoveState = this.MOVE_STATES.RIGHT
        } else {
            this.currentMoveState = this.MOVE_STATES.HOLD
        };
    };

    movementMachine() {
        switch (this.currentMoveState) {
            case this.MOVE_STATES.HOLD:
                this.playerPaddle.setVelocityX(0);
                this.playerPaddle.setAccelerationX(0);
                break;

            case this.MOVE_STATES.LEFT:
                this.playerPaddle.setVelocityX(this.MOVE_STATES.LEFT * this.SPEED);
                break;

            case this.MOVE_STATES.RIGHT:
                this.playerPaddle.setVelocityX(this.MOVE_STATES.RIGHT * this.SPEED);
        };
    };

    movementMachineAI() {
        switch (this.currentMoveState) {
            case this.MOVE_STATES.HOLD:
                this.playerPaddle.setVelocityX(this.ballRef.normalBall.body.velocity.x);
                this.playerPaddle.setAccelerationX(0)
                break;

            case this.MOVE_STATES.LEFT:
                if (this.playerPaddle.body.velocity.x < this.SPEED) {
                    this.playerPaddle.setAccelerationX(this.MOVE_STATES.LEFT * this.SPEED);
                }
                break;

            case this.MOVE_STATES.RIGHT:
                if (this.playerPaddle.body.velocity.x < this.SPEED) {
                    this.playerPaddle.setAccelerationX(this.MOVE_STATES.RIGHT * this.SPEED);
                }
                break;
        };
    }

    aiPlayer() {
        if (this.ballRef) {
            if (this.ballRef.normalBall.x > this.playerPaddle.x + 50) {
                this.currentMoveState = this.MOVE_STATES.RIGHT;
            } else if (this.ballRef.normalBall.x < this.playerPaddle.x - 50) {
                this.currentMoveState = this.MOVE_STATES.LEFT;
            } else {
                this.currentMoveState = this.MOVE_STATES.HOLD;
            }
        }
    }

    glowHandler() {
        if (this.glowIsActive) {
            this.glow.active = true;
        }
        if (!this.glowIsActive) {
            this.glow.active = false;
        }
    }

    glowTrigger() {
        this.glowIsActive = !this.glowIsActive;
    }

    fireBall() {
        if (this.ballRef && !this.ballRef.BALL_IS_FIRED) {
            this.ballRef.fireBall();
        }
    }

    checkFireBall() {
        if (this.SpaceKey.isDown && !this.spaceKeyIsDown) {
            this.spaceKeyIsDown = true;
            this.fireBall();
        }
    }

    update(delta, time) {
        this.glowHandler();
        this.checkFireBall();
        if (this.aiPlayerIsActive) {
            this.aiPlayer();
            this.movementMachineAI();
        } else {
            this.checkCurrentMoveKey();
            this.movementMachine();
        }
        
    };
};