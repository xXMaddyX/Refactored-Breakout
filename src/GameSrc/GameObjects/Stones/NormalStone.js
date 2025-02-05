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
            for (let element of this.colliderPool) {
                element.collider.destroy();
            };
            this.normalStone.destroy();
            this.isDestroyed = true;
        } else {
            return;
        };
    };

    /**
     * 
     * @param {NormalBallObj} firstObjRef 
     */
    addOverlapBall(firstObjRef) {
        let collistionObj = {
            isCollidet: false,
            collider: null
        };
        collistionObj.collider = this.scene.physics.add.collider(firstObjRef.normalBall, this.normalStone, () => {
            if (!collistionObj.isCollidet) {
                collistionObj.isCollidet = true;
                this.hitAudio.play();
                firstObjRef.invertBallVelocityDirection();
                firstObjRef.changeSpeedRandom();
                GAME_DATA.GAME_SCORE_SYSTEM.CURRENT_SCORE += this.score;
                this.takeDamage();
                this.checkDead();
                collistionObj.isCollidet = false;
            };
        });
        this.colliderPool.push(collistionObj);
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