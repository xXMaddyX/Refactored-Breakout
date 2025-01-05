import TitelScene from "./TitelScene.js";
import Phaser from "phaser";

export default class TitelButtons {
    /**
     * 
     * @param {TitelScene} titelScene 
     */
    static createStartButton(titelScene) {
        titelScene.startButton = titelScene.add.sprite(960 - 200, 950, "start-button");
        titelScene.startButtonGlow = titelScene.startButton.preFX.addGlow("0x39FF14" , 3, undefined, undefined, undefined, 5);
        titelScene.startButtonGlow.active = false;

        titelScene.startButton.setInteractive();
        titelScene.startButton.on("pointerdown", () => {
            titelScene.sceneLoaderRef.loadLevel1("TitelScene");
        });
        titelScene.startButton.on("pointerover", () => {
            titelScene.startButtonGlow.active = true;
        });
        titelScene.startButton.on("pointerout", () => {
            titelScene.startButtonGlow.active = false;
        });
    };
    /**
     * 
     * @param {TitelScene} titelScene 
     */
    static createOptionButton(titelScene) {
        titelScene.optionButton = titelScene.add.sprite(960, 980, "options-button");
        titelScene.optionButtonGlow = titelScene.optionButton.preFX.addGlow("0x39FF14" , 3, undefined, undefined, undefined, 5);
        titelScene.optionButtonGlow.active = false;
        titelScene.optionButton.setInteractive();

        titelScene.optionButton.on("pointerdown", () => {
            //ADD OPTION MENU OPEN
        });
        titelScene.optionButton.on("pointerover", () => {
            titelScene.optionButtonGlow.active = true;
        });
        titelScene.optionButton.on("pointerout", () => {
            titelScene.optionButtonGlow.active = false;
        });
    };
    /**
     * 
     * @param {TitelScene} titelScene 
     */
    static createQuitButton(titelScene) {
        titelScene.quitButton = titelScene.add.sprite(960 + 200, 950, "quit-button");
        titelScene.quitButtonGlow = titelScene.quitButton.preFX.addGlow("0x39FF14" , 3, undefined, undefined, undefined, 5);
        titelScene.quitButtonGlow.active = false;
        titelScene.quitButton.setInteractive();

        titelScene.quitButton.on("pointerdown", () => {
            window.electronAPI.quitGame();
        });
        titelScene.quitButton.on("pointerover", () => {
            titelScene.quitButtonGlow.active = true;
        });
        titelScene.quitButton.on("pointerout", () => {
            titelScene.quitButtonGlow.active = false;
        });
    };
};