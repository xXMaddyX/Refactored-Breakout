import Phaser from "phaser";
import { World4Config } from "./map4Config";

export default class Map4 {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;

        this.xCenter = 960;
        this.yCenter = 540;
        this.isAudioStoped = false;
    };

    /**
     * LOADS SPRITES FOR MAP
     * @param {Phaser.Scene} scene 
     */
    static loadSprites(scene) {
        if (!scene.textures.exists("Background4")) scene.load.image("Background4", "ADD IMAGE PATH");
        //ADD SOUND TO MAP!!!!!!!!!!!!!
    };

    create() {

        this.leftBoder = this.scene.add.sprite(0, this.yCenter, null);
        this.leftBoder.alpha = 0;
        this.leftBoder.setDisplaySize(20, 1080);
        this.scene.physics.add.existing(this.leftBoder, true);

        this.rightBorder = this.scene.add.sprite(1920, this.yCenter, null);
        this.rightBorder.alpha = 0;
        this.rightBorder.setDisplaySize(20, 1080);
        this.scene.physics.add.existing(this.rightBorder, true);

        this.topBorder = this.scene.add.sprite(this.xCenter, 0, true);
        this.topBorder.alpha = 0;
        this.topBorder.setDisplaySize(1920, 20);
        this.scene.physics.add.existing(this.topBorder);
    };

    update(time, delta) {

    };
};