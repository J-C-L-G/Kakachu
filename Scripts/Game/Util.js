define(function () {

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
        return function () {
            this.x = this.x - slideBy;
        }
    }

    function triangle(points) {

        /*for (var i = 0; i < points.length; i++) {


        }*/

        return false;

    }

    function rectangle(points) {

        for (var i = 0; i < points.length; i++) {

            if (points[i].x > this.x && (points[i].x < (this.x + this.width)) && (points[i].y > this.y) && (points[i].y < (this.y + this.height))) {
                return true;
            }

        }

        return false;

    }

    return {
        slideBG: slideBG,
        jumpAttack: jumpAttack,
        slideAttack: slideAttack,
        rectangle: rectangle,
        triangle: triangle
    }
});