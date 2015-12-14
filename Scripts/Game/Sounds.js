var boing = new Audio();

// Change
boing.src = "Sounds/boing.ogg";

window.onload = function(){
    document.body.addEventListener("keydown", function(){
        boing.play();
    })
}