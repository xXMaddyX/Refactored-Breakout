import Phaser from "phaser";
import TitelScene from "../GameScenesAndLvL/Scenes/TitelScene/TitelScene.js";
import Level1Scene from "../GameScenesAndLvL/Scenes/SceneLvL1/level1Scene.js";
import Level2Scene from "../GameScenesAndLvL/Scenes/level2.Scene.js/level2Scene.js";
import Level3Scene from "../GameScenesAndLvL/Scenes/SceneLvL3/level3Scene.js";
import Level4Scene from "../GameScenesAndLvL/Scenes/SceneLvL4/level4Scene.js";
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
            this.scene.scene.remove(oldScene);
        }
    };

    loadLevel1(oldScene) {
        /**@type {Level1Scene} */
        this.level1 = this.scene.scene.add("SceneLvL1", Level1Scene, true);
        GAME_DATA.PLAYER_STATES.PLAYER_LIFES = 3;
        this.scene.scene.launch("SceneLvL1");
        GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE = "SceneLvL1";
        if (oldScene) {
            this.scene.scene.remove(oldScene);
        }
    };

    loadLevel2(oldScene) {
        /**@type {Level2Scene}*/
        this.level2 = this.scene.scene.add("SceneLvL2", Level2Scene, true);
        GAME_DATA.PLAYER_STATES.PLAYER_LIFES = 3;
        this.scene.scene.launch("SceneLvL2");
        GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE = "SceneLvL2";
        if (oldScene) {
            this.scene.scene.remove(oldScene);
        };
    };

    loadLevel3(oldScene) {
        /**@type {Level3Scene} */
        this.level3 = this.scene.scene.add("SceneLvL3", Level3Scene, true);
        GAME_DATA.PLAYER_STATES.PLAYER_LIFES = 3;
        this.scene.scene.launch("SceneLvL3");
        GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE = "SceneLvL3";
        if (oldScene) {
            this.scene.scene.remove(oldScene);
        };
    };

    loadLevel4(oldScene) {
        this.level4 = this.scene.scene.add("SceneLvL4", Level4Scene, true);
        GAME_DATA.PLAYER_STATES.PLAYER_LIFES = 3;
        this.scene.scene.launch("SceneLvL4");
        GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE = "SceneLvL4";
        if (oldScene) {
            this.scene.scene.remove(oldScene);
        };
    };
};