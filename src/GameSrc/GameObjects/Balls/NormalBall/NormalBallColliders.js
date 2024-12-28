import NormalBallObj from "./NormalBall";

export default class NormalBallColliders {
    /**
     * 
     * @param {NormalBallObj} ball 
     */
    static addCollider(ball) {
        ball.scene.physics.add.overlap(ball.normalBall, ball.mapRef.leftBoder, () => {
            ball.currentMoveDirectionX = ball.BALL_MOVE_X.RIGHT;
                ball.playSound("ball-hit-wall");
        });
        ball.scene.physics.add.overlap(ball.normalBall, ball.mapRef.rightBorder, () => {
            ball.currentMoveDirectionX = ball.BALL_MOVE_X.LEFT;
            ball.playSound("ball-hit-wall");
        })
        
        ball.scene.physics.add.overlap(ball.playerRef.playerPaddle, ball.normalBall, () => {
            ball.currentMoveDirectionY = ball.BALL_MOVE_Y.UP;
            ball.playerRef.glowTrigger();
            ball.playSound("ball-hit-stone");
            ball.scene.time.delayedCall(100, () => {
                ball.playerRef.glowTrigger()
            })
        });
        ball.scene.physics.add.overlap(ball.normalBall, ball.mapRef.topBorder, () => {
            ball.currentMoveDirectionY = ball.BALL_MOVE_Y.DOWN;
            ball.playSound("ball-hit-wall");
        })
    }
}