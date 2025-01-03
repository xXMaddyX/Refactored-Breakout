import Phaser from "phaser";
import MainScene from "../../../CoreSystem/MainScene.js";
import Map3 from "../../Worlds/map3.js/map3.js";
import { stoneConfigLvL3 } from "./level3.Config.js";
import Player from "../../../GameObjects/Player/Player.js";
import UserInterface from "../../../UI/UserInterface.js";
import NormalBallObj from "../../../GameObjects/Balls/NormalBall/NormalBall.js";
import RedStone from "../../../GameObjects/Stones/RedStones.js";
import StoneGenerator from "../../../CoreSystem/StoneGenerator.js";
import NormalStone from "../../../GameObjects/Stones/NormalStone.js";
import NormalLilaStone from "../../../GameObjects/Stones/MultiHitStones/NormalLilaStone.js";
import NormalStoneAI from "../../../GameObjects/Stones/NormalStoneAI.js";
import GAME_DATA from "../../../CoreSystem/MainGameHandler.js";
import BombStoneLila from "../../../GameObjects/Stones/MultiHitStones/BombStoneLils.js";

export default class Level3Scene extends Phaser.Scene {
    constructor(scene) {
        super();
        /**@type {Phaser.Scene} */
        this.scene = scene;

        this.NormalStonePool = [];
        this.RedStonePool = [];
        this.solidStonePool = [];
        this.NormalLilaStonePool = [];
        this.LilaBombStonePool = [];
    };

    preload() {
        Player.loadSprites(this);
        NormalBallObj.loadSprites(this);
        NormalStone.loadSprites(this);
        RedStone.loadSprites(this);
        NormalStoneAI.loadSprites(this);
        UserInterface.loadSprites(this);
        BombStoneLila.loadSprites(this);
        NormalLilaStone.loadSprites(this);
    };

    create() {
        this.map = new Map3(this);
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

        this.NormalStonePool = this.stoneGenerator.generateStoneMap(stoneConfigLvL3.normal_stones, "normal-stone");
        this.RedStonePool = this.stoneGenerator.generateStoneMap(stoneConfigLvL3.red_stones, "red-stone");
        this.solidStonePool = this.stoneGenerator.generateStoneMap(stoneConfigLvL3.solid_stones, "solid-stone-red");
        this.LilaBombStonePool = this.stoneGenerator.generateStoneMap(stoneConfigLvL3.lila_bomb_stones, "Lila-bomb-stone");
        this.NormalLilaStonePool = this.stoneGenerator.generateStoneMap(stoneConfigLvL3.lila_stones, "normal-lila-stone");
    };

    addPlayerWorldCollider() {
        this.physics.add.collider(this.player.playerPaddle, this.map.leftBoder);
        this.physics.add.collider(this.player.playerPaddle, this.map.rightBorder);
    };

    update(time, delta) {
        this.map.update(time, delta);
        this.player.update(time, delta);
        this.UI.update(time, delta);
        this.normalBall.update(time, delta);
        this.updatePools();

    };

    updatePools() {
        this.NormalStonePool = this.NormalStonePool.filter((stone) => stone.isDestroyed != true);
        this.RedStonePool = this.RedStonePool.filter((stone) => stone.isDestroyed != true);
        this.solidStonePool = this.solidStonePool.filter((stone) => stone.isDestroyed != true);
        this.LilaBombStonePool = this.LilaBombStonePool.filter((stone) => stone.isDestroyed != true);
        this.NormalLilaStonePool = this. NormalLilaStonePool.filter((stone) => stone.isDestroyed != true);
    };
};