let player = "cross";

function putTheSymbol(event) {
  const element = event.target;
  if (
    element.classList.contains("cross") ||
    element.classList.contains("circle")
  ) {
  } else {
    const symbol = document.createElement("div");
    symbol.classList.add(player);
    element.appendChild(symbol);
    if (player == "cross") {
      player = "circle";
    } else {
      player = "cross";
    }
  }
}
