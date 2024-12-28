import Phaser from "phaser";
import SceneLoader from "../../../CoreSystem/SceneLoader.js";
import TitelButtons from "./TitelStartButton.js";
import { TitelBackgroundSprite, TitelOptionSprite, TitelQuitSprite, TitelStartSprite } from "../../../CoreSystem/AssetLoader";

const KEYS = {
    TITEL_BACKGROUND: "titel-background",
    START_BUTTON: "start-button",
    OPTIONS_BUTTON: "options-button",
    QUIT_BUTTON: "quit-button"
};

export default class TitelScene extends Phaser.Scene {
    constructor() {
        super();
    };

    preload() {
        if (!this.textures.exists(KEYS.TITEL_BACKGROUND)) this.load.image(KEYS.TITEL_BACKGROUND, TitelBackgroundSprite);
        if (!this.textures.exists(KEYS.START_BUTTON)) this.load.image(KEYS.START_BUTTON, TitelStartSprite);
        if (!this.textures.exists(KEYS.QUIT_BUTTON)) this.load.image(KEYS.QUIT_BUTTON, TitelQuitSprite);
        if (!this.textures.exists(KEYS.OPTIONS_BUTTON)) this.load.image(KEYS.OPTIONS_BUTTON, TitelOptionSprite);
    };

    create() {
        this.sceneLoaderRef = new SceneLoader(this, KEYS);
        this.background = this.add.image(960, 540, KEYS.TITEL_BACKGROUND);

        TitelButtons.createStartButton(this);
        TitelButtons.createOptionButton(this);
        TitelButtons.createQuitButton(this);
    };

    update(time, delta) {

    };
};