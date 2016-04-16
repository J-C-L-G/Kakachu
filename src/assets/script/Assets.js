/**
 * Created by JCLG on 4/16/2016.
 */

var image = 'assets/image/',
    sounds = 'assets/sound/';

function imageCreator(imageSource){
    var img = new Image();
    img.src = imageSource;
    return img;
}

function soundCreator(soundSource){
    var audio = new Audio();
    audio.src = soundSource;
    return audio;

}

module.exports = {
    images : {
        Kakachu : imageCreator(image + 'Kakachu.png'),
        SuperKakachu : imageCreator(image + 'SuperKakachu.png'),
        Chili : imageCreator(image + 'ChiliMx.png'),
        Paper : imageCreator(image + 'Paper.png'),
        Plunger : imageCreator(image + 'Plunger.png')
    },
    sounds : {
        gameOver : soundCreator(sounds + 'gameOver.ogg'),
        jump : soundCreator(sounds + 'jump.ogg'),
        powerUp : soundCreator(sounds + 'powerUp.ogg')
    }
};