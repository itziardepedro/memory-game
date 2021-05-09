import MixOrMatch from "./game.js";

const describe = window.describe;
const it = window.it;
const fc = window.fastcheck;
const chai = window.chai;

describe("Testing the function that generates the cards array", function () {
    it(
        "This is a test that checks " +
        "that depending on the level chosen by the player " +
        "the game generated a certain number of cards.",
        function () {
            fc.assert(fc.property(
                fc.integer(1,3),
                function (level) {
                    const totalCards = MixOrMatch.generateCards(level);
                    const numCards = (level === 1 ? 8 : (level === 2 ? 16 :28));
                    return totalCards.length === numCards;
                }
            ));
        }
    );
});

let mockTime = fc.nat(100);
let match = fc.nat(8);
let level = fc.nat(3);

describe("Testing that the timeout works", function () {
    it(
        "This is a test checks that when the timer reaches 0 " +
        "regardless of the level and matched cards, " +
        "the player looses the game.",
        function () {
            //alert("TEST TIMEOUT");
            //alert(MixOrMatch.EndGame(0, emparejadas_prueba, nivel_prueba));
            fc.assert(fc.property(
                match,
                level,
                function () {
                    // tiene que devolver cero al haber terminado el tiempo
                    return (MixOrMatch.EndGame(0, match, level)) === 0;
                }
            ));
        }
    );
});

describe("Keep playing", function () {
    it(
        "This is a test that checks that if the " +
        "time has not finished and the timer keeps running, " +
        "the player can still play, regarless of level and matched cards.",
        function () {
            //alert("TEST WINNING A GAME");
            fc.assert(fc.property(
                mockTime,
                match,
                level,
                function () {
                    // tiene que devolver dos al tener tiempo
                    return (MixOrMatch.EndGame(mockTime, match, level)) === 2;
                }
            ));
        }
    );
});

describe("Winning the easy game", function () {
    it(
        "This is a test that checks that if the " +
        "number of matched cards is 8 and the user is " +
        "playing the easy game (which has a total number of 8 cards), " +
        "he/she wins the game.",
        function () {
            fc.assert(fc.property(
                mockTime,
                function () {
                    //devolver 1 al tener tiempo y en  nivel 1 tener 8 matched
                    return (MixOrMatch.EndGame(mockTime, 8, 1)) === 1;
                }
            ));
        }
    );
});

describe("Winning the hard game", function () {
    it(
        "This is a test that checks that if the " +
        "number of matched cards is 16 and the user is " +
        "playing the hard game (which has a total number of 16 cards), " +
        "he/she wins the game.",
        function () {
            fc.assert(fc.property(
                mockTime,
                function () {
                    //devolver 1 al tener tiempo y nivel 2 tener 16 emparejadas
                    return (MixOrMatch.EndGame(mockTime, 16, 2)) === 1;
                }
            ));
        }
    );
});

describe("Winning the expert game", function () {
    it(
        "This is a test that checks that if the " +
        "number of matched cards is 20 and the user is " +
        "playing the expert game (which has a total number of 30 cards) " +
        "he/she wins the game.",
        function () {
            //alert("TEST WINNING A GAME");
            fc.assert(fc.property(
                mockTime,
                function () {
                    //devolver 1 al tener tiempo y nivel 3 tener 30 emparejadas
                    return (MixOrMatch.EndGame(mockTime, 28, 3)) === 1;
                }
            ));
        }
    );
});