define(function(){

    /*Function that return a function with a specified speed to scroll the background*/
    function slideBG(slideBy){
        return function(){
            this.x = this.x - slideBy;
            if(-this.width + this.canvasContext.canvas.clientWidth >= this.x ){
                this.x = 0;
            }
        }
    }

    function jumpAttack() {
        this.y = 90 + Math.abs(165 * Math.sin((Math.PI - this.x-- -100) / 63.69));
    }

    /*Function to slide an element on the x axis   <--- */
    function slideAttack(slideBy){
        return function(){
            this.x = this.x-slideBy;
        }
    }

    return {
        slideBG:slideBG,
        jumpAttack:jumpAttack,
        slideAttack:slideAttack
    }
});