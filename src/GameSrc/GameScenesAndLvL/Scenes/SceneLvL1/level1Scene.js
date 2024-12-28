import Phaser from "phaser";
import Map1 from "../../Worlds/LvL1/map1.js";
import Player from "../../../GameObjects/Player/Player.js";
import UserInterface from "../../../UI/UserInterface.js";
import NormalBallObj from "../../../GameObjects/Balls/NormalBall/NormalBall.js";
import RedStone from "../../../GameObjects/Stones/RedStones.js";
import StoneGenerator from "../../../CoreSystem/StoneGenerator.js";
import NormalStone from "../../../GameObjects/Stones/NormalStone.js";
import { stoneConfig } from "./level1Config.js";

export default class Level1Scene extends Phaser.Scene {
    constructor() {
        super();

        this.NormalStonePool = [];
        this.RedStonePool = [];
    };

    preload() {
        Map1.loadSprites(this);
        Player.loadSprites(this);
        NormalBallObj.loadSprites(this);
        NormalStone.loadSprites(this);
        RedStone.loadSprites(this);
    };

    create() {
        this.map1 = new Map1(this);
        this.map1.create();

        //ADD PLAYER----------------------------->
        this.player = new Player(this);
        this.player.create(this.map1.xCenter, this.map1.yCenter + 500);
        this.addPlayerWorldCollider();
        
        //ADD START BALL------------------------->
        this.normalBall = new NormalBallObj(this);
        this.normalBall.create();
        this.player.addBallRef(this.normalBall);
        this.normalBall.addPlayerRef(this.player, this.map1);
        this.normalBall.addNormalBallCollider();

        this.UI = new UserInterface(this);
        this.UI.create();
        this.UI.setPlayerPaddelRef(this.player);

        this.stoneGenerator = new StoneGenerator(this);
        this.stoneGenerator.setBallRef(this.normalBall);
        this.NormalStonePool = this.stoneGenerator.generateStoneMap(stoneConfig.normal_stones, "normal-stone");

        this.RedStonePool = this.stoneGenerator.generateStoneMap(stoneConfig.red_stones, "red-stone");
    };


    addPlayerWorldCollider() {
        this.physics.add.collider(this.player.playerPaddle, this.map1.leftBoder);
        this.physics.add.collider(this.player.playerPaddle, this.map1.rightBorder);
    };

    update(time, delta) {
        this.map1.update();
        this.player.update();
        this.normalBall.update(time, delta);

        this.NormalStonePool.forEach(stone => {
            stone.update();
        })
    };
};