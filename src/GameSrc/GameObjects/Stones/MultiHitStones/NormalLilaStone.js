import Phaser from "phaser";
import { NormalStoneLilaSprite, NormalStoneSprite, NormalStoneYellowSprite } from "../../../CoreSystem/AssetLoader";
import GAME_DATA from "../../../CoreSystem/MainGameHandler";

export default class NormalLilaStone {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.HP = 3;
        this.isDestroyed = false;
        this.iscollidet = false;
        this.score = 150;
        this.colliderPool = [];

        this.stoneDamageState = {
            FULL_HP: 0,
            MID_HP: 1,
            LOW_HP: 2
        };
        this.currentDamageState = null;
    };
    /**
     * 
     * @param {Phaser.Scene} sceneRef 
     */
    static loadSprites(sceneRef) {
        if (!sceneRef.textures.exists("normal-stone")) sceneRef.load.image("normal-stone", NormalStoneSprite);
        if (!sceneRef.textures.exists("normal-yellow-stone")) sceneRef.load.image("normal-yellow-stone", NormalStoneYellowSprite);
        if (!sceneRef.textures.exists("normal-stone-lila")) sceneRef.load.image("normal-stone-lila", NormalStoneLilaSprite);

        //ADD LOAD AUTIO!!!!!!!!!!!
    };

    setDamageState(newState) {
        this.currentDamageState = newState;
    };

    create(x, y, scale, depth) {
        this.normalLilaStone = this.scene.physics.add.sprite(x, y, "normal-stone-lila").setScale(scale).setDepth(depth);
        this.normalLilaStone.setImmovable();
        this.normalLilaStone.postFX.addShadow(-1, 1, 0.015);
        this.setDamageState(this.stoneDamageState.FULL_HP);

        //ADD AUDIO TO SCENE!!!!!!!!!!!!!!
    };

    takeDamage() {
        this.HP -= 1;
    };

    checkDead() {
        if (this.HP <= 0) {
            this.colliderPool.forEach(element => {
                element.destroy();
            });
            this.normalLilaStone.destroy();
            this.isDestroyed = true;
        } else {
            this.currentDamageState += 1;
            this.checkDamageState();
        };
    };

    checkDamageState() {
        switch (this.currentDamageState) {
            case this.stoneDamageState.FULL_HP:
                this.normalLilaStone.setTexture("normal-stone-lila");
                break;

            case this.stoneDamageState.MID_HP:
                this.normalLilaStone.setTexture("normal-yellow-stone");
                break;

            case this.stoneDamageState.LOW_HP:
                this.normalLilaStone.setTexture("normal-stone");
                break;
        };
    };

    addOverlapBall(firstObjRef) {
        /**@type {NormalBallObj} */
        this.ballRef = firstObjRef;
        let collider = this.scene.physics.add.collider(this.ballRef.normalBall, this.normalLilaStone, () => {
            if (!this.iscollidet) {
                this.iscollidet = true;
                //this.hitAudio.play();
                this.ballRef.invertBallVelocityDirection();
                this.ballRef.changeSpeedRandom();
                GAME_DATA.GAME_SCORE_SYSTEM.CURRENT_SCORE += this.score;
                this.takeDamage();
                this.checkDead();
                this.scene.time.delayedCall(1000, () => {
                    this.iscollidet = false;
                });
            };
        });
        this.colliderPool.push(collider);
    };

    update(time, delta) {

    };
};