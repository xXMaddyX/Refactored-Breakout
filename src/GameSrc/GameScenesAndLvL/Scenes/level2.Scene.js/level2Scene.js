import Phaser from "phaser";
import UserInterface from "../../../UI/UserInterface.js";

export default class Level2Scene extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        UserInterface.loadSprites(this);
    };

    create() {
        this.testText = this.add.text(960, 520, "Neue Scene")

        this.UI = new UserInterface(this);
    };

    update(time, delta) {

    }
}