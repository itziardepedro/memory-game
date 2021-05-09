const myAudio = Object.create(null);
const Audio = window.Audio;

//set variables and assigns them music and sounds from the assets folder
var backgroundSong = new Audio("assets/sounds/upbeat.mp3");
var cardflipSound = new Audio("assets/sounds/flip.mp3");
var matchedSound = new Audio("assets/sounds/matched.m4a");
var mismatchedSound = new Audio("assets/sounds/mismatched.m4a");
var victorySound = new Audio("assets/sounds/victory.m4a");
var gameOverSound = new Audio("assets/sounds/gameover.m4a");

backgroundSong.volume = 0.1;
backgroundSong.loop = true; //so that the music doesn't stop when song ends

myAudio.startBackgroundMusic = function () {
    backgroundSong.play(); //start music
};

myAudio.stopBackgroundMusic = function () {
    backgroundSong.pause(); //stop music
    backgroundSong.currentTime = 0;
};

myAudio.flip = function () {
    cardflipSound.play(); //sound whenever you flip a card
};

myAudio.match = function () {
    matchedSound.play(); //sound when two cards match
};

myAudio.mismatch = function () {
    mismatchedSound.play(); //sound when two cards are not the same
};

myAudio.victory = function () {
    victorySound.play(); //sound when the player wins the game
};

myAudio.gameOver = function () {
    gameOverSound.play(); //sound when the player losses the game
};

export default Object.freeze(myAudio);