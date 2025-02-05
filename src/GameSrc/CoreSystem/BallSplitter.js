import Phaser from "phaser";
import NormalBallObj from "../GameObjects/Balls/NormalBall/NormalBall.js";

/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {Object} position 
 * @param {NormalBallObj} normalBallObj 
 */
const ballSplitterFunc = (scene, position) => {
    for (let i = 0; i < 3; i++) {
        let newBall = new NormalBallObj(scene);
        let initialSpeedY = Phaser.Math.RND.pick([1, -1]);
        let initialSpeedX = Phaser.Math.RND.pick([1, -1]);
        newBall.BALL_IS_FIRED = true;
        newBall.create()
        newBall.setPosition(position.posX, position.posY);
        newBall.currentMoveDirectionX = initialSpeedX;
        newBall.currentMoveDirectionY = initialSpeedY;
        newBall.addPlayerRef(scene.player, scene.map);
        newBall.addNormalBallCollider();

        for (let normalStone of scene.NormalStonePool) {
            normalStone.addOverlapBall(newBall);
        };

        for (let lilaStone of scene.NormalLilaStonePool) {
            lilaStone.addOverlapBall(newBall)
        }

        for (let redStone of scene.RedStonePool) {
            redStone.addOverlapBall(newBall);
        }
        scene.NormalBallPool.push(newBall);
    };
};

export {
    ballSplitterFunc,
}