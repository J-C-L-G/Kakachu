define(function (require) {
    var GameElement = require('./GameElement');
    var EnemyManager = require('./EnemyManager');

    var canvas1 = document.getElementById('gameCanvas_1');
    var canvas2 = document.getElementById('gameCanvas_2');
    var canvas3 = document.getElementById('gameCanvas_3');
    var canvas3_1 = document.getElementById('gameCanvas_3_1');
    var canvas4 = document.getElementById('gameCanvas_4');

    function updatePosition() {
        this.x--;
    }

    var clouds = new GameElement({
        width: 1800,
        height: 131,
        imageSource: 'Images/Clouds.png',
        x: 0,
        y: 0,
        canvas: canvas1,
        updateFn: updatePosition
    });

    var mountains = new GameElement({
        width: 1800,
        height: 131,
        imageSource: 'Images/Mountains.png',
        x: 0,
        y: 100,
        canvas: canvas2,
        updateFn: updatePosition
    });
    var ground = new GameElement({
        width: 1800,
        height: 50,
        imageSource: 'Images/Ground.png',
        x: 0,
        y: 350,
        canvas: canvas3,
        updateFn: updatePosition
    });

    var kakachu = new GameElement({
        width: 75,
        height: 75,
        imageSource: 'Images/Kakachu.png',
        x: 0,
        y: 280,
        canvas: canvas4,
        updateFn: function () {
            this.x = this.x;
        }
    });

    var enemyManager = new EnemyManager(canvas3_1);

    var jumping = false;
    var counter = 0, DRAW_INTERVAL = 17;

    setTimeout(function drawAll() {

        if (counter == 5) {
            //canvasContext4.clearRect(0, 0, canvasContext4.canvas.width, canvasContext4.canvas.height);
            kakachu.draw();
        }

        if (counter % 30 == 0) {
            if(Math.random() < 0.1)
                enemyManager.addEnemy();

            //canvasContext1.clearRect(0, 0, canvasContext1.canvas.width, canvasContext1.canvas.height);
            /*canvasContext1.rect(0,0,600,400);
             canvasContext1.fillStyle="lightblue";
             canvasContext1.fill();
             */
            //clouds.updatePosition();
            //clouds.x = clouds.x - 1;
            clouds.draw();
            counter = 0;
        }

        if (counter % 10 == 0) {
            //canvasContext2.clearRect(0, 0, canvasContext2.canvas.width, canvasContext2.canvas.height);
            //mountains.updatePosition();
            //mountains.x = mountains.x - 1;
            mountains.draw();
        }

        if (counter % 4 == 0) {
            //canvasContext3.clearRect(0, 0, canvasContext3.canvas.width, canvasContext3.canvas.height);
            //ground.updatePosition();
            //ground.x = ground.x - 1;
            ground.draw();
        }

        enemyManager.drawAll();

        if (jumping) {
            //canvasContext4.clearRect(0, 0, canvasContext4.canvas.width, canvasContext4.canvas.height);
            kakachu.draw();
        }

        counter++;
        setTimeout(drawAll, DRAW_INTERVAL);

    }, DRAW_INTERVAL);

    canvas4.addEventListener('keydown', function (event) {
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
                    //canvasContext4.clearRect(0, 0, canvasContext4.canvas.width, canvasContext4.canvas.height);
                    kakachu.draw();
                }
            }, 10)
        }
    })

});