import Phaser from "phaser";
import NormalBallObj from "../Balls/NormalBall/NormalBall";
import { NormalStoneAISprite } from "../../CoreSystem/AssetLoader";

export default class NormalStoneAI {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.HP = 1;
        this.isDestroyed = false;
        this.iscollidet = false;
        this.colliderPool = [];
    };
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static loadSprites(scene) {
        if (!scene.textures.exists("normal-stone-ai")) scene.load.image("normal-stone-ai", NormalStoneAISprite);
        //ADD SOUNDS!!!!!!!!!!
    };

    setBallRef(ballRefIn) {
        /**@type {NormalBallObj} */
        this.ballRef = ballRefIn;
    };

    takeDamage() {
        this.HP -= 1;
    };

    checkDead() {
        if (this.HP <= 0) {
            this.colliderPool.forEach(element => {
                element.destroy();
            });
            this.normalStoneAi.destroy();
            this.isDestroyed = true;
        } else {
            return;
        };
    };

    addOverlapBall() {
        let collider = this.scene.physics.add.collider(this.ballRef.normalBall, this.normalStoneAi, () => {
            if (!this.iscollidet) {
                this.iscollidet = true;
                this.ballRef.invertBallVelocityDirection();
                this.ballRef.changeSpeedRandom();
                this.ballRef.setPlayerToAi();
                this.takeDamage();
                this.checkDead();
                //PLAY AUDIO HERE!!!!!!!!!!!
                this.scene.time.delayedCall(1000, () => {
                    this.iscollidet = false;
                });
            };
        });
        this.colliderPool.push(collider);
    };

    create(x, y, scale, depth) {
        this.normalStoneAi = this.scene.physics.add.sprite(x, y, "normal-stone-ai");
        this.normalStoneAi.setImmovable();
        this.normalStoneAi.setScale(scale);
        this.normalStoneAi.setDepth(depth);
        this.normalStoneAi.postFX.addShadow(-1, 1, 0.015);

        //ADD STONE SOUND____
    };

    update(time, delta) {};
};