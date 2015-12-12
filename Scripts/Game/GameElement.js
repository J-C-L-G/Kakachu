define(function () {
    function GameElement(options) {
        this.width = options.width;
        this.height = options.height;
        this.image = new Image();
        this.image.src = options.imageSource;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.canvasContext = options.canvas.getContext('2d');
        this.updateFn = options.updateFn;

        this.draw = function (erase) {
            if(erase){
                this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.clientWidth, this.canvasContext.canvas.clientHeight);
            }
            this.updateFn();
            this.canvasContext.drawImage(this.image, this.x, this.y);
        };

    }

    return GameElement;
});