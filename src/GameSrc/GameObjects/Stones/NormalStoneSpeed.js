import Phaser from "phaser";
import Player from "../Player/Player";
import GAME_DATA from "../../CoreSystem/MainGameHandler";
import { NormalStoneSpeedSprite, NormalStoneHitAudio } from "../../CoreSystem/AssetLoader";
import NormalBallObj from "../Balls/NormalBall/NormalBall";


export default class NormalStoneSpeed {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.HP = 1;
        this.PLAYER_SPEED_BUFF_MULTI = 1.5;
        this.isDestroyed = false;
        this.iscollidet = false;
        this.score = 50;
        this.colliderPool = [];
    };
    /**
     * @param {Phaser.Scene} sceneIn 
     */
    static loadSprites(sceneIn) {
        if (!sceneIn.textures.exists("normal-stone-speed")) sceneIn.load.image("normal-stone-speed", NormalStoneSpeedSprite);

        sceneIn.load.audio("normal-stone-speed-audio", NormalStoneHitAudio);
    };

    takeDamage() {
        this.HP -= 1;
    };

    checkDead() {
        if (this.HP <= 0) {
            for (let element of this.colliderPool) {
                element.destroy();
            };
            this.NormalStoneSpeed.destroy();
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
        let collider = this.scene.physics.add.collider(firstObjRef.normalBall, this.NormalStoneSpeed, () => {
            if (!this.iscollidet) {
                this.iscollidet = true;
                this.hitAudio.play();
                firstObjRef.invertBallVelocityDirection();
                firstObjRef.changeSpeedRandom();
                this.player.setPlayerOnSpeedBuff(this.PLAYER_SPEED_BUFF_MULTI);
                GAME_DATA.GAME_SCORE_SYSTEM.CURRENT_SCORE += this.score;
                this.takeDamage();
                this.checkDead();
                this.scene.time.delayedCall(1000, () => {
                    this.iscollidet = false;
                });
            };
        });
        this.colliderPool.push(collider);
    }

    create(x, y, scale, depth) {
        
        this.NormalStoneSpeed = this.scene.physics.add.sprite(x, y, "normal-stone-speed").setImmovable();
        this.NormalStoneSpeed.setScale(scale);
        this.NormalStoneSpeed.setDepth(depth);
        this.NormalStoneSpeed.postFX.addShadow(-1, 1, 0.015);

        this.hitAudio = this.scene.sound.add("normal-stone-speed-audio");
    };

    update(time, delta) {};
};