import Phaser from "phaser";
import Player from "../GameObjects/Player/Player.js";
import GAME_DATA from "../CoreSystem/MainGameHandler.js";
import { UI_Crushed_it, PauseSprite, ScoreBordSprite, NextLvLButton } from "../CoreSystem/AssetLoader.js";

export default class UserInterface {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
    };
    //-------------------------------------------LOAD_SPRITES-------------------------------------------------->
    static loadSprites(sceneIn) {
        /**@type {Phaser.Scene} */
        let scene = sceneIn;
        if (!scene.textures.exists("crushed-it")) scene.load.image("crushed-it", UI_Crushed_it);
        if (!scene.textures.exists("pause")) scene.load.image("pause", PauseSprite);
        if (!scene.textures.exists("score-bord")) scene.load.image("score-bord", ScoreBordSprite);
        if (!scene.textures.exists("next-button")) scene.load.image("next-button", NextLvLButton);
    };
    //--------------------------------------------------------------------------------------------------------->
    //-----------------------------------------CREATE_UI_ELEMENTS---------------------------------------------->
    create() {
        this.Button_Rectangel = this.scene.add.rectangle(1920 - 150, 1080 - 50, 150, 50, "0xff0000");
        this.Button_Rectangel.setInteractive();
        this.Button_Rectangel.on("pointerdown", () => {
            if (this.playerPaddelRef) {
                this.playerPaddelRef.setAiPlayerActive(!this.playerPaddelRef.aiPlayerIsActive);
            };
        });
        //SCORE COUNTER DISPLAY-------------------------------------------------------------------------------->
        this.highScore = this.scene.add.text(10, 10, `Your Highes Score: ${GAME_DATA.GAME_SCORE_SYSTEM.YOUR_HIGHEST_SCORE}`).setDepth(-1);
        this.highScore.scale = 2;
        this.highScore.setStroke("#000000", 6);
        
        this.currentScore = this.scene.add.text(10, 40, `Score: ${GAME_DATA.GAME_SCORE_SYSTEM.DEFAULT_SCORE}`).setDepth(-1);
        this.currentScore.scale = 2;
        this.currentScore.setStroke("#000000", 6);

        this.currentPlayerLifes = this.scene.add.text(1700, 10, `Paddels: ${GAME_DATA.PLAYER_STATES.PLAYER_LIFES}`).setDepth(-1);
        this.currentPlayerLifes.scale = 2;
        this.currentPlayerLifes.setStroke("#000000", 6);
        //----------------------------------------------------------------------------------------------------->
        //SKILL_BUTTON----------------------------------------------------------------------------------------->
        this.Ai_Button = this.scene.add.text().setInteractive();
        this.Ai_Button.text = "Activate AI";
        this.Ai_Button.x = this.Button_Rectangel.x - this.Button_Rectangel.width / 2.5;
        this.Ai_Button.y = this.Button_Rectangel.y - 10;
        this.Ai_Button.on("pointerdown", () => {
            if (this.playerPaddelRef) {
                this.playerPaddelRef.setAiPlayerActive(!this.playerPaddelRef.aiPlayerIsActive);
                if (this.playerPaddelRef.aiPlayerIsActive) {
                    this.Button_Rectangel.setFillStyle(0x90EE90)
                } else {
                    this.Button_Rectangel.setFillStyle(0xff0000)
                }
            };
        });
        //-------------------------------->
        //CRUSHED_IT_SCREEN--------------->
        this.crushed_it = this.scene.add.sprite(960, 540, "crushed-it").setDepth(-1);
        this.crushed_it.visible = false;
        this.crushed_it.active = false;
        //-------------------------------->
        //Score Bord Sprite--------------->
        this.scoreContainer = this.scene.add.container(960, 540).setDepth(10);

        this.scoreBord = this.scene.add.sprite(0, 0, "score-bord");
        
        this.scoreBordHighScoreHead = this.scene.add.text(-164, -50, `High Score:`);
        this.scoreBordHighScoreHead.setFontSize(45);
        this.scoreBordHighScoreHead.setStroke("#000000", 6);

        this.scoreBordHighScore = this.scene.add.text(-164, 0, `${GAME_DATA.GAME_SCORE_SYSTEM.YOUR_HIGHEST_SCORE}`);
        this.scoreBordHighScore.setFontSize(45);
        this.scoreBordHighScore.setStroke("#000000", 6);
        
        this.scoreBordYourScoreHead = this.scene.add.text(-164, 100, `Your Score:`);
        this.scoreBordYourScoreHead.setFontSize(45);
        this.scoreBordYourScoreHead.setStroke("#000000", 6);

        this.scoreBordYourScore = this.scene.add.text(-164, 150, `${GAME_DATA.GAME_SCORE_SYSTEM.CURRENT_SCORE}`);
        this.scoreBordYourScore.setFontSize(45);
        this.scoreBordYourScore.setStroke("#000000", 6);

        this.nextButton = this.scene.add.sprite(200, 240, "next-button").setInteractive().setScale(.5);
        this.nextButton.on("pointerdown", () => {
            this.scene.loadNextLevel();
        });

        let spriteList = [
            this.scoreBord,
            this.scoreBordHighScoreHead,
            this.scoreBordHighScore,
            this.scoreBordYourScoreHead,
            this.scoreBordYourScore,
            this.nextButton,
        ];
        this.scoreContainer.add(spriteList);

        this.scoreContainer.visible = false;
        this.scoreContainer.active = false;
        //--------------------------------->

        //Pause Image---------------------->
        this.pauseImage = this.scene.add.sprite(960, 540, "pause").setDepth(10);
        this.pauseImage.visible = false;
        this.pauseImage.active = false;
        //--------------------------------->
    };
    //---------------------------------------------------------------------------------------------->
    //------------------------------------PLAYER_PADDEL_REF----------------------------------------->
    setPlayerPaddelRef(data) {
        /**@type {Player} */
        this.playerPaddelRef = data;
    };
    //---------------------------------------------------------------------------------------------->
    //-----------------------------------UPDATE_PLAYER_SCORE---------------------------------------->
    updateScore() {
        this.highScore.text = `Your Highes Score: ${GAME_DATA.GAME_SCORE_SYSTEM.YOUR_HIGHEST_SCORE}`;
        this.currentScore.text = `Score ${GAME_DATA.GAME_SCORE_SYSTEM.CURRENT_SCORE}`;
        this.currentPlayerLifes.text = `Paddels: ${GAME_DATA.PLAYER_STATES.PLAYER_LIFES}`;
    };
    //---------------------------------------------------------------------------------------------->
    //-----------------------------------CRUSHED_IF_HANDLERS---------------------------------------->
    showCrushedIt() {
        this.crushed_it.active = true;
        this.crushed_it.visible = true;
    };
    hideCrushedIt() {
        this.crushed_it.visible = false;
        this.crushed_it.active = false;
    };
    //---------------------------------------------------------------------------------------------->
    //-----------------------------------SCORE_BORD_HANDLER----------------------------------------->
    showScoreBord() {
        this.scoreContainer.active = true;
        this.updateScoreBord();
        this.scoreContainer.visible = true;
    };
    hideScoreBord() {
        this.scoreContainer.visible = false;
        this.scoreContainer.active = false;
    };
    updateScoreBord() {
        this.scoreBordHighScore.text = `${GAME_DATA.GAME_SCORE_SYSTEM.YOUR_HIGHEST_SCORE}`;
        this.scoreBordYourScore.text = `${GAME_DATA.GAME_SCORE_SYSTEM.CURRENT_SCORE}`;
    };
    //---------------------------------------------------------------------------------------------->
    //---------------------------------------UPDATE_LOOP-------------------------------------------->
    update() {
        this.updateScore();
    };
};