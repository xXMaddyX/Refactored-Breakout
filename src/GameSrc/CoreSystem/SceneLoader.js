import Phaser from "phaser";
import Level1Scene from "../GameScenesAndLvL/Scenes/SceneLvL1/level1Scene.js";

export default class SceneLoader{
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
    };

    loadLevel1(oldScene) {
        this.level1 = this.scene.scene.add("SceneLvL1", Level1Scene, true);
        this.scene.scene.launch("SceneLvL1");
        if (oldScene) {
            oldScene.remove();
        }
    }
}