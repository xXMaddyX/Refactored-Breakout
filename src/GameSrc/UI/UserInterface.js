import Phaser from "phaser";
import Player from "../GameObjects/Player/Player.js";

export default class UserInterface {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;

    };

    static loadSprites(sceneIn) {
        /**@type {Phaser.Scene} */
        let scene = sceneIn;
        
    };

    create() {
        this.Button_Rectangel = this.scene.add.rectangle(1920 - 150, 1080 - 50, 150, 50, "0xff0000");
        this.Button_Rectangel.setInteractive();
        this.Button_Rectangel.on("pointerdown", () => {
            if (this.playerPaddelRef) {
                this.playerPaddelRef.setAiPlayerActive(!this.playerPaddelRef.aiPlayerIsActive);
            };
        });


        this.Ai_Button = this.scene.add.text().setInteractive();
        this.Ai_Button.text = "Activate AI";
        this.Ai_Button.x = this.Button_Rectangel.x - this.Button_Rectangel.width / 2.5;
        this.Ai_Button.y = this.Button_Rectangel.y - 10;
        this.Ai_Button.on("pointerdown", () => {
            if (this.playerPaddelRef) {
                this.playerPaddelRef.setAiPlayerActive(!this.playerPaddelRef.aiPlayerIsActive);
            };
        });


    };

    setPlayerPaddelRef(data) {
        /**@type {Player} */
        this.playerPaddelRef = data;
    };

    update() {

    }
}