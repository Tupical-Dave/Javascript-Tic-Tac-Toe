let playerTurn = true;
let player1ScoreValue = 0;
let player2ScoreValue = 0;
let turnCount = 0;
const CIRCLE_CLASS = "circle";
const CROSS_CLASS = "cross";
const WINING_COMBINATIONS = [
  [0, 4, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [2, 4, 6],
  [1, 4, 7],
  [0, 3, 6],
  [2, 5, 8],
];

const boardCells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const endScreen = document.getElementById("end-screen");
const endText = document.getElementById("end-text");
const restartbutton = document.getElementById("restart-button");
const player1Score = document.getElementById("player-1");
const player2Score = document.getElementById("player-2");
const backToMenuButton = document.getElementById("back-to-menu");
const playerTurnName = document.getElementById("player-turn-name");

playerTurnName.innerHTML = `${localStorage.getItem(
  "player1-name")}'s Turn!`

backToMenuButton.addEventListener("click", function () {
  window.location.href = "index.html";
  console.log("I work");
  player1ScoreValue = 0;
  player2ScoreValue = 0;
  localStorage.setItem("player1-name", "player 1");
  localStorage.setItem("player2-name", "player 2");
});
restartbutton.addEventListener("click", start);
start();

function start() {
  if(turnCount %2===0) {
    playerTurnName.innerHTML = `${localStorage.getItem(
      "player1-name")}'s Turn!`
  }else {
    playerTurnName.innerHTML = `${localStorage.getItem(
      "player2-name")}'s Turn!`
  }
  player1Score.innerHTML = `${localStorage.getItem(
    "player1-name")}:
    ${player1ScoreValue}`;
  player2Score.innerHTML = `${localStorage.getItem(
    "player2-name"
  )}:
  ${player2ScoreValue}`;
  boardCells.forEach((element) => {
    element.classList.remove("cross");
    element.classList.remove("circle");
  });

  endScreen.classList.remove("show");

  if (board.classList.contains("circle")) {
    board.classList.replace("circle", "cross");
  }

  boardCells.forEach((element) => {
    element.addEventListener("click", clickHandling, { once: true });
  });

  playerTurn = true;

  endText.innerHTML = "";
}

function clickHandling(event) {
  // putting the symbol
  let currentClass = playerTurn ? "cross" : "circle";
  putTheSymbol(event.target, currentClass);

  // check winner

  if (checkDraw()) {
    endText.innerHTML = `It is a Draw!`;
    endScreen.classList.add("show");
  }

  if (checkWinner(currentClass)) {
    
    endScreen.classList.add("show");
    if (playerTurn) {
      endText.innerHTML = `The Winner is X player!`;
      if (turnCount % 2 === 0) {
        player1ScoreValue += 1;
      } else {
        player2ScoreValue += 1;
      }
    } else {
      endText.innerHTML = `The Winner is O player!`;
      if (turnCount % 2 !== 0) {
        player2ScoreValue += 1;
      } else {
        player1ScoreValue += 1;
      }
    }
    turnCount += 1;
  }

  // check for the draw

  // changing turn
  nextTurn();

  // seting the hover class for the whole board
  setBoardHoverClass();
}

function putTheSymbol(target, symbol) {
  target.classList.add(symbol);
}

function nextTurn() {
  playerTurn = !playerTurn;
}

function setBoardHoverClass() {
  if (board.classList.contains("cross")) {
    playerTurnName.innerHTML = `${localStorage.getItem(
      "player2-name")}'s Turn!`
    board.classList.replace("cross", "circle");
  } else if (board.classList.contains("circle")) {
    playerTurnName.innerHTML = `${localStorage.getItem(
      "player1-name")}'s Turn!`
    board.classList.replace("circle", "cross");
  }
}

function checkWinner(currentClass) {
  return WINING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return boardCells[index].classList.contains(currentClass);
    });
  });
}

function checkDraw() {
  return [...boardCells].every((element) => {
    return (
      element.classList.contains("cross") ||
      element.classList.contains("circle")
    );
  });
}