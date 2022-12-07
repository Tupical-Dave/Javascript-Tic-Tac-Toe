const startButton = document.getElementById("start-button");
const player1Name = document.getElementById("player-1-name");
const player2Name = document.getElementById("player-2-name");
const submitButton = document.getElementById("submit-names");
let player1 = "player 1:";
let player2 = "player 2:";

if(startButton) {


startButton.addEventListener('click', function redirect() {
    window.location.href = "index.html";
});
}

if(submitButton) {


submitButton.addEventListener('click', function submitNames() {
    if(player1Name.value) {
        player1 = player1Name.value;
        localStorage.setItem("player1-name", player1)
    }

    if(player2Name.value) {
        player2 = player2Name.value;
        localStorage.setItem("player2-name", player2)
    }

    window.location.href = "board.html";
});
}
