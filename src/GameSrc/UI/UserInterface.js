import Phaser from "phaser";
import Player from "../GameObjects/Player/Player.js";
import GAME_DATA from "../CoreSystem/MainGameHandler.js";
import { UI_Crushed_it, PauseSprite } from "../CoreSystem/AssetLoader.js";

export default class UserInterface {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
    };

    static loadSprites(sceneIn) {
        /**@type {Phaser.Scene} */
        let scene = sceneIn;
        if (!scene.textures.exists("crushed-it")) scene.load.image("crushed-it", UI_Crushed_it);
        if (!scene.textures.exists("pause")) scene.load.image("pause", PauseSprite);
    };

    create() {
        this.Button_Rectangel = this.scene.add.rectangle(1920 - 150, 1080 - 50, 150, 50, "0xff0000");
        this.Button_Rectangel.setInteractive();
        this.Button_Rectangel.on("pointerdown", () => {
            if (this.playerPaddelRef) {
                this.playerPaddelRef.setAiPlayerActive(!this.playerPaddelRef.aiPlayerIsActive);
            };
        });

        //SCORE COUNTER DISPLAY-------------------------------------------------------------------------------->
        this.highScore = this.scene.add.text(10, 10, `HighScore: ${GAME_DATA.GAME_SCORE_SYSTEM.HIGH_SCORE}`);
        this.highScore.scale = 2;
        
        this.currentScore = this.scene.add.text(10, 40, `Score: ${GAME_DATA.GAME_SCORE_SYSTEM.DEFAULT_SCORE}`);
        this.currentScore.scale = 2;
        
        //SKILL_BUTTON----------------------------------------------------------------------------------------->
        this.Ai_Button = this.scene.add.text().setInteractive();
        this.Ai_Button.text = "Activate AI";
        this.Ai_Button.x = this.Button_Rectangel.x - this.Button_Rectangel.width / 2.5;
        this.Ai_Button.y = this.Button_Rectangel.y - 10;
        this.Ai_Button.on("pointerdown", () => {
            if (this.playerPaddelRef) {
                this.playerPaddelRef.setAiPlayerActive(!this.playerPaddelRef.aiPlayerIsActive);
            };
        });
        
        //CRUSHED_IT_SCREEN
        this.crushed_it = this.scene.add.sprite(960, 540, "crushed-it").setDepth(-1);
        this.crushed_it.visible = false;
        this.crushed_it.active = false;

        //Pause Image
        this.pauseImage = this.scene.add.sprite(960, 540, "pause").setDepth(10);
        this.pauseImage.visible = false;
        this.pauseImage.active = false;
    };

    setPlayerPaddelRef(data) {
        /**@type {Player} */
        this.playerPaddelRef = data;
    };

    updateScore() {
        this.highScore.text = `HighScore: ${GAME_DATA.GAME_SCORE_SYSTEM.HIGH_SCORE}`;
        this.currentScore.text = `Score ${GAME_DATA.GAME_SCORE_SYSTEM.CURRENT_SCORE}`;
    };

    update() {
        this.updateScore();
    };
};