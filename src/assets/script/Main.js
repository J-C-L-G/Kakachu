    var GameElement = require('./GameElement');
    var EnemyManager = require('./EnemyManager');
    var Sounds = require('./Sounds');
    var Util = require('./Util');

    var canvas4 = document.getElementById('gameCanvas_4'); //Enemies
    var canvas5 = document.getElementById('gameCanvas_5'); //Kakachu

    var score = document.getElementById('score');

    var enemyManager = new EnemyManager(canvas4);

    var kakachu = new GameElement({
        width: 75,
        height: 75,
        imageSource: 'assets/image/Kakachu.png',
        x: 0,
        y:280,
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
            counter = 0;
        }
        if (jumping) {
            kakachu.draw(true);
        }
        enemyManager.drawAll();

        var points = getVertices(kakachu);

        for (var i = 0; i < enemyManager.activeEnemies.length; i++) {
            if (enemyManager.activeEnemies[i].collidesWith(points)) {
                Util.gameOver();
                if(enemyManager.activeEnemies[i].onCollision() && !Util.gameState.changed){ //added the if to change the game art Super Kakachu
                    kakachu.image.src = 'assets/image/SuperKakachu.png';
                    kakachu.y = 260;
                    setTimeout(function(){
                        kakachu.image.src = 'assets/image/Kakachu.png';
                        kakachu.y = 280;
                        Util.gameState.changed = false;
                        },9000);

                    Util.gameState.changed = true;
                }

            }
        }

        counter++;

        Util.gameState.score++;
        score.innerText = Util.gameState.score;

        setTimeout(drawAll, DRAW_INTERVAL);
    }, DRAW_INTERVAL);

    /*** Handlers ***/
    canvas5.addEventListener('keydown', function (event) {
        if (event.keyCode === 32 && !jumping) {
            Sounds.jumpSound();
            jumping = true;

            /*Fix for super kakachu while jumping*/
            var posInY = (Util.gameState.invincible) ? 260 : 280;

            var posY = posInY, x = 0, interval = (Math.PI / 100), counter = 0;
            var thisInterval = setInterval(function () {
                x = Math.PI + (interval * counter++);
                posY = posInY + 100 * Math.sin(x);
                kakachu.y = posY;
                if (x >= 2 * Math.PI) {
                    clearInterval(thisInterval);
                    jumping = false;
                    kakachu.draw(true);
                }
            }, 10);
        }
    });

    function getVertices(hero) {

        return [
            {x: hero.x + 35, y: hero.y + 20},
            {x: hero.x + 15, y: hero.y + 65},
            {x: hero.x + 60, y: hero.y + 65}];

    }
