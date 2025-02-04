import Phaser from "phaser";
import NormalBallObj from "../GameObjects/Balls/NormalBall/NormalBall.js";
import NormalStone from "../GameObjects/Stones/NormalStone.js";
import RedStone from "../GameObjects/Stones/RedStones.js";
import SolidRedStone from "../GameObjects/Stones/SolidStoneRed.js";
import NormalBombStone from "../GameObjects/Stones/NormalStoneBomb.js";
import NormalStoneAI from "../GameObjects/Stones/NormalStoneAI.js";
import NormalLilaStone from "../GameObjects/Stones/MultiHitStones/NormalLilaStone.js";
import BombStoneLila from "../GameObjects/Stones/MultiHitStones/BombStoneLils.js";
import NormalStoneSpeed from "../GameObjects/Stones/NormalStoneSpeed.js";
import TrippleBallStone from "../GameObjects/Stones/TrippleBallStone.js";
import Player from "../GameObjects/Player/Player.js";

export default class StoneGenerator {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;

        this.StoneTypes = {
            NORMAL: "normal-stone",
            NORMAL_RED: "red-stone"
        };
    };

    setBallRef(ballRef) {
        /**@type {NormalBallObj} */
        this.ball = ballRef;
    };

    generateStoneMap(stoneMap, stoneType) {
        /**@type {Array} */
        let map = stoneMap;
        let stoneArr = [];
        switch (stoneType) {
            case "normal-stone":
                for (let {x, y, scale, depth} of map) {
                    /**@type {NormalStone} */
                    let newStone = new NormalStone(this.scene);
                    newStone.create(x, y, scale, depth);
                    newStone.addOverlapBall(this.ball);
                    stoneArr.push(newStone);
                };
                break;

            case "red-stone":
                for (let {x, y, scale, depth} of map) {
                    /**@type {RedStone} */
                    let newStone = new RedStone(this.scene);
                    newStone.create(x, y, scale, depth);
                    newStone.addOverlapBall(this.ball);
                    stoneArr.push(newStone);
                };
                break;

            case "solid-stone-red":
                for (let {x, y, scale, depth} of map) {
                    /**@type {SolidRedStone} */
                    let newStone = new SolidRedStone(this.scene);
                    newStone.create(x, y, scale, depth);
                    newStone.addOverlapBall(this.ball);
                    stoneArr.push(newStone);
                };
                break;

                //FIX BALL REF PROBLEM
            case "normal-stone-bomb":
                for (let {x, y, scale, depth} of map) {
                    /**@type {NormalBombStone} */
                    let newStone = new NormalBombStone(this.scene);
                    newStone.create(x, y, scale, depth);
                    newStone.addOverlapBall(this.ball);
                    stoneArr.push(newStone);
                };
                break;

            case "normal-stone-ai":
                for (let {x, y, scale, depth} of map) {
                    /**@type {NormalStoneAI} */
                    let newStone = new NormalStoneAI(this.scene);
                    newStone.create(x, y, scale, depth);
                    newStone.addOverlapBall(this.ball);
                    stoneArr.push(newStone);
                };
                break;

            case "normal-lila-stone":
                for (let {x, y, scale, depth} of map) {
                    /**@type {NormalLilaStone} */
                    let newStone = new NormalLilaStone(this.scene);
                    newStone.create(x, y, scale, depth);
                    newStone.addOverlapBall(this.ball);
                    stoneArr.push(newStone);
                };
                break;

            case "Lila-bomb-stone":
                for (let {x, y, scale, depth} of map) {
                    /**@type {BombStoneLila} */
                    let newStone = new BombStoneLila(this.scene);
                    newStone.create(x, y, scale, depth);
                    newStone.addOverlapBall(this.ball);
                    stoneArr.push(newStone);
                };
                break;

            case "normal-stone-speed":
                for (let {x, y, scale, depth} of map) {
                    /**@type {NormalStoneSpeed} */
                    let newStone = new NormalStoneSpeed(this.scene);
                    newStone.create(x, y, scale, depth);
                    newStone.addOverlapBall(this.ball);
                    newStone.setPlayerRef(this.scene.player);
                    stoneArr.push(newStone);
                };
                break;

            case "normal-tripple-stone":
                for (let {x, y, scale, depth} of map) {
                    /**@type {TrippleBallStone} */
                    let newStone = new TrippleBallStone(this.scene);
                    newStone.create(x, y, scale, depth);
                    newStone.addOverlapBall(this.ball);
                    stoneArr.push(newStone);
                }
                break;
        }
        return stoneArr;
    };
};