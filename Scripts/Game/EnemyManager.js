define(function (require) {
        var GameElement = require('./GameElement');

        var util = require('./Util');
        var tempForEnemy = 0;

        /*function Enemy(options) {
         var type = options.type;
         this.x = options.x;
         this.y = options.y;
         this.imageSource = options.imageSource;
         this.updateFn = options.updateFn;

         switch (type) {
         case "tp":
         this.updateFn = tpMovement;
         break;
         default:
         this.updateFn = tpMovement;
         break;
         }

         }*/

        function tpMovement() {
            this.y = 90 + Math.abs(225 * Math.sin((Math.PI - this.x--) / 30));
        }

        function EnemyManager(canvas) {
            this.context = canvas.getContext('2d');

            this.collection = [];

            this.addEnemy = function () {

                /*This is only for test random to be implemented >__> */
                if(tempForEnemy % 2 == 0){
                    this.collection.push(new GameElement({
                        width: 53,
                        height: 100,
                        imageSource: 'Images/Plunger.png',
                        x: 600,
                        y: 255,
                        canvas: canvas,
                        updateFn: util.jumpAttack
                    }));
                }else{
                    this.collection.push(new GameElement({
                        width: 75,
                        height: 42,
                        imageSource: 'Images/Paper.png',
                        x: 600,
                        y: 312,
                        canvas: canvas,
                        updateFn: util.slideAttack
                    }));
                }
                tempForEnemy++;

                /********************************************************/

                this.collection[this.collection.length - 1].draw = function(){
                    //tpMovement.call(this);
                    this.updateFn();
                    this.context.drawImage(this.image, this.x, this.y);
                };

                if(this.collection.length > 10)
                this.collection = [];

            };

            this.drawAll = function () {
                this.context.clearRect(0,0,canvas.width, canvas.height);
                for (var i = 0; i < this.collection.length; i++) {
                    this.collection[i].draw();
                }
            };

        }

        return EnemyManager;

    }
);