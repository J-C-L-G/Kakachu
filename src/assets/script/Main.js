    var GameElement = require('./GameElement'),
        EnemyManager = require('./EnemyManager'),
        Sounds = require('./Sounds'),
        Util = require('./Util'),
        Assets = require('./Assets');


    /*Audio Hooks to update accordingly the image src*/
    Assets.sounds.powerUp.addEventListener('playing',function(){
        kakachu.image = Assets.images.SuperKakachu;
        kakachu.y = 260;

    });
    Assets.sounds.powerUp.addEventListener('ended',function(){
        kakachu.y = 280;
        kakachu.image = Assets.images.Kakachu;
        Util.gameState.invincible = false;
    });
    // Assets.sounds.gameOver.addEventListener('playing',function(){
    //     alert('\n\nGame Over! \n\nFinal Score: ' + Util.gameState.score);
    //     window.location.reload();
    // });


    var canvas4 = document.getElementById('gameCanvas_4'); //Enemies
    var canvas5 = document.getElementById('gameCanvas_5'); //Kakachu

    var score = document.getElementById('score');
    var hScore = document.getElementById('hScore').textContent = window.localStorage.getItem('hScore') || '0';

    var enemyManager = new EnemyManager(canvas4);

    var kakachu = new GameElement({
        width: 75,
        height: 75,
        imageSource: Assets.images.Kakachu,
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

        // if(Util.gameState.invincible) {
        //     kakachu.image = Assets.images.SuperKakachu;
        // } else {
        //     kakachu.image = Assets.images.Kakachu;
        // }

        if (jumping) {
            kakachu.draw(true);
        }
        enemyManager.drawAll();

        var points = getVertices(kakachu);

        for (var i = 0; i < enemyManager.activeEnemies.length; i++) {
            if (enemyManager.activeEnemies[i].collidesWith(points)) {
                if(enemyManager.activeEnemies[i].onCollision() /*&& !Util.gameState.changed*/){ //added the if to change the game art Super Kakachu
                //     window.requestAnimationFrame(function() {
                //         kakachu.y = 260;
                 //        Util.gameState.changed = true;
                //     });
                //
                //             setTimeout(function(){
                //                 window.requestAnimationFrame(function(){
                //                     kakachu.y = 280;
                //                     Util.gameState.changed = false;
                //                 });
                //             },8000);
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
        event.preventDefault(); //prevent window scrolling in non-full screen mode
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
