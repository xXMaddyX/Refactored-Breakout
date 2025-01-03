import Phaser from "phaser";
import { BackgroundLvL3 } from "../../../CoreSystem/AssetLoader";
import { World3Config, KEYS } from "./map3Config";

export default class Map3 {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.xCenter = 960;
        this.yCenter = 540;
        this.isAudioStoped = false;
    };
    /** 
     * @param {Phaser.Scene} scene 
     */
    static loadSprites(scene) {
        scene.load.image("Background3", BackgroundLvL3);
        //scene.load.audio("music-lvl2", LvL2Music);
    };
    create() {
        World3Config.backgroundPositions.forEach(({x, y, key, alpha, depth, scale}) => {
            let image = this.scene.add.image(x, y, "Background3");
            image.alpha = alpha;
            image.depth = depth;
            image.scale = scale;
        });

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

        //this.audio = this.scene.sound.add("music-lvl2");
    };

    playAudio() {
        if (!this.audio.isPlaying) {
            this.audio.play();
            this.audio.volume = 0.5;
        };
    };

    update(time, delta) {
        let deltaInSec = delta / 1000;
        if (this.audio && !this.isAudioStoped) {
            this.playAudio();
        };
    };
};