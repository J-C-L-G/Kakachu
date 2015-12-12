define(function (require) {
    var GameElement = require('./GameElement');

    var canvas1 = document.getElementById('gameCanvas_1');
    var canvasContext1 = canvas1.getContext('2d');
    var canvas2 = document.getElementById('gameCanvas_2');
    var canvasContext2 = canvas2.getContext('2d');
    var canvas3 = document.getElementById('gameCanvas_3');
    var canvasContext3 = canvas3.getContext('2d');
    var canvas4 = document.getElementById('gameCanvas_4');
    var canvasContext4 = canvas4.getContext('2d');

    var clouds = new GameElement(1800, 131, 'Images/Clouds.png', 0, 0, canvasContext1 );
    var mountains = new GameElement(1800, 131, 'Images/Mountains.png', 0, 100, canvasContext2 );
    var ground = new GameElement(1800, 50, 'Images/Ground.png', 0, 350, canvasContext3 );
    var kakachu = new GameElement(75, 75, 'Images/Kakachu.png', 0, 280, canvasContext4 );


    var jumping = false;
    var counter = 0;
    setTimeout(function test(){
        if(counter == 5){
            canvasContext4.clearRect(0,0,600,400);
            kakachu.draw();
        }

        if(counter%30 == 0){
            canvasContext1.clearRect(0,0,600,400);
            canvasContext1.rect(0,0,600,400);
            canvasContext1.fillStyle="lightblue";
            canvasContext1.fill();
            clouds.x = clouds.x - 1;
            clouds.draw();
            counter = 0;
        }
        if(counter % 10 == 0){
            canvasContext2.clearRect(0,0,600,400);
            mountains.x = mountains.x - 1;
            mountains.draw();
        }
        if(counter % 2 == 0){
            canvasContext3.clearRect(0,0,600,400);
            ground.x = ground.x-.5;
            ground.draw();
        }
        if(jumping){
            canvasContext4.clearRect(0,0,600,400);
            kakachu.draw();
        }
        counter++;
        setTimeout(test,17);
    },17);


    canvas4.addEventListener('keydown', function (event) {
        if (event.keyCode === 32 && !jumping) {
            jumping = true;
            var posY = 280, x = 0, interval = (Math.PI / 100), counter = 0;
            var thisInterval = setInterval(function () {
                x = Math.PI + (interval * counter++);
                posY = 280 + 100 * Math.sin(x);
                kakachu.y = posY;
                if (x >= 2 * Math.PI){
                    clearInterval(thisInterval);
                    jumping = false;
                    canvasContext4.clearRect(0,0,600,400);
                    kakachu.draw();
                }
            }, 10)
        }
    })

});