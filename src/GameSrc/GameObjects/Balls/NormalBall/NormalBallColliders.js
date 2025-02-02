import NormalBallObj from "./NormalBall";

export default class NormalBallColliders {
    /**
     * 
     * @param {NormalBallObj} ball 
     */
    static addCollider(ball) {
        let collitionPool = [];
        let collider1 = ball.scene.physics.add.overlap(ball.normalBall, ball.mapRef.leftBoder, () => {
            ball.currentMoveDirectionX = ball.BALL_MOVE_X.RIGHT;
                ball.playSound("ball-hit-wall");
        });
        let collider2 = ball.scene.physics.add.overlap(ball.normalBall, ball.mapRef.rightBorder, () => {
            ball.currentMoveDirectionX = ball.BALL_MOVE_X.LEFT;
            ball.playSound("ball-hit-wall");
        });
        
        let collider3 = ball.scene.physics.add.overlap(ball.playerRef.playerPaddle, ball.normalBall, () => {
            ball.changeSpeedRandom();
            ball.currentMoveDirectionY = ball.BALL_MOVE_Y.UP;
            if (!ball.currentMoveDirectionX) {
                ball.currentMoveDirectionX = Phaser.Math.RND.pick([ball.BALL_MOVE_X.LEFT, ball.BALL_MOVE_X.RIGHT]);
            };
            ball.playerRef.glowTrigger();
            ball.playSound("ball-hit-stone");
            ball.scene.time.delayedCall(100, () => {
                ball.playerRef.glowTrigger()
            });
        });
        let collider4 = ball.scene.physics.add.overlap(ball.normalBall, ball.mapRef.topBorder, () => {
            ball.currentMoveDirectionY = ball.BALL_MOVE_Y.DOWN;
            ball.playSound("ball-hit-wall");
        });
        collitionPool.push(collider1, collider2, collider3, collider4);
        return collitionPool;
    };
};