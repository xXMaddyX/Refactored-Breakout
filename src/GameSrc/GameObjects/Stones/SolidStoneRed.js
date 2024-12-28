import Phaser from "phaser";
import { SolidRedStoneSprite } from "../../CoreSystem/AssetLoader";

export default class SolidRedStone {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.iscollidet = false;

        this.colliderPool = [];
    };

    static loadSprites(scene) {
        /**@type {Phaser.Scene} */
        this.sceneRef = scene;
        if (!this.sceneRef.textures.exists("solid-stone-red")) this.sceneRef.load.image("solid-stone-red", SolidRedStoneSprite);
    };

    setBallRef(ballRef) {
        /**@type {NormalBallObj} */
        this.ballRef = ballRef;
    };

    addOverlapBall() {
        let collider = this.scene.physics.add.overlap(this.ballRef.normalBall, this.solidStone, () => {
            if (!this.iscollidet) {
                this.iscollidet = true;
                this.ballRef.invertBallVelocityDirection();
                this.ballRef.changeSpeedRandom();
                this.scene.time.delayedCall(100, () => {
                    this.iscollidet = false;
                });
            };
        });
        this.colliderPool.push(collider);
    };

    create(x, y, scale, depth) {
        this.solidStone = this.scene.physics.add.sprite(x, y);
        this.solidStone.setDepth(depth);
        this.solidStone.setScale(scale);
        this.redStone.postFX.addShadow(-1, 1, 0.015);
    };

    update(time, delta) {

    };
}