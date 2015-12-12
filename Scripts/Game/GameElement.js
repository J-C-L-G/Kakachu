define(function () {
    function GameElement(options) {

        var canvas = options.canvas;

        if (!canvas) throw Error("Canvas was not defined for GameElement");

        this.width = options.width;
        this.height = options.height;
        this.image = new Image();
        this.image.src = options.imageSource;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.context = options.canvas.getContext('2d');

        this.draw = function () {

            if (options.updateFn && (typeof options.updateFn == "function")) {
                options.updateFn.call(this);
            }

            this.context.clearRect(0, 0, canvas.width, canvas.height);

            /*if(-this.width + options.canvas.clientWidth >= this.x ){
             this.x = 0;
             }*/
            this.context.drawImage(this.image, this.x, this.y);
        }
    }

    return GameElement;
});