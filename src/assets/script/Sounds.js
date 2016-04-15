    var jump = new Audio();
    jump.src = "assets/sound/jump.ogg";

    var mariachi = new Audio();
    mariachi.src = "assets/sound/powerUp.ogg";

    var gameOver = new Audio();
    gameOver.src = "assets/sound/gameOver.ogg";

    module.exports = {
        jumpSound : function(){jump.play();},
        powerUpSound : function(){mariachi.play();},
        gameOver : function(){gameOver.play();}
    };
