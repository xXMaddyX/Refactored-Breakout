import Phaser from "phaser";
import { BombStoneLilaSprite, StoneRedBombSprite, BombStoneYellowSprite, NormalStoneHitAudio } from "../../../CoreSystem/AssetLoader";
import GAME_DATA from "../../../CoreSystem/MainGameHandler";

export default class BombStoneLila {
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
        if (!sceneRef.textures.exists("red-bomb-stone")) sceneRef.load.image("red-bomb-stone", StoneRedBombSprite);
        if (!sceneRef.textures.exists("yellow-bomb-stone")) sceneRef.load.image("yellow-bomb-stone", BombStoneYellowSprite);
        if (!sceneRef.textures.exists("lila-bomb-stone")) sceneRef.load.image("lila-bomb-stone", BombStoneLilaSprite);

        sceneRef.load.audio("lila-bomb-stone-audio", NormalStoneHitAudio);
    };

    setDamageState(newState) {
        this.currentDamageState = newState;
    };

    checkDead() {
        if (this.HP <= 0) {
            for (let element of this.colliderPool) {
                element.destroy();
            };
            this.lilaBombStone.destroy();
            this.isDestroyed = true;
        } else {
            this.currentDamageState += 1;
            this.checkDamageState();
        };
    };

    takeDamage() {
        this.HP -= 1;
    };

    checkDamageState() {
        switch (this.currentDamageState) {
            case this.stoneDamageState.FULL_HP:
                this.lilaBombStone.setTexture("lila-bomb-stone");
                break;

            case this.stoneDamageState.MID_HP:
                this.lilaBombStone.setTexture("yellow-bomb-stone");
                break;

            case this.stoneDamageState.LOW_HP:
                this.lilaBombStone.setTexture("red-bomb-stone");
                break;
        };
    };

    create(x, y, scale, depth) {
        this.lilaBombStone = this.scene.physics.add.sprite(x, y, "lila-bomb-stone").setScale(scale).setDepth(depth);
        this.lilaBombStone.setImmovable();
        this.setDamageState(this.stoneDamageState.FULL_HP);

        this.hitAudio = this.scene.sound.add("lila-bomb-stone-audio");
    };

    addOverlapBall(firstObjRef) {
        /**@type {NormalBallObj} */
        let collider = this.scene.physics.add.collider(firstObjRef.normalBall, this.lilaBombStone, () => {
            if (!this.iscollidet) {
                this.iscollidet = true;
                this.hitAudio.play();
                firstObjRef.invertBallVelocityDirection();
                firstObjRef.changeSpeedRandom();
                if (this.currentDamageState == this.stoneDamageState.LOW_HP) {
                    firstObjRef.setBallToBombState();
                };
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
    update(time, delta) {};

};