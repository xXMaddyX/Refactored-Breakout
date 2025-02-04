import Phaser from "phaser";
import NormalBallObj from "../Balls/NormalBall/NormalBall";
import GAME_DATA from "../../CoreSystem/MainGameHandler";
import { NormalTrippleStoneSprite, NormalStoneHitAudio } from "../../CoreSystem/AssetLoader";

const KEYS = {
    NORMAL_TRIPPLE_STONE: "normal-tripple-stone",
    NORMAL_STONE_HIT_AUDIO: "normal-stone-audio"
}

export default class TrippleBallStone {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.HP = 1;
        this.isDestroyed = false;
        this.isCollidet = false;
        this.score = 50;
        this.colliderPool = [];
        this.splitBallisCalled = false;
    };

    static loadSprite(sceneIn) {
        /**@type {Phaser.Scene} */
        let scene = sceneIn;
        if (!scene.textures.exists("normal-tripple-stone")) scene.load.image("normal-tripple-stone", NormalTrippleStoneSprite);
        scene.load.audio("normal-stone-audio", NormalStoneHitAudio);
    };

    takeDamage() {
        this.HP -= 1;
    };

    ceckDead() {
        if (this.HP <= 0) {
            for (let collider of this.colliderPool) {
                if (!this.splitBallisCalled) {
                    this.callSceneSplitBall();
                };
                collider.destroy();
            };
            this.normalTrippleStone.destroy();
            this.isDestroyed = true;
        } else {
            return;
        };
    };

    callSceneSplitBall() {
        let positionObj = {
            posX: this.normalTrippleStone.x,
            posY: this.normalTrippleStone.y
        }
        this.scene.ballSplitter(positionObj);
    };

    /**
     * 
     * @param {NormalBallObj} ballRef 
     */
    addOverlapBall(ballRef) {
        let collider = this.scene.physics.add.collider(ballRef.normalBall, this.normalTrippleStone, () => {
            if (!this.isCollidet) {
                this.isCollidet = true;
                this.hitAudio.play();
                ballRef.invertBallVelocityDirection();
                ballRef.changeSpeedRandom();
                GAME_DATA.GAME_SCORE_SYSTEM.CURRENT_SCORE += this.score;
                this.takeDamage();
                this.ceckDead();
                this.scene.time.delayedCall(1000, () => {
                    this.isCollidet = false;
                });
            };
        });
        this.colliderPool.push(collider);
    };

    create(x, y, scale, depth) {
        this.normalTrippleStone = this.scene.physics.add.sprite(x, y, "normal-tripple-stone").setImmovable();
        this.normalTrippleStone.setScale(scale);
        this.normalTrippleStone.setDepth(depth);
        this.normalTrippleStone.postFX.addShadow(-1, 1, 0.015);

        this.hitAudio = this.scene.sound.add("normal-stone-audio");
    };

    update(time, delta) {}
}