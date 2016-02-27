define(function(){
    var boing = new Audio();
    boing.src = "Sounds/boing.ogg";

    var mariachi = new Audio();
    mariachi.src = "Sounds/powerup.ogg";

    return {
        jumpSound : function(){boing.play();},
        powerupSound : function(){mariachi.play();}
    }
});