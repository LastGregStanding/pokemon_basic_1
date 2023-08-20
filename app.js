"use strict";

//#region walk around map
const grid = document.querySelector(".grid");
const cells = [];
const width = 15;
let currentMap = 1;

//#region maps
const map1 = [
  0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
  0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2,
  2, 2, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 1, 2, 2,
  2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1,
  1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 1,
];
const map2 = [
  2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
  0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
//#endregion
function createGrid() {
  for (let i = 0; i < 225; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    if (currentMap === 1) {
      switch (map1[i]) {
        case 0:
          cell.classList.add("road");
          break;
        case 1:
          cell.classList.add("water");
          break;
        case 2:
          cell.classList.add("grass");
          break;
      }
    }
    if (currentMap === 2) {
      switch (map2[i]) {
        case 0:
          cell.classList.add("road");
          break;
        case 1:
          cell.classList.add("water");
          break;
        case 2:
          cell.classList.add("grass");
          break;
      }
    }
    grid.appendChild(cell);
    cells.push(cell);
  }
}
createGrid();

function deleteGrid() {
  for (let i = 0; i > cells.length; i++) {
    let cell = cells[i];
    grid.removeChild(cell);
    cells.shift(cell);
  }
  console.log(cells);
}
let playerIndex = 159;
function mapLocation() {
  if (playerIndex === 219) {
    deleteGrid();
    currentMap = 2;
    playerIndex -= 210;
    createGrid();
  }
}

//#region draw player
function drawPlayer() {
  cells[playerIndex].classList.add("player");
}
function erasePlayer() {
  cells[playerIndex].classList.remove("left");
  cells[playerIndex].classList.remove("right");
  cells[playerIndex].classList.remove("front");
  cells[playerIndex].classList.remove("back");
}
//#endregion

document.addEventListener("keydown", function (key) {
  erasePlayer();
  switch (key.keyCode) {
    // Move left: A key
    case 65:
      playerIndex--;
      cells[playerIndex].classList.add("left");
      break;

    // Move right: D key
    case 68:
      playerIndex++;
      cells[playerIndex].classList.add("right");
      break;

    // Move down: S key
    case 83:
      playerIndex += width;
      cells[playerIndex].classList.add("front");
      break;

    // Move up: W key
    case 87:
      playerIndex -= width;
      cells[playerIndex].classList.add("back");
      break;
  }
  mapLocation();
});
// #endregion

//#region Pokemon Index
class Pokemon {
  constructor(name, type, level, moves) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.moves = moves;
  }
}

const charmander = new Pokemon("Charmander", "Fire", 12, {
  moveone: "scratch",
  movetwo: "burn",
  movethree: "shield",
  movefour: "blast",
});

const arbok = new Pokemon("Arbok", "Snake", 8, {
  moveone: "bite",
  movetwo: "coil",
  movethree: "poison",
  movefour: "spit",
});

const ekans = new Pokemon("Ekans", "Poison", 5, {
  moveone: "bite",
  movetwo: "coil",
  movethree: "poison",
  movefour: "spit",
});
//#endregion

const pokemons = [charmander, arbok, ekans];

const move = document.querySelectorAll(".move");
const option = document.querySelectorAll(".option");

//#region UI hovering
move.forEach((move) => {
  move.addEventListener("mouseover", function () {
    move.classList.add("hover");
  });
  move.addEventListener("mouseout", function () {
    move.classList.remove("hover");
  });
});

option.forEach((option) => {
  option.addEventListener("mouseover", function () {
    option.classList.add("hover");
  });
  option.addEventListener("mouseout", function () {
    option.classList.remove("hover");
  });
});
//#endregion

let currentEnemy;
let enemyHealth = 100;
