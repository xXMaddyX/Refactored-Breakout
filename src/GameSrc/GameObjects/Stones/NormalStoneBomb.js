import Phaser from "phaser";
import NormalBallObj from "../Balls/NormalBall/NormalBall";
import GAME_DATA from "../../CoreSystem/MainGameHandler";
import { StoneRedBombSprite } from "../../CoreSystem/AssetLoader";

export default class NormalBombStone {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.HP = 1;
        this.isDestroyed = false;
        this.iscollidet = false;
        this.score = 50;
        this.colliderPool = [];
    };
    /**
     * 
     * @param {Phaser.Scene} sceneIn 
     */
    static loadSprites(sceneIn) {
        if (!sceneIn.textures.exists("normal-stone-bomb")) sceneIn.load.image("normal-stone-bomb", StoneRedBombSprite);
        //LOAD BOMB STONE AUDIO!!!!!
    };

    takeDamage() {
        this.HP -= 1;
    };

    checkDead() {
        if (this.HP <= 0) {
            for (let element of this.colliderPool) {
                element.destroy();
            };
            this.normalStoneBomb.destroy();
            this.isDestroyed = true;
        } else {
            return;
        };
    };

    addOverlapBall(ballRef) {
        let collider = this.scene.physics.add.collider(ballRef.normalBall, this.normalStoneBomb, () => {
            if (!this.iscollidet) {
                this.iscollidet = true;
                ballRef.invertBallVelocityDirection();
                ballRef.changeSpeedRandom();
                ballRef.setBallToBombState();
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

    create(x, y, scale, depth) {
        this.normalStoneBomb = this.scene.physics.add.sprite(x, y, "normal-stone-bomb");
        this.normalStoneBomb.setImmovable();
        this.normalStoneBomb.setScale(scale);
        this.normalStoneBomb.setDepth(depth);
        this.normalStoneBomb.postFX.addShadow(-1, 1, 0.015);

        //ADD STONE AUDIO!!!!!!!!!!!!
    };

    update(time, delta) {}
};