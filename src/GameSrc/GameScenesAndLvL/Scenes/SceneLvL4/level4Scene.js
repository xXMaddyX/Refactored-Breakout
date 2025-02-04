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
import TrippleBallStone from "../../../GameObjects/Stones/TrippleBallStone.js";
import { ballSplitterFunc } from "../../../CoreSystem/BallSplitter.js";
import Biene from "../../../GameObjects/EnvObjects/Biene.js";

export default class Level4Scene extends Phaser.Scene {
    constructor(scene) {
        super();
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.stopLoop = false;

        //STONE_POOLS------------>
        this.NormalStonePool = [];
        this.RedStonePool = [];
        this.solidStonePool = [];
        this.NormalLilaStonePool = [];
        this.LilaBombStonePool = [];
        this.normalAiStonePool = [];
        this.NormalTrippleStonesPool = [];

        this.bienenPool = [];

        //BALL_POOL-------------->
        this.NormalBallPool = [];

        this.poolStates = {
            NormalStonePoolEmpty: false,
            RedStonePoolEmpty: false,
            SolidStonePoolEmpty: false,
            NormalLilaStonePoolEmpty: false,
            LilaBombStonePoolEmpty: false,
            NormalTrippleStonePoolEmpty: false,
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
        TrippleBallStone.loadSprite(this);
        Biene.loadSprites(this);
    };

    create() {
        /**@type {Map4} */
        this.map = new Map4(this);
        this.map.create();

        //ADD PLAYER----------------------------------->
        this.player = new Player(this);
        this.player.create(this.map.xCenter, this.map.yCenter + 500);
        this.player.PlayerLifes = GAME_DATA.PLAYER_STATES.DEFAULT_PLAYER_LIFES;
        this.player.addMapRef(this.map);
        this.addPlayerWorldCollider();
        
        //ADD START BALL------------------------------->
        this.normalBall = new NormalBallObj(this);
        this.normalBall.IS_MAIN_BALL = true;
        this.normalBall.create();
        this.player.addBallRef(this.normalBall);
        this.normalBall.addPlayerRef(this.player, this.map)
        this.normalBall.addNormalBallCollider();

        this.UI = new UserInterface(this);
        this.UI.create();
        this.UI.setPlayerPaddelRef(this.player);

        /**@type {MainScene} */
        GAME_DATA.SCENE_REFS.MAIN_SCENE_REF.setUIRef(this.UI);

        this.stoneGenerator = new StoneGenerator(this);
        this.stoneGenerator.setBallRef(this.normalBall);

        //ADD STONES TO POOLS AND GENERATE!!!!!!!!!!!!!!
        this.NormalStonePool = this.stoneGenerator.generateStoneMap(stoneConfigLvL4.normal_stones, "normal-stone");
        this.NormalTrippleStonesPool = this.stoneGenerator.generateStoneMap(stoneConfigLvL4.normal_tripple_stones, "normal-tripple-stone");
        this.RedStonePool = this.stoneGenerator.generateStoneMap(stoneConfigLvL4.red_stones, "red-stone");
        this.NormalLilaStonePool = this.stoneGenerator.generateStoneMap(stoneConfigLvL4.lila_stones, "normal-lila-stone");

        for (let biene of stoneConfigLvL4.bienen_positions) {
            let {y, scale, depth, direction, inizialPositions, flipH} = biene;
            let newBiene = new Biene(this);
            newBiene.create(y, scale, depth, direction, inizialPositions, flipH);
            this.bienenPool.push(newBiene);
        };
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

    ballSplitter(position) {
        ballSplitterFunc(this, position);
    }

    checkPools() {
        if (
            this.NormalStonePool == 0 &&
            this.LilaBombStonePool == 0 &&
            this.NormalLilaStonePool == 0 &&
            this.solidStonePool == 0 &&
            this.NormalTrippleStonesPool == 0
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

    updatePools() {
        this.NormalStonePool = this.NormalStonePool.filter((stone) => !stone.isDestroyed);
        this.RedStonePool = this.RedStonePool.filter((stone) => !stone.isDestroyed);
        this.solidStonePool = this.solidStonePool.filter((stone) => !stone.isDestroyed);
        this.NormalLilaStonePool = this.NormalLilaStonePool.filter((stone) => !stone.isDestroyed);
        this.LilaBombStonePool = this.LilaBombStonePool.filter((stone) => !stone.isDestroyed);
        this.normalAiStonePool = this.normalAiStonePool.filter((stone) => !stone.isDestroyed);
        this.NormalTrippleStonesPool = this.NormalTrippleStonesPool.filter((stone) => !stone.isDestroyed);
    };

    updateEnvObjs(time, delta) {
        for (let biene of this.bienenPool) {
            biene.update(time, delta);
        }
    };

    update(time, delta) {
        if (!this.stopLoop) {
            this.map.update(time, delta);
            this.player.update(time, delta);
            this.UI.update(time, delta);
            this.normalBall.update(time, delta);
            this.updateEnvObjs(time, delta)
            this.updatePools();
            this.checkPools();

            for (let stone of this.solidStonePool) {
                stone.update(time, delta);
            };
        };

        for (let ball of this.NormalBallPool) {
            ball.update(time, delta)
        };
    };
};