define(function(){
    var jump = new Audio();
    jump.src = "Sounds/jump.ogg";

    var mariachi = new Audio();
    mariachi.src = "Sounds/powerUp.ogg";

    var gameOver = new Audio();
    gameOver.src = "Sounds/gameOver.ogg";

    return {
        jumpSound : function(){jump.play();},
        powerUpSound : function(){mariachi.play();},
        gameOver : function(){gameOver.play();}
    }
});