import Phaser from "phaser";
import NormalBallObj from "../Balls/NormalBall/NormalBall";
import { SolidRedStoneSprite, SolidStoneHitAudio, SolidRedStoneSheet } from "../../CoreSystem/AssetLoader";

export default class SolidRedStone {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.HP = 1;
        this.isDestroyed = false;
        this.iscollidet = false;
        this.isDestroyAnimation = false;
        this.colliderPool = [];
    };

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static loadSprites(scene) {
        if (!scene.textures.exists("solid-stone-red")) scene.load.image("solid-stone-red", SolidRedStoneSprite);
        if (!scene.textures.exists("solid-stone-red-anim")) scene.load.spritesheet("solid-stone-red-anim", SolidRedStoneSheet, {
            frameWidth: 1334, frameHeight: 550
        });
        scene.load.audio("solid-stone-hit", SolidStoneHitAudio);
    };

    takeDamage() {
        this.HP -= 1;
    };

    checkDead() {
        if (this.HP <= 0) {
            for (let element of this.colliderPool) {
                element.destroy();
            };
            this.startAndTimeDestroyAnim();
        } else {
            return;
        };
    };

    addOverlapBall(ballRef) {
        let collider = this.scene.physics.add.collider(ballRef.normalBall, this.solidStone, () => {
            if (!this.iscollidet) {
                this.iscollidet = true;
                ballRef.invertBallVelocityDirection();
                ballRef.changeSpeedRandom();
                //ADD BALL SET PLAYER TO AI
                this.audio.play();
                if (ballRef.BALL_IS_BOMB_STATE) {
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

    initAnimations() {
        this.destroyAnim = this.scene.anims.create({
            key: "solid-stone-red-anim",
            frames: this.scene.anims.generateFrameNumbers("solid-stone-red-anim", {
                start: 0,
                end: 3
            }),
            frameRate: 5,
            repeat: 0,
        });
    };

    startAndTimeDestroyAnim() {
        this.solidStone.anims.play(this.destroyAnim);
        this.isDestroyAnimation = true;
    };

    create(x, y, scale, depth) {
        this.initAnimations();
        this.solidStone = this.scene.physics.add.sprite(x, y, "solid-stone-red").setImmovable();
        this.solidStone.setDepth(depth);
        this.solidStone.setScale(scale);
        this.solidStone.postFX.addShadow(-1, 1, 0.015);

        this.audio = this.scene.sound.add("solid-stone-hit");
        this.audio.volume = 0.8;
    };

    update(time, delta) {
        if (this.isDestroyAnimation) {
            let animationProgress = this.solidStone.anims.getProgress();
            console.log(animationProgress)
            if (animationProgress == 1) {
                this.scene.time.delayedCall(400, () => {
                    this.solidStone.destroy();
                    this.isDestroyAnimation = false;
                    this.isDestroyed = true;
                })
            };
        };
    };
}