import NormalBallObj from "./NormalBall";


export default class NormalBallMoveHandler {
    /**
     * @param {NormalBallObj} ball 
     */
    static checkBallMove(ball) {
        switch (ball.currentMoveDirectionX) {
            case ball.BALL_MOVE_X.LEFT:
                ball.normalBall.setVelocityX(ball.BALL_MOVE_X.LEFT * ball.SPEED);
                break;
                
            case ball.BALL_MOVE_X.RIGHT:
                ball.normalBall.setVelocityX(ball.BALL_MOVE_X.RIGHT * ball.SPEED);
                break;
        };
        switch (ball.currentMoveDirectionY) {
            case ball.BALL_MOVE_Y.DOWN:
                ball.normalBall.setVelocityY(ball.BALL_MOVE_Y.DOWN * ball.SPEED);
                break;
    
            case ball.BALL_MOVE_Y.UP:
                ball.normalBall.setVelocityY(ball.BALL_MOVE_Y.UP * ball.SPEED);
                break;
        };
    };

    /**
     * 
     * @param {NormalBallObj} ball 
     */
    static invertBallVelocityDirection(ball) {
        if (ball.currentMoveDirectionY === ball.BALL_MOVE_Y.DOWN) {
            ball.normalBall.setVelocityY(ball.BALL_MOVE_Y.UP * ball.SPEED);
            ball.currentMoveDirectionY = ball.BALL_MOVE_Y.UP;
        }
        if (ball.currentMoveDirectionY === ball.BALL_MOVE_Y.UP) {
            ball.normalBall.setVelocityY(ball.BALL_MOVE_Y.DOWN * ball.SPEED);
            ball.currentMoveDirectionY = ball.BALL_MOVE_Y.DOWN;
        };
        
        const newDirection = Phaser.Math.RND.pick([ball.BALL_MOVE_X.LEFT, ball.BALL_MOVE_X.RIGHT]);
        ball.normalBall.setVelocityX(newDirection * ball.SPEED);
        ball.currentMoveDirectionX = newDirection;
    };

    /**
     * 
     * @param {NormalBallObj} ball 
     */
    static changeSpeedRandom(ball) {
        let newVerticalSpeedRight = Phaser.Math.RND.pick([1.5, 2, 1.1, 1.0]);
        ball.BALL_MOVE_X.RIGHT = newVerticalSpeedRight;
        
        let newVerticalSpeedLeft = Phaser.Math.RND.pick([-1.5, -2, -1.1, -1.0]);
        ball.BALL_MOVE_X.LEFT = newVerticalSpeedLeft;
        
        let newHorizontalSpeedDown = Phaser.Math.RND.pick([1.5, 2, 1.1, 1.0]);
        ball.BALL_MOVE_Y.DOWN = newHorizontalSpeedDown;
        
        let newHorizontalSpeedUP = Phaser.Math.RND.pick([-1.5, -2, -1.1, -1.0]);
        ball.BALL_MOVE_Y.UP = newHorizontalSpeedUP;        
    };
};