import Phaser from "phaser";
import NormalBallObj from "../Balls/NormalBall/NormalBall";
import GAME_DATA from "../../CoreSystem/MainGameHandler";
import { RedStoneSprite, NormalStoneHitAudio } from "../../CoreSystem/AssetLoader";

export default class RedStone {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.HP = 1;
        this.isDestroyed = false;
        this.iscollidet = false;
        this.score = 100;
        this.colliderPool = [];

    };
    static loadSprites(sceneIn) {
        /**@type {Phaser.Scene} */
        let scene = sceneIn;
        this.spriteRef = scene.load.image("red-stone", RedStoneSprite);
        scene.load.audio("red-stone-audio", NormalStoneHitAudio);
    };

    takeDamage() {
        this.HP -= 1;
    };

    checkDead() {
        if (this.HP <= 0) {
            for (let element of this.colliderPool) {
                element.destroy();
            };
            this.redStone.destroy();
            this.isDestroyed = true;
        } else {
            return;
        }
    };

    /**
     * 
     * @param {NormalBallObj} firstObjRef 
     */
    addOverlapBall(firstObjRef) {
        let collider = this.scene.physics.add.collider(firstObjRef.normalBall, this.redStone, () => {
            if (!this.iscollidet) {
                this.iscollidet = true;
                this.hitAudio.play();
                GAME_DATA.GAME_SCORE_SYSTEM.CURRENT_SCORE += this.score;
                firstObjRef.invertBallVelocityDirection();
                firstObjRef.changeSpeedRandom();
                this.takeDamage();
                this.checkDead();
                this.iscollidet = false;
            };
        });
        this.colliderPool.push(collider);
    };

    create(x, y, scale, depth) {
        this.redStone = this.scene.physics.add.sprite(x, y, "red-stone").setImmovable();
        this.redStone.setScale(scale);
        this.redStone.setDepth(depth);
        this.redStone.postFX.addShadow(-1, 1, 0.015)

        this.hitAudio = this.scene.sound.add("red-stone-audio");
    };

    update() {

    };
};