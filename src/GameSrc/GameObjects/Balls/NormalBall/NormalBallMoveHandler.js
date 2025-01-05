import NormalBallObj from "./NormalBall";


export default class NormalBallMoveHandler {
    /**
     * @param {NormalBallObj} ball 
     */
    static checkBallMove(ball) {
        switch (ball.currentMoveDirectionX) {
            case ball.BALL_MOVE_X.LEFT:
                ball.normalBall.setVelocityX(ball.BALL_MOVE_X.LEFT * ball.ballSpeeds.SPEED_LEFT);
                break;
                
            case ball.BALL_MOVE_X.RIGHT:
                ball.normalBall.setVelocityX(ball.BALL_MOVE_X.RIGHT * ball.ballSpeeds.SPEED_RIGHT);
                break;
        };
        switch (ball.currentMoveDirectionY) {
            case ball.BALL_MOVE_Y.DOWN:
                ball.normalBall.setVelocityY(ball.BALL_MOVE_Y.DOWN * ball.ballSpeeds.SPEED_DOWN);
                break;
    
            case ball.BALL_MOVE_Y.UP:
                ball.normalBall.setVelocityY(ball.BALL_MOVE_Y.UP * ball.ballSpeeds.SPEED_UP);
                break;
        };
    };

    /**
     * 
     * @param {NormalBallObj} ball 
     */
    static invertBallVelocityDirection(ball) {
        if (ball.currentMoveDirectionY == ball.BALL_MOVE_Y.UP) {
            ball.currentMoveDirectionY = ball.BALL_MOVE_Y.DOWN;
        } else if (ball.currentMoveDirectionY == ball.BALL_MOVE_Y.DOWN) {
            ball.currentMoveDirectionY = ball.BALL_MOVE_Y.UP;
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
        let newVerticalSpeedRight = Phaser.Math.RND.pick([800, 1000, 700, 500]);
        ball.ballSpeeds.SPEED_RIGHT = newVerticalSpeedRight;
        
        let newVerticalSpeedLeft = Phaser.Math.RND.pick([800, 1000, 700, 500]);
        ball.ballSpeeds.SPEED_LEFT = newVerticalSpeedLeft;
        
        let newHorizontalSpeedDown = Phaser.Math.RND.pick([800, 1000, 700, 500]);
        ball.ballSpeeds.SPEED_DOWN = newHorizontalSpeedDown
        
        let newHorizontalSpeedUP = Phaser.Math.RND.pick([800, 1000, 700, 500]);
        ball.ballSpeeds.SPEED_UP = newHorizontalSpeedUP;       
    };

    /**
     * 
     * @param {NormalBallObj} ball 
     */
    static checkIfBallIsntMove(ball) {
        if (ball.normalBall.body.velocity.x == 0) {
            ball.normalBall.setVelocityX(ball.currentMoveDirectionX * ball.SPEED);
        };
        if (ball.normalBall.body.velocity.y == 0) {
            ball.normalBall.setVelocityY(ball.currentMoveDirectionY * ball.SPEED);
        }
    }
};