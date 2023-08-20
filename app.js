"use strict";

//#region walk around map
const grid = document.querySelector(".grid");
const cells = [];
const width = 15;

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

// player Index - 210;

let currentMap = 1;

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
  for (let i = 0; i < 225; i++) {
    cells[i].classList.remove("road");
    cells[i].classList.remove("water");
    cells[i].classList.remove("grass");
  }
}
let playerIndex = 159;

function mapLocation() {
  if (playerIndex === 219) {
    deleteGrid();
    currentMap = 2;
    createGrid();
    playerIndex -= 210;
  }
}

function drawPlayer() {
  cells[playerIndex].classList.add("player");
}
function erasePlayer() {
  cells[playerIndex].classList.remove("player");
}

drawPlayer();

document.addEventListener("keydown", function (key) {
  erasePlayer();
  switch (key.keyCode) {
    // Move left: A key
    case 65:
      playerIndex--;
      break;

    // Move right: D key
    case 68:
      playerIndex++;
      break;

    // Move down: S key
    case 83:
      playerIndex += width;
      break;

    // Move up: W key
    case 87:
      playerIndex -= width;
      break;
  }
  mapLocation();
  drawPlayer();
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
