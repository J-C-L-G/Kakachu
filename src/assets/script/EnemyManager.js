        var GameElement = require('./GameElement'),
            Util = require('./Util'),
            Assets = require('./Assets');
        var tempForEnemy = 0;

        function EnemyManager(canvas) {
            this.canvasContext = canvas.getContext('2d');
            this.activeEnemies = [];

            this.addEnemy = function () {
                /*This is only for test random to be implemented >__> */
                if(tempForEnemy % 2 == 0){

                    var r = Math.random();

                    this.activeEnemies.push(new GameElement({
                        width: 53,
                        height: 100,
                        imageSource: Assets.images.Plunger,
                        x:600,
                        y: 255,
                        canvas: canvas,
                        updateFn: Util.jumpAttack((r > 0.5),3),
                        collidesWith: Util.unclogger,
                        onCollision:Util.gameOver
                    }));

                    //Test for the chili
                    if(r < 0.4){
                        this.activeEnemies.push(new GameElement({
                            width: 75,
                            height: 55,
                            imageSource: Assets.images.Chili,
                            x: 600,
                            y: 285,
                            canvas: canvas,
                            updateFn: Util.slideAttack(3),
                            collidesWith: Util.rectangle,
                            onCollision:Util.powerUp
                        }));
                    }
                }else{
                    this.activeEnemies.push(new GameElement({
                        width: 75,
                        height: 42,
                        imageSource: Assets.images.Paper,
                        x: 600,
                        y: 312,
                        canvas: canvas,
                        updateFn: Util.slideAttack(3),
                        collidesWith: Util.rectangle,
                        onCollision:Util.gameOver
                    }));
                }
                tempForEnemy++;
            };

            this.drawAll = function (){
                this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.clientWidth, this.canvasContext.canvas.clientHeight);
                for (var i = 0; i < this.activeEnemies.length; i++) {
                    this.activeEnemies[i].draw(false);
                }
            };
        }

        module.exports =  EnemyManager;
