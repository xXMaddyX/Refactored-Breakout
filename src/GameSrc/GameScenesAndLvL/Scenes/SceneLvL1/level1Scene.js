import Phaser from "phaser";
import Map1 from "../../Worlds/LvL1/map1.js";
import { stoneConfig } from "./level1Config.js";
import MainScene from "../../../CoreSystem/MainScene.js";
import Player from "../../../GameObjects/Player/Player.js";
import UserInterface from "../../../UI/UserInterface.js";
import NormalBallObj from "../../../GameObjects/Balls/NormalBall/NormalBall.js";
import RedStone from "../../../GameObjects/Stones/RedStones.js";
import StoneGenerator from "../../../CoreSystem/StoneGenerator.js";
import NormalStone from "../../../GameObjects/Stones/NormalStone.js";
import GAME_DATA from "../../../CoreSystem/MainGameHandler.js";

export default class Level1Scene extends Phaser.Scene {
    constructor(mainSceneRef) {
        super();
        /**@type {MainScene} */
        this.mainScene = mainSceneRef;
        this.stopLoop = false;

        this.NormalStonePool = [];
        this.RedStonePool = [];
    };

    preload() {
        Map1.loadSprites(this);
        Player.loadSprites(this);
        NormalBallObj.loadSprites(this);
        NormalStone.loadSprites(this);
        RedStone.loadSprites(this);
        UserInterface.loadSprites(this);
    };

    create() {
        this.map = new Map1(this);
        this.map.create();

        //ADD PLAYER----------------------------->
        this.player = new Player(this);
        this.player.create(this.map.xCenter, this.map.yCenter + 500);
        this.player.PlayerLifes = GAME_DATA.PLAYER_STATES.DEFAULT_PLAYER_LIFES;
        this.player.addMapRef(this.map);
        this.addPlayerWorldCollider();
        
        //ADD START BALL------------------------->
        this.normalBall = new NormalBallObj(this);
        this.normalBall.create();
        this.player.addBallRef(this.normalBall);
        this.normalBall.addPlayerRef(this.player, this.map);
        this.normalBall.addNormalBallCollider();

        this.UI = new UserInterface(this);
        this.UI.create();
        this.UI.setPlayerPaddelRef(this.player);

        /**@type {MainScene} */
        GAME_DATA.SCENE_REFS.MAIN_SCENE_REF.setUIRef(this.UI);

        this.stoneGenerator = new StoneGenerator(this);
        this.stoneGenerator.setBallRef(this.normalBall);
        this.NormalStonePool = this.stoneGenerator.generateStoneMap(stoneConfig.normal_stones, "normal-stone");

        this.RedStonePool = this.stoneGenerator.generateStoneMap(stoneConfig.red_stones, "red-stone");
    };

    addPlayerWorldCollider() {
        this.physics.add.collider(this.player.playerPaddle, this.map.leftBoder);
        this.physics.add.collider(this.player.playerPaddle, this.map.rightBorder);
    };

    loadNextScene() {
        GAME_DATA.SCENE_REFS.SCENE_LOADER_REF.loadLevel2(GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE);
    };

    update(time, delta) {
        if (!this.stopLoop) {
            this.map.update(time, delta);
            this.player.update(time, delta);
            this.normalBall.update(time, delta);
            this.UI.update(time, delta);
            
            this.NormalStonePool.forEach(stone => {
                stone.update();
            });
            this.updatePools();
            if (this.NormalStonePool == 0 && this.RedStonePool == 0) {
                this.stopLoop = true;
                this.player.playerPaddle.setVelocity(0);
                this.normalBall.normalBall.setVelocity(0);
                this.UI.showCrushedIt();
                this.time.delayedCall(5000, () => {
                    this.UI.hideCrushedIt();
                    this.UI.showScoreBord();
                });
            };
        };
    };
    updatePools() {
        this.NormalStonePool = this.NormalStonePool.filter((ball) => ball.isDestroyed != true);
        this.RedStonePool = this.RedStonePool.filter((ball) => ball.isDestroyed != true);
    };
};