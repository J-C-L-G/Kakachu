define(function(){
    function jumpAttack() {
        this.y = 90 + Math.abs(165 * Math.sin((Math.PI - this.x--) / 63.69));
    }

    function slideAttack(){
        this.x = this.x-3;
    }

    return {
        jumpAttack:jumpAttack,
        slideAttack:slideAttack
    }
});