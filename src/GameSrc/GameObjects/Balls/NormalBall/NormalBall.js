import Phaser from "phaser";
import Player from "../../Player/Player.js";
import NormalBallMoveHandler from "./NormalBallMoveHandler.js";
import NormalBallColliders from "./NormalBallColliders.js";
import { NormalBall, BallHitStone, BallHitWall } from "../../../CoreSystem/AssetLoader.js";

const KEYS = {
    NORMAL_BALL: "normal-ball",
    BALL_HIT_WALL_AUDIO: "ball-hit-wall",
    BALL_HIT_STONE_AUDIO: "ball-hit-stone",
}

export default class NormalBallObj {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.DEFAULT_SPEED = 500;
        this.SPEED = this.DEFAULT_SPEED;
        this.BALL_IS_FIRED = false;

        this.BALL_MOVE_X = {
            DEFAULT_LEFT: -1,
            LEFT: -1,
            DEFAULT_RIGHT: 1,
            RIGHT: 1
        };
        this.currentMoveDirectionX = null;

        this.BALL_MOVE_Y = {
            DEFAULT_UP: -1,
            UP: -1,
            DEFAULT_DOWN: 1,
            DOWN: 1
        };
        this.currentMoveDirectionY = null;
    };

    /**Loads the Sprite Objects */
    static loadSprites(sceneIn) {
        /**@type {Phaser.Scene} */
        let scene = sceneIn;
        if (!scene.textures.exists(KEYS.NORMAL_BALL)) scene.load.image(KEYS.NORMAL_BALL, NormalBall);
        
        scene.load.audio(KEYS.BALL_HIT_STONE_AUDIO, BallHitStone);
        scene.load.audio(KEYS.BALL_HIT_WALL_AUDIO, BallHitWall);
    };
    
    /**Create the Ball Game Object */
    create() {
        this.normalBall = this.scene.physics.add.sprite(0, 0, KEYS.NORMAL_BALL);
        this.normalBall.scale = this.normalBall.scale / 6
        
        this.glow = this.normalBall.postFX.addGlow("0x39FF14" , 0, undefined, undefined, undefined, 20)
        this.normalBall.postFX.addShadow(-1, 1, 0.02)
        
        this.ballHitStoneAudio = this.scene.sound.add(KEYS.BALL_HIT_STONE_AUDIO);
        this.ballHitWallAudio = this.scene.sound.add(KEYS.BALL_HIT_WALL_AUDIO);
    };
    
    addPlayerRef(playerRef, mapRef) {
        /**@type {Player} */
        this.playerRef = playerRef;
        this.mapRef = mapRef;
    };
    
    addNormalBallCollider() {
        NormalBallColliders.addCollider(this);
    };

    changeSpeedRandom() {
        NormalBallMoveHandler.changeSpeedRandom(this);
    };
    
    invertBallVelocityDirection() {
        NormalBallMoveHandler.invertBallVelocityDirection(this);
    };

    playSound(soundToPlay) {
        switch (soundToPlay) {
            case KEYS.BALL_HIT_WALL_AUDIO:
                this.ballHitWallAudio.play();
                break;
                
            case KEYS.BALL_HIT_STONE_AUDIO:
                this.ballHitStoneAudio.play();
                break;
        };
    };

    /**Inverts the Ball Move in the Opposite Direction UP and DOWN.
     * 
     * Also Changes LEFT and RIGHT Randomly, (It should use at collition!!!)
     */

    glowChanger(delta) {
        if (this.glow.outerStrength === undefined) {
            this.glow.outerStrength = 0;
            this.glowIncreasing = true;
        }
        let glowChange = delta / 250;
        if (this.glowIncreasing) {
            this.glow.outerStrength += glowChange;
            if (this.glow.outerStrength >= 5) {
                this.glow.outerStrength = 5;
                this.glowIncreasing = false;
            }
        } else {
            this.glow.outerStrength -= glowChange;
            if (this.glow.outerStrength <= 0) {
                this.glow.outerStrength = 0;
                this.glowIncreasing = true;
            }
        }
    }
    
    fireBall() {
        this.currentMoveDirectionX = this.BALL_MOVE_X.RIGHT;
        this.currentMoveDirectionY = this.BALL_MOVE_Y.UP;
        this.BALL_IS_FIRED = true;
    }

    checkIfBallIsfired() {
        if (!this.BALL_IS_FIRED) {
            this.normalBall.x = this.playerRef.playerPaddle.x;
            this.normalBall.y = this.playerRef.playerPaddle.y - 70;
        }
    }
    
    update(time, delta) {
        NormalBallMoveHandler.checkBallMove(this);
        this.glowChanger(delta);
        this.checkIfBallIsfired();
    }
}