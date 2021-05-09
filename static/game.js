import myAudio from "./audio.js";
import list from "./list.js";

const MixOrMatch = Object.create(null);
const el = (id) => document.getElementById(id);

let cardsArray;

let maxTime = 40;
let timeRemaining = maxTime;
let timer = el("time-remaining");
let ticker = el("flips");
let stopCountDown = false;
let levelgame = 0;
let totalClicks = 0;
let matchedCards = [];
let cardToCheck = null;
let selectedCard = 0;

//importing the images to create the cards
const imagePathTest = [
    "img/pomegranate.JPG",
    "img/kiwi.JPG",
    "img/starfruit.JPG",
    "img/grapes.JPG",
    "img/watermelon.JPG",
    "img/dragonfruit.JPG",
    "img/lima.JPG",
    "img/apricot.JPG",
    "img/pineapple.JPG",
    "img/cucumber.JPG",
    "img/carrot.JPG",
    "img/chilly.JPG",
    "img/brocoli.JPG",
    "img/beet.JPG",
    "img/eggplant.JPG",
    "img/onion.JPG"
    ];

//mixes all the cards so that they are not in order
const shuffleArray = function(array) {
    console.log(array);
    array.forEach(function(val, i) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    });
};

//generated the card array from the images imported
MixOrMatch.generateCards = function(level) {

    const numCards = level == 1 ? 8 : (level == 2 ? 16 : 28);

    cardsArray = [];
    for(let i = 0; i < numCards; i++) {
        // Generate mock card
        let card = document.createElement("div");
        card.setAttribute("role", "button");
        card.classList.add("card");
        // Append card--back & card-face
        let cardBack = document.createElement("div");

        cardBack.classList.add("card-back", "card-face");

        let imageCvd = document.createElement("img");
        imageCvd.classList.add("covid");
        imageCvd.src ="./img/covid.JPG"
        imageCvd.setAttribute("role", "img");
        imageCvd.alt = "imageCvd_" + i;

        cardBack.appendChild(imageCvd)

        // Append child element with source img
        let cardFront = document.createElement("div");
        cardFront.classList.add("card-front", "card-face");

        let img = document.createElement("img");
        img.classList.add("card-value");
        img.src = imagePathTest[Math.floor(i/2)];
        img.setAttribute("role", "img");
        img.alt = "Img_" + i;

        cardFront.appendChild(img)

        card.appendChild(cardBack);
        card.appendChild(cardFront);

        card.title = "Card_" + i; //Labeling cards
        card.tabIndex = "0"; //element becomes focusable, reachable via keyboard

        cardsArray.push(card);
    };
    shuffleArray(cardsArray);
    addEvents(cardsArray);

    return cardsArray;
};

/**
 * Add events to all cards
 * @param {} cardsArray all cards to play
 */
const addEvents = (cardsArray) => {
    cardsArray.forEach((card, i) => {

        //Click event to flip the card with the mouse
        card.addEventListener("click", (e) => {
            console.log("[CLICK] Card selected: ", card);
            selectedCard = i;
            cardsArray[i].focus();
            MixOrMatch.flipCard(card);
        });

        //Keydown event to flip the card just using the keyboard
        //Cards are selected with the keyboard arrows and flipped with enter
        card.onkeydown = function (){
            switch (event.key){
                case  "Enter":
                MixOrMatch.flipCard(card);
                break;
                    case "ArrowLeft":
                        if (selectedCard>0){
                            selectedCard--;
                            //red border appears to highlight the selected card
                            cardsArray[selectedCard].focus();
                        }
                        break;
                    case "ArrowRight":
                        if (selectedCard<(cardsArray.length-1)){
                            selectedCard++;
                            cardsArray[selectedCard].focus();
                        }
                        break;
                    case "ArrowUp":
                        if (selectedCard>3){
                            selectedCard = selectedCard - 4;
                            cardsArray[selectedCard].focus();
                        }
                        break;
                    case "ArrowDown":
                        if (selectedCard<(cardsArray.length-4)){
                            selectedCard = selectedCard + 4;
                            cardsArray[selectedCard].focus();
                        }
                        break;
            }
        };
    });
};

//Start and run game
MixOrMatch.startGame = function (level) {
    cardsArray[0].focus();

    myAudio.startBackgroundMusic ();
    matchedCards = []; //no matched cards at the start
    cardToCheck = null;
    totalClicks = 0; //set the flip counter to 0

    levelgame = level; //player decides the difficulty level
    myAudio.startBackgroundMusic ();
    stopCountDown = false;
    timeRemaining = maxTime;
    MixOrMatch.startCountDown(); //start the timer when strating new game
    MixOrMatch.hideCards(); //hide all the cards to start
    timer.innerText = timeRemaining;
    ticker.innerText = totalClicks;
};

//empty the matched cards array ready to start new game
MixOrMatch.cleanMyArray = function () {
    matchedCards = [];
};

//the card flips and shows its front faced when clicked
MixOrMatch.flipCard = function (card) {
    myAudio.flip();
    totalClicks++; //updating flip count every time a card is clicked
    ticker.innerText = totalClicks;

    if(!card.classList.contains("visible")){
        card.classList.add("visible");

        if(cardToCheck != null) {
            MixOrMatch.checkForCardMatch(card);
        }
        else {
            cardToCheck = card;
        }
    }
    else{
    }
};

//when game finishes, hide all  cards and remove them from the matched array
MixOrMatch.hideCards = function () {
    cardsArray.forEach((card) => { //loop through cards array
        card.classList.remove("visible");
        card.classList.remove("matched");
    });
};

//compare the 2 flipped cards and check if they match
MixOrMatch.checkForCardMatch = function (card) {
    if(MixOrMatch.getCardType(card) === MixOrMatch.getCardType(cardToCheck)){
        MixOrMatch.cardMatch(card, cardToCheck);
    }
    else {
        MixOrMatch.cardMisMatch(card, cardToCheck);
    }
    cardToCheck = null; //get ready for the next pair of cards to check
};

//created an array with all the matched cards
MixOrMatch.cardMatch = function (card1, card2) {
    myAudio.match();
    matchedCards.push(card1);
    matchedCards.push(card2);
    card1.classList.add("matched");
    card2.classList.add("matched");

    switch (MixOrMatch.EndGame(timeRemaining,matchedCards.length,levelgame)) {
        case 0: {//user loses the game
            MixOrMatch.gameOver();
        break;
        }
        case 1: {//user wins the game
            MixOrMatch.victory();
        break;
        }
        case 2: {//continue playing
        break;
        }
    }
};

//when the 2 flipped cards are not the same
MixOrMatch.cardMisMatch = function (card1, card2) {
    myAudio.mismatch();
    //flip the cards back again to keep playing
    setTimeout(() => {
        card1.classList.remove("visible");
        card2.classList.remove("visible");
    }, 600); //wait 600ms for player to memorize
};

//return a string with the type of card (src for the front of card)
MixOrMatch.getCardType = function (card) {
    //[0] because there's only 1
    return card.getElementsByClassName("card-value")[0].src;
};

//to restart timer
MixOrMatch.startCountDown = function () {
    if (stopCountDown == false){
        if(timeRemaining == 0) {
            MixOrMatch.gameOver(); //when player runs out of time and looses
        }
        else{ //still time remaining
            timeRemaining--; //reduce the time
            timer.innerText = timeRemaining;
            setTimeout(MixOrMatch.startCountDown,1000);
        }
    }
};

//to show the victory screen when a player wins
MixOrMatch.EndGame = function (time, numCards, difficulty) {
    let victory = 2; //keep playing

    if ((numCards == 8) && (difficulty == 1)){
        victory = 1;
        return victory;
    }
    if ((numCards == 16) && (difficulty == 2)){
        victory = 1;
        return victory;
    }if ((numCards == 28) && (difficulty == 3)){
        victory = 1;
        return victory;
    }
    if (time == 0 ){
        victory = 0; //game over
    }
    return victory;
};

//when a player runs out of time
MixOrMatch.gameOver = function () {
    el("game-over-text").classList.add("visible"); //show gameover screen
    myAudio.stopBackgroundMusic(); //stop background song
    MixOrMatch.cleanMyArray();
    myAudio.gameOver (); //activate gameover sound
};

//when a player matches all cards before the timer ends
MixOrMatch.victory = function () {
    el("time-remaining-victory").innerText = timeRemaining;
    el("user_time").value = timeRemaining;
    el("victory-text").classList.add("visible"); //show victory screen
    MixOrMatch.cleanMyArray();
    stopCountDown = true; //stop the timer
    myAudio.stopBackgroundMusic();
    myAudio.victory();
};

//to shuffle the cards
MixOrMatch.shuffleArray = function () {
    for(let i = cardsArray.length - 1; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (i+1));
        //we shuffle the order of the cards in the CSS grid
        cardsArray[randIndex].style.order = i;
        cardsArray[i].style.order = randIndex;
    }
};

export default Object.freeze(MixOrMatch);