import Phaser from "phaser";
import NormalBallObj from "../GameObjects/Balls/NormalBall/NormalBall.js";
import NormalStone from "../GameObjects/Stones/NormalStone.js";
import RedStone from "../GameObjects/Stones/RedStones.js";

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
    }

    generateStoneMap(stoneMap, stoneType) {
        /**@type {Array} */
        let map = stoneMap;
        let stoneArr = [];
        switch (stoneType) {
            case "normal-stone":
                map.forEach(({x, y, scale, depth}) => {
                    /**@type {NormalStone} */
                    let newStone = new NormalStone(this.scene);
                    newStone.create(x, y, scale, depth);
                    newStone.addOverlapBall(this.ball);
    
                    stoneArr.push(newStone);
                });
                break;

            case "red-stone":
                map.forEach(({x, y, scale, depth}) => {
                    /**@type {RedStone} */
                    let newStone = new RedStone(this.scene);
                    newStone.create(x, y, scale, depth);
                    newStone.addOverlapBall(this.ball);
    
                    stoneArr.push(newStone);
                });
                break;
        }
        return stoneArr;
    }
}