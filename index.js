let player = "circle";

function putTheSymbol(event) {
  if (player == "cross") {
    player = "circle";
  } else {
    player = "cross";
  }
  const element = event.target;
  const symbol = document.createElement("div");
  symbol.classList.add(player);
  element.appendChild(symbol);
  console.log(player);
}
