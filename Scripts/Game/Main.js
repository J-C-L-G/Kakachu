define(function (require) {
    var GameElement = require('./GameElement');
    var EnemyManager = require('./EnemyManager');
    var Util = require('./Util');

    //var canvas1 = document.getElementById('gameCanvas_1'); //Clouds
    //var canvas2 = document.getElementById('gameCanvas_2'); //Mountains
    //var canvas3 = document.getElementById('gameCanvas_3'); //Ground
    var canvas4 = document.getElementById('gameCanvas_4'); //Enemies
    var canvas5 = document.getElementById('gameCanvas_5'); //Kakachu

    var enemyManager = new EnemyManager(canvas4);

    /*var clouds = new GameElement({
     width: 1800,
     height: 131,
     imageSource: 'Images/Clouds.png',
     x: 0,
     y: 0,
     canvas: canvas1,
     updateFn: Util.slideBG(1)
     });
     var mountains = new GameElement({
     width: 1800,
     height: 131,
     imageSource: 'Images/Mountains.png',
     x: 0,
     y: 100,
     canvas: canvas2,
     updateFn: Util.slideBG(1)
     });
     var ground = new GameElement({
     width: 1800,
     height: 50,
     imageSource: 'Images/Ground.png',
     x: 0,
     y: 350,
     canvas: canvas3,
     updateFn: Util.slideBG(1)
     });*/

    var kakachu = new GameElement({
        width: 75,
        height: 75,
        imageSource: 'Images/Kakachu.png',
        x: 0,
        y: 280,
        canvas: canvas5,
        updateFn: Util.slideBG(0)
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
            //clouds.draw(true);
            counter = 0;
        }
        /*if (counter % 10 == 0) {
         mountains.draw(true);
         }
         if (counter % 4 == 0) {
         ground.draw(true);
         }*/
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