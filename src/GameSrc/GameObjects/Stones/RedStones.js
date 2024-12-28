import Phaser from "phaser";
import NormalBallObj from "../Balls/NormalBall/NormalBall";
import { RedStoneSprite, NormalStoneHitAudio } from "../../CoreSystem/AssetLoader";

export default class RedStone {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.HP = 1;
        this.isDestroyed = false;
        this.iscollidet = false;

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
            this.colliderPool.forEach(element => {
                element.destroy();
            });
            this.redStone.destroy();
            this.isDestroyed = true;
        } else {
            return;
        }
    };

    addOverlapBall(firstObjRef) {
        /**@type {NormalBallObj} */
        this.ballRef = firstObjRef;
        let collider = this.scene.physics.add.overlap(this.ballRef.normalBall, this.redStone, () => {
            if (!this.iscollidet) {
                this.iscollidet = true;
                this.hitAudio.play();
                this.ballRef.invertBallVelocityDirection();
                this.ballRef.changeSpeedRandom();
                this.takeDamage();
                this.checkDead();
                this.scene.time.delayedCall(100, () => {
                    this.iscollidet = false;
                });
            };
        });
        this.colliderPool.push(collider);
    };

    create(x, y, scale, depth) {
        console.log(this.scene.textures.exists("red-stone"))
        this.redStone = this.scene.physics.add.sprite(x, y, "red-stone");
        this.redStone.setScale(scale);
        this.redStone.setDepth(depth);
        this.redStone.postFX.addShadow(-1, 1, 0.015)

        this.hitAudio = this.scene.sound.add("red-stone-audio");
    };

    update() {

    };
};