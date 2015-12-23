define(function (require) {
    var GameElement = require('./GameElement');
    var EnemyManager = require('./EnemyManager');
    var Util = require('./Util');
    var Sounds = require('./Sounds');

    var canvas4 = document.getElementById('gameCanvas_4'); //Enemies
    var canvas5 = document.getElementById('gameCanvas_5'); //Kakachu

    var enemyManager = new EnemyManager(canvas4);

    var kakachu = new GameElement({
        width: 75,
        height: 75,
        //imageSource: 'Images/Kakachu.png',
        imageSource: 'Images/SuperKakachu.png',
        x: 0,
        //y: 280,
        y:260,
        canvas: canvas5,
        updateFn: Util.slideBG(0)
    });

    var progressBar = new GameElement({
        width: 300,
        height: 50,
        imageSource: '',
        x: 300,
        y: 100,
        canvas: canvas5,
        updateFn: function(){

        }
    });

    var jumping = false,
        counter = 0,
        DRAW_INTERVAL = 17;

    /*** Gameloop ***/
    setTimeout(function drawAll() {
        if (counter == 5) {
            kakachu.draw(true);
        }
        if (counter % 30 == 0) {
            if (Math.random() < 0.1) {
                enemyManager.addEnemy();
            }
            counter = 0;
        }
        if (jumping) {
            kakachu.draw(true);
        }
        enemyManager.drawAll();
        counter++;
        setTimeout(drawAll, DRAW_INTERVAL);
    }, DRAW_INTERVAL);

    /*** Handlers ***/
    canvas5.addEventListener('keydown', function (event) {
        if (event.keyCode === 32 && !jumping) {
            Sounds.jumpSound();
            jumping = true;
            var posY = 280, x = 0, interval = (Math.PI / 100), counter = 0;
            var thisInterval = setInterval(function () {
                x = Math.PI + (interval * counter++);
                posY = 280 + 100 * Math.sin(x);
                kakachu.y = posY;
                if (x >= 2 * Math.PI) {
                    clearInterval(thisInterval);
                    jumping = false;
                    kakachu.draw(true);
                }
            }, 10);
        }
    });

});