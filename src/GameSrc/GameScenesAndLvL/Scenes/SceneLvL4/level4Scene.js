import Phaser from "phaser";
import MainScene from "../../../CoreSystem/MainScene.js";
import Map4 from "../../Worlds/LvL4/map4.js";
import { stoneConfigLvL4 } from "./level4Config.js";
import Player from "../../../GameObjects/Player/Player.js";
import UserInterface from "../../../UI/UserInterface.js";
import NormalBallObj from "../../../GameObjects/Balls/NormalBall/NormalBall.js";
import RedStone from "../../../GameObjects/Stones/RedStones.js";
import StoneGenerator from "../../../CoreSystem/StoneGenerator.js";
import NormalStone from "../../../GameObjects/Stones/NormalStone.js";
import NormalLilaStone from "../../../GameObjects/Stones/MultiHitStones/NormalLilaStone.js";
import NormalStoneAI from "../../../GameObjects/Stones/NormalStoneAI.js";
import SolidRedStone from "../../../GameObjects/Stones/SolidStoneRed.js";
import GAME_DATA from "../../../CoreSystem/MainGameHandler.js";
import BombStoneLila from "../../../GameObjects/Stones/MultiHitStones/BombStoneLils.js";

export default class Level4Scene extends Phaser.Scene {
    constructor(scene) {
        super();
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.stopLoop = false;

        this.NormalStonePool = [];
        this.RedStonePool = [];
        this.solidStonePool = [];
        this.NormalLilaStonePool = [];
        this.LilaBombStonePool = [];
        this.normalAiStonePool = [];

        this.poolStates = {
            NormalStonePoolEmpty: false,
            RedStonePoolEmpty: false,
            SolidStonePoolEmpty: false,
            NormalLilaStonePoolEmpty: false,
            LilaBombStonePoolEmpty: false,
        };

    };

    preload() {
        Player.loadSprites(this);
        Map4.loadSprites(this);
        NormalBallObj.loadSprites(this);
        NormalStone.loadSprites(this);
        RedStone.loadSprites(this);
        SolidRedStone.loadSprites(this);
        NormalStoneAI.loadSprites(this);
        UserInterface.loadSprites(this);
        BombStoneLila.loadSprites(this);
        NormalLilaStone.loadSprites(this);
    };

    create() {
        /**@type {Map4} */
        this.map = new Map4(this);

        //ADD PLAYER----------------------------------->
        this.player = new Player(this);
        this.player.create(this.map.xCenter, this.map.yCenter + 500);
        this.player.PlayerLifes = GAME_DATA.PLAYER_STATES.DEFAULT_PLAYER_LIFES;
        this.player.addMapRef(this.map);
        this.addPlayerWorldCollider();
        
        //ADD START BALL------------------------------->
        this.normalBall = new NormalBallObj(this);
        this.normalBall.create();
        this.player.addBallRef(this.normalBall);
        this.normalBall.addNormalBallCollider();

        this.UI = new UserInterface(this);
        this.UI.create();
        this.UI.setPlayerPaddelRef(this.player);

        /**@type {MainScene} */
        GAME_DATA.SCENE_REFS.MAIN_SCENE_REF.setUIRef(this.UI);

        this.stoneGenerator = new StoneGenerator(this);
        this.stoneGenerator.setBallRef(this.normalBall);

        //ADD STONES TO POOLS AND GENERATE!!!!!!!!!!!!!!
    };
    addPlayerWorldCollider() {
        this.physics.add.collider(this.player.playerPaddle, this.map.leftBoder);
        this.physics.add.collider(this.player.playerPaddle, this.map.rightBorder);
    };

    loadNextLevel() {
        this.map.isAudioStoped = true;
        //ADD STOP AUDIO METHODE!!!!!!!!!!!!!!!!!!!!!!
        GAME_DATA.SCENE_REFS.SCENE_LOADER_REF.loadTitelScene(GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE);
    };

    checkPools() {
        if (
            this.NormalStonePool == 0 &&
            this.LilaBombStonePool == 0 &&
            this.NormalLilaStonePool == 0 &&
            this.solidStonePool
        ) {
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

    update(time, delta) {
        if (!this.stopLoop) {
            this.map.update(time, delta);
            this.player.update(time, delta);
            this.UI.update(time, delta);
            this.normalBall.update(time, delta);
            this.checkPools();

            this.solidStonePool.forEach((stone) => {
                stone.update(time, delta);
            });
        };
    };
};