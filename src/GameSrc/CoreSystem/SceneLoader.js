import Phaser from "phaser";
import TitelScene from "../GameScenesAndLvL/Scenes/TitelScene/TitelScene.js";
import Level1Scene from "../GameScenesAndLvL/Scenes/SceneLvL1/level1Scene.js";
import Level2Scene from "../GameScenesAndLvL/Scenes/level2.Scene.js/level2Scene.js";
import GAME_DATA from "./MainGameHandler.js";

export default class SceneLoader{
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
    };

    loadTitelScene(oldScene) {
        /**@type {TitelScene} */
        this.titelScene = this.scene.scene.add("TitelScene", TitelScene, true);
        this.scene.scene.launch("TitelScene");
        GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE = "TitelScene";
        if (oldScene) {
            this.scene.sound.removeAll();
            this.scene.scene.remove(oldScene);
        }
    };

    loadLevel1(oldScene) {
        /**@type {Level1Scene} */
        this.level1 = this.scene.scene.add("SceneLvL1", Level1Scene, true);
        this.scene.scene.launch("SceneLvL1");
        GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE = "SceneLvL1";
        if (oldScene) {
            this.scene.scene.remove(oldScene);
        }
    };

    loadLevel2(oldScene) {
        /**@type {Level2Scene}*/
        this.level2 = this.scene.scene.add("SceneLvL2", Level2Scene, true);
        this.scene.scene.launch("SceneLvL2");
        GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE = "SceneLvL2";
        if (oldScene) {
            this.scene.scene.remove(oldScene);
        };
    }
}