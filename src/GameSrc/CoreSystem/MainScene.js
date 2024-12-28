import Phaser from "phaser"
import SceneLoader from "./SceneLoader.js";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: "main-scene"});
    };

    init() {
        this.sceneLoader = new SceneLoader(this);
    }

    initOnStartup() {
        this.sceneLoader.loadLevel1();
    };

    changeScene(sceneToStop, newScene) {
        this.scene.stop(sceneToStop);
        this.scene.launch(newScene);
    };

    create() {
        this.init();
        this.initOnStartup();
    };
};