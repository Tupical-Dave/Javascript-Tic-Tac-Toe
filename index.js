let playerTurn = true;
const CIRCLE_CLASS = "circle";
const CROSS_CLASS = "cross";
const WINING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
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
restartbutton.addEventListener("click", start);
start();

function start() {
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
}

function clickHandling(event) {
  // putting the symbol
  const target = event.target;
  let currentClass = playerTurn ? "cross" : "circle";
  putTheSymbol(target, currentClass);

  // check winner

  if (checkWinner(currentClass)) {
    endScreen.classList.add("show");
    if (playerTurn) {
      endText.innerHTML = `The Winner is X player!`;
    } else {
      endText.innerHTML = `The Winner is O player!`;
    }
  }

  // check for the draw

  if (checkDraw()) {
    endText.innerHTML = `It is a Draw!`;
    endScreen.classList.add("show");
  }

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
    board.classList.replace("cross", "circle");
  } else if (board.classList.contains("circle")) {
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
