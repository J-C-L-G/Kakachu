    var Assets = require('./Assets');

    module.exports = {
        jumpSound : function(){Assets.sounds.jump.play();},
        powerUpSound : function(){Assets.sounds.powerUp.play();},
        gameOver : function(){Assets.sounds.gameOver.play();}
    };
