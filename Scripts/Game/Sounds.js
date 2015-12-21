define(function(){
    var boing = new Audio();
    boing.src = "Sounds/boing.ogg";

    return {
        jumpSound : function(){boing.play();}
    }
});