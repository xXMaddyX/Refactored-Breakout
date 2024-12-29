import Phaser from "phaser"
import SceneLoader from "./SceneLoader.js";
import GAME_DATA from "./MainGameHandler.js";
import UserInterface from "../UI/UserInterface.js";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: "main-scene"});
        this.keyIsDown = false;
        this.gamePaused = false;
    };

    init() {
        this.sceneLoader = new SceneLoader(this);
    };

    preload() {

    }

    initOnStartup() {
        this.sceneLoader.loadTitelScene();
    };

    setUIRef(uiRef) {
        /**@type {UserInterface} */
        this.UIRef = uiRef;
    };
    //---------------------------------------------------------------------------------------------------->
    //-----------------------------------------CREATE_SCENE----------------------------------------------->
    create() {
        this.init();
        this.initOnStartup();
        GAME_DATA.SCENE_REFS.MAIN_SCENE_REF = this;

        this.gamePauseButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    };
    //---------------------------------------------------------------------------------------------------->
    //-----------------------------------------PAUSE_HANDLER---------------------------------------------->
    checkKeyPress() {
        if (this.gamePauseButton.isDown && this.keyIsDown == false) {
            this.keyIsDown = true;
            this.gamePaused = !this.gamePaused;
            this.toggleGamePaused();
        };
        if (this.gamePauseButton.isUp) this.keyIsDown = false;
    };
    pauseGame() {
        this.UIRef.pauseImage.active = true;
        this.UIRef.pauseImage.visible = true;
        this.scene.pause(GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE);
    };
    resumeGame() {
        this.scene.resume(GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE);
        this.UIRef.pauseImage.visible = false;
        this.UIRef.pauseImage.active = false;
    };
    toggleGamePaused() {
        if (this.gamePaused) this.pauseGame();
        if (!this.gamePaused) this.resumeGame();
    };
    //----------------------------------------------------------------------------------------------------->
    //----------------------------------------------UPDATE_LOOP-------------------------------------------->
    update() {
        if (GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE != "TitelScene") this.checkKeyPress();
    };
    //----------------------------------------------------------------------------------------------------->
};