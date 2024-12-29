import Phaser from "phaser";
import NormalBallObj from "../Balls/NormalBall/NormalBall";
import { PlayerNormalPaddel, PlayerPaddelSheet } from "../../CoreSystem/AssetLoader";
import GAME_DATA from "../../CoreSystem/MainGameHandler";

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
        this.PlayerLifes = 0;

        this.DEAD_LOOP = {
            deadLoopStart: false,
            paddelBreakAnimPlaying: false,
            isGameOver: false,
            isDelayCalled: false,
        }

        this.MOVE_STATES = {
            HOLD: 0,
            LEFT: -1,
            RIGHT: 1,
        };
        this.currentMoveState = 0;

        this.PLAYER_SKILLS = {
            aiPlayer: false,
        };
    };

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static loadSprites(scene) {
        if (!scene.textures.exists(KEYS.PLAYER)) scene.load.image(KEYS.PLAYER, PlayerNormalPaddel);
        if (!scene.textures.exists("paddel-break")) scene.load.spritesheet("paddel-break", PlayerPaddelSheet, {
            frameWidth: 698, frameHeight: 216
        });
    };

    setAiPlayerActive(bool) {
        this.aiPlayerIsActive = bool;
    };

    animations() {
        if (!this.scene.anims.exists("paddel-break")) this.paddelBreakAnim = this.scene.anims.create({
            key: "paddel-break",
            frames: this.scene.anims.generateFrameNumbers("paddel-break", {
                start: 0,
                end: 14,
            }),
            frameRate: 20,
            repeat: 0
        });
    };

    create(x, y) {
        this.playerPaddle = this.scene.physics.add.sprite(x, y, KEYS.PLAYER);
        this.playerPaddle.postFX.addShadow(-1, 1, 0.015);
        this.glow = this.playerPaddle.preFX.addGlow("0xFF4433" , 10, undefined, undefined, undefined, 20);
        this.glow.active = false;
        this.playerPaddle.scale = this.playerPaddle.scale / 3;

        this.animations();

        this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.SpaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    };

    addBallRef(data) {
        /**@type {NormalBallObj} */
        this.ballRef = data;
    };

    addMapRef(mapRef) {
        this.mapRef = mapRef;
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
    };

    aiPlayer() {
        if (this.ballRef) {
            if (this.ballRef.normalBall.x > this.playerPaddle.x + 50) {
                this.currentMoveState = this.MOVE_STATES.RIGHT;
            } else if (this.ballRef.normalBall.x < this.playerPaddle.x - 50) {
                this.currentMoveState = this.MOVE_STATES.LEFT;
            } else {
                this.currentMoveState = this.MOVE_STATES.HOLD;
            };
        };
    };

    glowHandler() {
        if (this.glowIsActive) {
            this.glow.active = true;
        };
        if (!this.glowIsActive) {
            this.glow.active = false;
        };
    };

    glowTrigger() {
        this.glowIsActive = !this.glowIsActive;
    };

    fireBall() {
        if (this.ballRef && !this.ballRef.BALL_IS_FIRED) {
            this.ballRef.fireBall();
        };
    };

    checkFireBall() {
        if (this.SpaceKey.isDown && !this.spaceKeyIsDown) {
            this.spaceKeyIsDown = true;
            this.fireBall();
        };
    };

    destoryPaddel() {
        if (!this.playerPaddle.anims.isPlaying && !this.DEAD_LOOP.paddelBreakAnimPlaying) {
            this.DEAD_LOOP.paddelBreakAnimPlaying = true;
            this.currentMoveState = this.MOVE_STATES.HOLD;
            this.ballRef.normalBall.setVelocity(0);
            this.ballRef.currentMoveDirectionX = null;
            this.ballRef.currentMoveDirectionY = null;
            this.ballRef.normalBall.y = 0;
            this.ballRef.normalBall.x = - 1000;
            this.playerPaddle.anims.play(this.paddelBreakAnim);
        };
        let paddelProgress = this.playerPaddle.anims.getProgress();
        if (paddelProgress == 1 && !this.DEAD_LOOP.isGameOver && !this.DEAD_LOOP.isDelayCalled) {
            this.DEAD_LOOP.isDelayCalled = true;
            this.scene.time.delayedCall(1000, () => {
                this.playerPaddle.setFrame(0);
                this.ballRef.BALL_IS_FIRED = false;
                GAME_DATA.PLAYER_STATES.PLAYER_LIFES -= 1;
                this.DEAD_LOOP.deadLoopStart = false;
                this.DEAD_LOOP.paddelBreakAnimPlaying = false;
                this.DEAD_LOOP.isDelayCalled = false;
                this.spaceKeyIsDown = false;
                this.checkGameOver();
            });
        };
    };

    checkGameOver() {
        if (GAME_DATA.PLAYER_STATES.PLAYER_LIFES <= 0) {
            GAME_DATA.GAME_SCORE_SYSTEM.CURRENT_SCORE = 0;
            GAME_DATA.PLAYER_STATES.PLAYER_LIFES = GAME_DATA.PLAYER_STATES.DEFAULT_PLAYER_LIFES;
            this.mapRef.audio.stop()
            this.mapRef.isAudioStoped = true;
            GAME_DATA.SCENE_REFS.SCENE_LOADER_REF.loadTitelScene(GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE);
            
        }
    };

    update(delta, time) {
        this.glowHandler();
        this.checkFireBall();
        if (this.aiPlayerIsActive) {
            if (!this.DEAD_LOOP.paddelBreakAnimPlaying) this.aiPlayer();
            this.movementMachineAI();
        } else {
            if (!this.DEAD_LOOP.paddelBreakAnimPlaying) this.checkCurrentMoveKey();
            this.movementMachine();
        };
        this.deadLoopHandler();
    };

    deadLoopHandler() {
        if (this.ballRef.normalBall.y >= 1200) {
            this.DEAD_LOOP.deadLoopStart = true;
        };
        if (this.DEAD_LOOP.deadLoopStart) {
            this.destoryPaddel();
        };
    }
};