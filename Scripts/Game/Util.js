define(["Sounds"], function (Sounds) {

    //var Sounds = require('./Sounds');

    /*Function that return a function with a specified speed to scroll the background*/
    function slideBG(slideBy) {
        return function () {
            this.x = this.x - slideBy;
            if (-this.width + this.canvasContext.canvas.clientWidth >= this.x) {
                this.x = 0;
            }
        }
    }

    function jumpAttack(top, slideBy) {
        var begin;
        return function () {
            if (top) {
                begin = Math.sin((100 - this.x--) / 63.66);
            } else {
                begin = Math.sin((300 - this.x--) / 63.66);
            }
            this.y = 270 + 165 * (begin < 0 ? begin : 0);
            this.x -= slideBy;
        };
    }

    /*Function to slide an element on the x axis   <--- */
    function slideAttack(slideBy) {
        var collidedX = null, collidedY = null;

        return function () {
            if (this.isDead == true) {
                collidedX = collidedX || this.x;
                collidedY = collidedY || this.y;
                this.x = this.x - slideBy;
                this.y = collidedY - 150 * Math.sin((collidedX - this.x) / 100);

                if (this.x < (collidedX - 150)) this.isDead = false;

                // this.y = 150*Math.pow(this.x - (collidedX - this.x) /2, 2);
            } else {
                collidedX = collidedY = null;
                this.x = this.x - slideBy;
            }

        }
    }

    function unclogger(points) {

        var context = this, x, y;

        var vertices = {
            A: {x: context.x + 43, y: context.y + 3},
            B: {x: context.x + 1, y: context.y + 76},
            C: {x: context.x + 29, y: context.y + 84}
        };

        for (var i = 0; i < points.length; i++) {

            x = points[i].x;
            y = points[i].y;

            if ((x >= vertices.B.x) && (y <= vertices.B.y) && (x <= vertices.C.x) && (y <= vertices.C.y) && (y >= vertices.A.y))
                if ((((vertices.B.x - vertices.A.x) * (y - vertices.A.y) - (vertices.B.y - vertices.A.y) * (x - vertices.A.x)) < 0)
                    && (((vertices.C.x - vertices.A.x) * (y - vertices.A.y) - (vertices.C.y - vertices.A.y) * (x - vertices.A.x)) > 0))

                    /*if (gameState.invincible) {
                        this.isDead = true;
                    } else {
                        this.isDead = false;
                    }*/

            return true;

        }

        return false;

    }

    function rectangle(points) {

        for (var i = 0; i < points.length; i++) {

            if (points[i].x > this.x && (points[i].x < (this.x + this.width)) && (points[i].y > this.y) && (points[i].y < (this.y + this.height))) {

                this.isDead = !!gameState.invincible;

                return true;
            }

        }

        return false;

    }

    function gameOver() {
        if (!gameState.invincible) {
            //Sounds.gameOver();
            alert('\n\nGame Over! \n\nFinal Score: ' + gameState.score);
            window.location.reload();
        }
        else {
            return true; //must change the gameArt to Super Kakachu
        }
    }

    function powerUp() {
        Sounds.powerUpSound();
        gameState.invincible = true;
        setTimeout(function () {
            gameState.invincible = false;
        }, 10500);
    }

    var gameState = {
        invincible: false,
        changed: false,
        score: 0
    };

    return {
        slideBG: slideBG,
        jumpAttack: jumpAttack,
        slideAttack: slideAttack,
        rectangle: rectangle,
        unclogger: unclogger,
        gameOver: gameOver,
        powerUp: powerUp,
        gameState: gameState
    }
});
