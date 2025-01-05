import Phaser from "phaser";
import NormalBallObj from "../Balls/NormalBall/NormalBall";
import { SolidRedStoneSprite, SolidStoneHitAudio } from "../../CoreSystem/AssetLoader";

export default class SolidRedStone {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.HP = 1;
        this.isDestroyed = false;
        this.iscollidet = false;
        this.colliderPool = [];
    };

    static loadSprites(scene) {
        if (!scene.textures.exists("solid-stone-red")) scene.load.image("solid-stone-red", SolidRedStoneSprite);
        scene.load.audio("solid-stone-hit", SolidStoneHitAudio);
    };

    setBallRef(ballRef) {
        /**@type {NormalBallObj} */
        this.ballRef = ballRef;
    };

    takeDamage() {
        this.HP -= 1;
    };

    checkDead() {
        if (this.HP <= 0) {
            this.colliderPool.forEach(element => {
                element.destroy();
            });
            this.solidStone.destroy();
            this.isDestroyed = true;
        } else {
            return;
        }
    };

    addOverlapBall() {
        let collider = this.scene.physics.add.collider(this.ballRef.normalBall, this.solidStone, () => {
            if (!this.iscollidet) {
                this.iscollidet = true;
                this.ballRef.invertBallVelocityDirection();
                this.ballRef.changeSpeedRandom();
                //ADD BALL SET PLAYER TO AI
                this.audio.play();
                if (this.ballRef.BALL_IS_BOMB_STATE) {
                    this.takeDamage();
                    this.checkDead();
                };

                this.scene.time.delayedCall(1000, () => {
                    this.iscollidet = false;
                });
            };
        });
        this.colliderPool.push(collider);
    };

    create(x, y, scale, depth) {
        this.solidStone = this.scene.physics.add.sprite(x, y, "solid-stone-red").setImmovable();
        this.solidStone.setDepth(depth);
        this.solidStone.setScale(scale);
        this.solidStone.postFX.addShadow(-1, 1, 0.015);

        this.audio = this.scene.sound.add("solid-stone-hit");
        this.audio.volume = 0.8;
    };

    update(time, delta) {

    };
}