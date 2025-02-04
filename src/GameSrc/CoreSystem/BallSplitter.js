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
        let initialSpeedY = Phaser.Math.RND.pick([200, 300, 400]);
        let initialSpeedX = Phaser.Math.RND.pick([50, 100, 150]);
        newBall.BALL_IS_FIRED = true;
        newBall.create()
        newBall.setPosition(position.posX, position.posY);
        newBall.normalBall.setVelocity(initialSpeedX, initialSpeedY);
        newBall.addPlayerRef(scene.player, scene.map);
        newBall.addNormalBallCollider();

        for (let normalStone of scene.NormalStonePool) {
            normalStone.addOverlapBall(newBall);
        };

        for (let lilaStone of scene.NormalLilaStonePool) {
            lilaStone.addOverlapBall(newBall)
        }
        scene.NormalBallPool.push(newBall);
    };
};

export {
    ballSplitterFunc,
}