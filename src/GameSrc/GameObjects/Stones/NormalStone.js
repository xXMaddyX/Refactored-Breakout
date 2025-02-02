import Phaser from "phaser";
import NormalBallObj from "../Balls/NormalBall/NormalBall";
import GAME_DATA from "../../CoreSystem/MainGameHandler";
import { NormalStoneSprite, NormalStoneHitAudio } from "../../CoreSystem/AssetLoader";

export default class NormalStone {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.HP = 1;
        this.isDestroyed = false;
        this.iscollidet = false;
        this.score = 50;
        this.colliderPool = [];
    };

    static loadSprites(sceneIn) {
        /**@type {Phaser.Scene} */
        let scene = sceneIn;
        if (!scene.textures.exists("normal-stone")) scene.load.image("normal-stone", NormalStoneSprite);
        scene.load.audio("normal-stone-audio", NormalStoneHitAudio);
    };

    takeDamage() {
        this.HP -= 1;
    };

    checkDead() {
        if (this.HP <= 0) {
            this.colliderPool.forEach(element => {
                element.destroy();
            });
            this.normalStone.destroy();
            this.isDestroyed = true;
        } else {
            return;
        };
    };

    addOverlapBall(firstObjRef) {
        /**@type {NormalBallObj} */
        let ballRef = firstObjRef;
        let collider = this.scene.physics.add.collider(ballRef.normalBall, this.normalStone, () => {
            if (!this.iscollidet) {
                this.iscollidet = true;
                this.hitAudio.play();
                ballRef.invertBallVelocityDirection();
                ballRef.changeSpeedRandom();
                GAME_DATA.GAME_SCORE_SYSTEM.CURRENT_SCORE += this.score;
                this.takeDamage();
                this.checkDead();
                this.scene.time.delayedCall(1000, () => {
                    this.iscollidet = false;
                });
            };
        });
        this.colliderPool.push(collider);
    }

    create(x, y, scale, depth) {
        this.normalStone = this.scene.physics.add.sprite(x, y, "normal-stone").setImmovable();
        this.normalStone.setScale(scale);
        this.normalStone.setDepth(depth);
        this.normalStone.postFX.addShadow(-1, 1, 0.015);

        this.hitAudio = this.scene.sound.add("normal-stone-audio");
    };

    update() {

    };
};