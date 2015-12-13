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

    function jumpAttack(top) {

        var d;

        return function(){
            if(top) {
                d = Math.sin((100 - this.x--) / 63.66);
                this.y = 250 + 165 * (d < 0 ? d : 0);
            } else {
                d = Math.sin((300 - this.x--) / 63.66);
                this.y = 250 + 165 * (d < 0 ? d : 0);
            }

            this.x-=3;

        }

        //this.y = (90 + Math.abs(165 * Math.sin((Math.PI - this.x-- -100) / 90)))*0.75+1;
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