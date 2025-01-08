import Phaser from "phaser";
import Map2 from "../../Worlds/LvL2/map2.js";
import StoneConfigLvL2 from "./level2.Config.js";
import MainScene from "../../../CoreSystem/MainScene.js";
import Player from "../../../GameObjects/Player/Player.js";
import UserInterface from "../../../UI/UserInterface.js";
import NormalBallObj from "../../../GameObjects/Balls/NormalBall/NormalBall.js";
import RedStone from "../../../GameObjects/Stones/RedStones.js";
import SolidRedStone from "../../../GameObjects/Stones/SolidStoneRed.js";
import StoneGenerator from "../../../CoreSystem/StoneGenerator.js";
import NormalStone from "../../../GameObjects/Stones/NormalStone.js";
import GAME_DATA from "../../../CoreSystem/MainGameHandler.js";
import NormalBombStone from "../../../GameObjects/Stones/NormalStoneBomb.js";

export default class Level2Scene extends Phaser.Scene {
    constructor(mainSceneRef) {
        super();
        /**@type {MainScene} */
        this.mainScene = mainSceneRef;
        this.stopLoop = false;

        this.NormalStonePool = [];
        this.RedStonePool = [];
        this.SolidRedStonePool = [];
        this.NormalStoneBombPool = [];
    }

    preload() {
        Map2.loadSprites(this);
        Player.loadSprites(this);
        NormalBallObj.loadSprites(this);
        NormalStone.loadSprites(this);
        RedStone.loadSprites(this);
        SolidRedStone.loadSprites(this);
        NormalBombStone.loadSprites(this);
        UserInterface.loadSprites(this);
    };

    loadNextLevel() {
        this.map.isAudioStoped = true;
        this.map.audio.stop();
        GAME_DATA.SCENE_REFS.SCENE_LOADER_REF.loadLevel3(GAME_DATA.CURRENT_GAME_STATES.CURRENT_SCENE);
    };

    create() {
        this.map = new Map2(this);
        this.map.create();

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

        this.NormalStonePool = this.stoneGenerator.generateStoneMap(StoneConfigLvL2.NormalStones, "normal-stone");
        this.RedStonePool = this.stoneGenerator.generateStoneMap(StoneConfigLvL2.RedStones, "red-stone");
        this.SolidRedStonePool = this.stoneGenerator.generateStoneMap(StoneConfigLvL2.SolidStones, "solid-stone-red");
        this.NormalStoneBombPool = this.stoneGenerator.generateStoneMap(StoneConfigLvL2.NormalStonesBomb, "normal-stone-bomb");

        this.sound.volume = GAME_DATA.GAME_SETTING.GAME_VOLUME;
    };

    addPlayerWorldCollider() {
        this.physics.add.collider(this.player.playerPaddle, this.map.leftBoder);
        this.physics.add.collider(this.player.playerPaddle, this.map.rightBorder);
    };

    update(time, delta) {
        this.map.update(time, delta);
        this.player.update(time, delta);
        this.normalBall.update(time, delta);
        this.UI.update(time, delta);
        this.updatePools();
        if (this.NormalStonePool == 0 && this.RedStonePool == 0 && this.SolidRedStonePool == 0 && this.NormalStoneBombPool == 0) {
            this.stopLoop = true;
            this.player.playerPaddle.setVelocity(0);
            this.normalBall.normalBall.setVelocity(0);
            this.UI.showCrushedIt();
            this.time.delayedCall(5000, () => {
                this.UI.hideCrushedIt();
                this.UI.showScoreBord();
            });
        };

        this.SolidRedStonePool.forEach((stone) => {
            stone.update(time, delta);
        });
    };

    updatePools() {
        this.NormalStonePool = this.NormalStonePool.filter((ball) => ball.isDestroyed != true);
        this.RedStonePool = this.RedStonePool.filter((ball) => ball.isDestroyed != true);
        this.SolidRedStonePool = this.SolidRedStonePool.filter((ball) => ball.isDestroyed != true);
        this.NormalStoneBombPool = this.NormalStoneBombPool.filter((ball) => ball.isDestroyed != true);
    };
};