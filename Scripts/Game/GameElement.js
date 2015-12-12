define(function(){
    function GameElement(width, height, src, x,y,ctx){
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = src;
        this.x = x || 0;
        this.y = y || 0;
        this.draw = function(){
            if(-this.width + ctx.canvas.clientWidth >= this.x ){
                this.x = 0;
            }
            ctx.drawImage(this.image, this.x, this.y);
        }
    }

    return GameElement;
});