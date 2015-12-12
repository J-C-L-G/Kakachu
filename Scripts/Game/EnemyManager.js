define(function (require) {
        var GameElement = require('./GameElement');
        var Util = require('./Util');
        var tempForEnemy = 0;

        function EnemyManager(canvas) {
            this.canvasContext = canvas.getContext('2d');
            this.activeEnemies = [];

            this.addEnemy = function () {
                /*This is only for test random to be implemented >__> */
                if(tempForEnemy % 2 == 0){
                    this.activeEnemies.push(new GameElement({
                        width: 53,
                        height: 100,
                        imageSource: 'Images/Plunger.png',
                        //x: (tempForEnemy % 4 == 0) ? 500 : 700,
                        x:375,
                        y: 255,
                        canvas: canvas,
                        updateFn: Util.jumpAttack
                    }));
                }else{
                    this.activeEnemies.push(new GameElement({
                        width: 75,
                        height: 42,
                        imageSource: 'Images/Paper.png',
                        x: 600,
                        y: 312,
                        canvas: canvas,
                        updateFn: Util.slideAttack(3)
                    }));
                }
                tempForEnemy++;
            };

            this.drawAll = function (){
                this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.clientWidth, this.canvasContext.canvas.clientHeight);
                for (var i = 0; i < this.activeEnemies.length; i++) {
                    this.activeEnemies[i].draw(false); //true = draw without erase
                }
            };
        }

        return EnemyManager;
});