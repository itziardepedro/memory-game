import MixOrMatch from "./game.js";
import myAudio from "./audio.js";

const UI = Object.create(null);

const el = (id) => document.getElementById(id);

//inserting cards into the html
const insertCardsIntoHTML = function (cards) {
    const board = el("board");
    cards.forEach( function (card) {
        board.insertAdjacentElement("beforeend", card);
    });
};

//create a highscore with the values from the sql databse
//Get score list
const getScoreList = function () {
    fetch("http://localhost:8080/listall")
    .then(function(response) {
        return response.json();
    })
    .then(function(score) {
        console.log(score);
        score.sort(function (a, b ) {
            return a.time < b.time;
        });
        if(score.length > 0) {
            //to show the databse information on the main menu
            const scoreContainer = el("score-list");
            let table = "<table class='score-table' border>";
            table += "<tr><th colspan=3 style = 'height: 40px;'>"+
                "PAST SCORES" +"</th></tr>";
            table += "<tr><td style = 'height: 30px; 'width: 100px;'>" +
                "RANKING" +"</td><td>" +
                "PLAYER" + "</td><td style = 'height: 30px;'width: 100px;'>" +
                 "TIME LEFT" + "</td>"; "</tr>";
            for (var i=0; i<score.length; i++) {
                table += "<tr><td style = 'width: 100px;'>" +
                    (i+1) + "</td><td style = 'width: 150px;'>" +
                    score[i].name + "</td><td style = 'width: 100px;'>" +
                    score[i].time + "</td>"; "</tr>";
            }
            table += "</table>";
            console.log(scoreContainer);
            scoreContainer.innerHTML = table;
        }
    });
}

//function that initialises everything
UI.init = function() {

    getScoreList();
    const boards = el("container");
    const menu = el("mainmenu");
    let cardsArray = [];

    //whenever a new game is started
    let tecla = document.onkeydown = function (){
        //to make it accessible, buttons are also triggered with keyboard keys
        switch(event.key){

            //to select the easy boardgame and start the game
            case "1":
                boards.style.display = "block";
                menu.style.display = "none";
                cardsArray = MixOrMatch.generateCards(1);
                insertCardsIntoHTML(cardsArray);
                MixOrMatch.startGame(1);
                break;

            //to select the hard boardgame and start the game
            case "2":
                boards.style.display = "block";
                menu.style.display = "none";
                cardsArray = MixOrMatch.generateCards(2);
                insertCardsIntoHTML(cardsArray);
                MixOrMatch.startGame(2);
                break;

            //to select the expert boardgame and start the game
            case "3":
                boards.style.display = "block";
                menu.style.display = "none";
                cardsArray = MixOrMatch.generateCards(3);
                insertCardsIntoHTML(cardsArray);
                MixOrMatch.startGame(3);
                break;
        }
    };

    //to show an easy board and start the game by clicking on the button
    el("easybutton").onclick = function () {
        boards.style.display = "block";
        menu.style.display = "none";
        cardsArray = MixOrMatch.generateCards(1);
        insertCardsIntoHTML(cardsArray);
        MixOrMatch.startGame(1);
    };

    //to show a hard board and start the  game by clicking on the button
    el("hardbutton").onclick = function () {
        boards.style.display = "block";
        menu.style.display = "none";
        cardsArray = MixOrMatch.generateCards(2);
        insertCardsIntoHTML(cardsArray);
        MixOrMatch.startGame(2);
    };

    //to show an expert board and start the  game by clicking on the button
    el("expertbutton").onclick = function () {
        boards.style.display = "block";
        menu.style.display = "none";
        cardsArray = MixOrMatch.generateCards(3);
        insertCardsIntoHTML(cardsArray);
        MixOrMatch.startGame(3);
    };

    const gameOverOverlay = el("game-over-text");
    //click to remove the overlay
    gameOverOverlay.addEventListener("click", () => {
        const board = el("board");
        board.innerHTML = "";

        myAudio.stopBackgroundMusic ();
        MixOrMatch.cleanMyArray();
        gameOverOverlay.classList.remove("visible");
        boards.style.display = "none";
        menu.style.display = "block";
    });
};

export default Object.freeze(UI);