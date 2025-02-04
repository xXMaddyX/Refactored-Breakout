import Phaser from "phaser";
import { BieneAnimation } from "../../CoreSystem/AssetLoader.js";

export default class Biene {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.direction = 0;
        this.speed = 100;
        this.startPosX = 0;
        this.endPosX = 0;
    };

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static loadSprites(scene) {
        if (!scene.textures.exists("biene-sheet")) scene.load.spritesheet("biene-sheet", BieneAnimation, {
            frameWidth: 540, frameHeight: 616
        })
    };

    createAnimations() {
        this.bieneAnim = this.scene.anims.create({
            key: "biene-anim",
            frames: this.scene.anims.generateFrameNumbers("biene-sheet", {
                start: 0, end: 2,
            }),
            frameRate: 10,
            repeat: -1
        });
    };

    create(y, scale, depth, direction, inizialPositions, flipH) {
        let {start, end} = inizialPositions;
        console.log(start)
        this.startPosX = start;
        this.endPosX = end;

        this.direction = direction;
        this.createAnimations();
        this.biene = this.scene.physics.add.sprite(this.startPosX, y, null);
        this.biene.setScale(scale * flipH, scale);
        this.biene.setDepth(depth);
        this.biene.anims.play("biene-anim");
        this.biene.postFX.addShadow(-1, 1, 0.02);
    };

    moveBiene() {
        if (this.startPosX > 0) {
            if (this.biene.x >= this.endPosX) {
                this.biene.setVelocityX(this.speed * this.direction);
            } else if (this.biene.x < this.endPosX){
                this.biene.x = this.startPosX;
            }
        } else if (this.startPosX < 0) {
            if (this.biene.x < this.endPosX) {
                this.biene.setVelocityX(this.speed * this.direction);
            } else if (this.biene.x > this.endPosX) {
                this.biene.x = this.startPosX;
            }
        }
    };

    update(time, delta) {
        this.moveBiene();
        console.log(this.biene.x)
    };
};