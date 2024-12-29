import Phaser from "phaser";
import { BackgroundLvL1, LvL1Music } from "../../../CoreSystem/AssetLoader.js";
import { World1Config, KEYS } from "./map1Config.js";

export default class Map1 {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.yCenter = 540;
        this.xCenter = 960;
        this.isAudioStoped = false
    };

    static loadSprites(sceneIn) {
        /**@type {Phaser.Scene} */
        let scene = sceneIn;
        scene.load.image(KEYS.KEY_BACKGROUND, BackgroundLvL1);
        scene.load.audio("music-lvl1", LvL1Music);
    };

    create() {
        World1Config.backgroundPositions.forEach(({x, y, key, alpha, depth, scale}) => {
            let image = this.scene.add.image(x, y, key);
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
        this.scene.physics.add.existing(this.topBorder, true);

        this.audio = this.scene.sound.add("music-lvl1")
    }

    playAudio() {
        if (!this.audio.isPlaying) {
            this.audio.play();
            this.audio.volume = 0.5
        };
    };

    update() {
        if (this.audio && !this.isAudioStoped) {
            this.playAudio();
        };
    };
};