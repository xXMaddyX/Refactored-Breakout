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
import NormalStoneAI from "../../../GameObjects/Stones/NormalStoneAI.js";

//TEST FOR LILA STONES
import NormalLilaStone from "../../../GameObjects/Stones/MultiHitStones/NormalLilaStone.js";

export default class Level1Scene extends Phaser.Scene {
    constructor(mainSceneRef) {
        super();
        /**@type {MainScene} */
        this.mainScene = mainSceneRef;
        this.stopLoop = false;

        this.NormalStonePool = [];
        this.RedStonePool = [];
        this.NormalStoneAiPool = [];
        this.NormalLilaStonePool = [];
    };

    preload() {
        Map1.loadSprites(this);
        Player.loadSprites(this);
        NormalBallObj.loadSprites(this);
        NormalStone.loadSprites(this);
        RedStone.loadSprites(this);
        NormalStoneAI.loadSprites(this);
        UserInterface.loadSprites(this);

        //TEST FOR LILA STONES
        NormalLilaStone.loadSprites(this);
    };

    loadNextLevel() {
        this.map.isAudioStoped = true;
        this.map.audio.stop()
        GAME_DATA.SCENE_REFS.SCENE_LOADER_REF.loadLevel2(GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE);
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
        this.NormalStoneAiPool = this.stoneGenerator.generateStoneMap(stoneConfig.normal_stones_ai, "normal-stone-ai");

        //TEST FOR LILA STONES
        this.NormalLilaStonePool = this.stoneGenerator.generateStoneMap(stoneConfig.normal_lila_stones, "normal-lila-stone");

        //Delet later !!!!!!!!!!!!!!!!!!!!!!!!
        this.sound.volume = 0.1;
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
            
            this.updatePools();
            if (this.NormalStonePool == 0 && this.RedStonePool == 0 && this.NormalStoneAiPool == 0) {
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
        this.NormalStoneAiPool = this.NormalStoneAiPool.filter((ball) => ball.isDestroyed != true);

        //TEST LILA STONES
        this.NormalLilaStonePool = this.NormalLilaStonePool.filter((ball) => ball.isDestroyed != true);
    };
};