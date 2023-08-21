"use strict";

const grid = document.querySelector(".grid");
const cells = [];
const width = 15;
let currentMap = 2;
let wildEnemy = 5;

//#region music
const themeMusic = document.querySelector("#theme_music");
const battleMusic = document.querySelector("#battle_music");
let mute = true;

// trigger music
document.addEventListener("keydown", function (key) {
  switch (key.keyCode) {
    // key 'm' to unmute
    case 77:
      mute = mute === true ? false : true;
      themeMusic.play();
      break;
    // key 'q' to mute
    case 81:
      themeMusic.pause();
      break;
  }
});
//#endregion

//#region map layouts

const map1 = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1,
  1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2,
];

const map2 = [
  2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1,
  1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1,
];

const map3 = [
  2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
  0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2,
  0, 0, 0, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

const map4 = [
  2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1,
  1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

const map5 = [
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
];
//#endregion

//#region draw maps and game

// draw the first map in the game
function createGrid() {
  for (let i = 0; i < 225; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
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

// function to draw a new map
function drawNextMap() {
  if (currentMap === 1) {
    for (let i = 0; i < 225; i++) {
      cells[i].classList.remove("water");
      cells[i].classList.remove("grass");
      cells[i].classList.remove("road");
      cells[i].classList.remove("cell");
      grid.removeChild(cells[i]);
      switch (map1[i]) {
        case 0:
          cells[i].classList.add("cell");
          cells[i].classList.add("road");
          break;
        case 1:
          cells[i].classList.add("cell");
          cells[i].classList.add("water");
          break;
        case 2:
          cells[i].classList.add("cell");
          cells[i].classList.add("grass");
          break;
      }
      grid.appendChild(cells[i]);
    }
  }
  if (currentMap === 2) {
    for (let i = 0; i < 225; i++) {
      cells[i].classList.remove("water");
      cells[i].classList.remove("grass");
      cells[i].classList.remove("road");
      cells[i].classList.remove("cell");
      grid.removeChild(cells[i]);
      switch (map2[i]) {
        case 0:
          cells[i].classList.add("cell");
          cells[i].classList.add("road");
          break;
        case 1:
          cells[i].classList.add("cell");
          cells[i].classList.add("water");
          break;
        case 2:
          cells[i].classList.add("cell");
          cells[i].classList.add("grass");
          break;
      }
      grid.appendChild(cells[i]);
    }
  }
  if (currentMap === 3) {
    for (let i = 0; i < 225; i++) {
      cells[i].classList.remove("water");
      cells[i].classList.remove("grass");
      cells[i].classList.remove("road");
      cells[i].classList.remove("cell");
      grid.removeChild(cells[i]);
      switch (map3[i]) {
        case 0:
          cells[i].classList.add("cell");
          cells[i].classList.add("road");
          break;
        case 1:
          cells[i].classList.add("cell");
          cells[i].classList.add("water");
          break;
        case 2:
          cells[i].classList.add("cell");
          cells[i].classList.add("grass");
          break;
      }
      grid.appendChild(cells[i]);
    }
  }
  if (currentMap === 4) {
    for (let i = 0; i < 225; i++) {
      cells[i].classList.remove("water");
      cells[i].classList.remove("grass");
      cells[i].classList.remove("road");
      cells[i].classList.remove("cell");
      grid.removeChild(cells[i]);
      switch (map4[i]) {
        case 0:
          cells[i].classList.add("cell");
          cells[i].classList.add("road");
          break;
        case 1:
          cells[i].classList.add("cell");
          cells[i].classList.add("water");
          break;
        case 2:
          cells[i].classList.add("cell");
          cells[i].classList.add("grass");
          break;
      }
      grid.appendChild(cells[i]);
    }
  }
  if (currentMap === 5) {
    for (let i = 0; i < 225; i++) {
      cells[i].classList.remove("water");
      cells[i].classList.remove("grass");
      cells[i].classList.remove("road");
      cells[i].classList.remove("cell");
      grid.removeChild(cells[i]);
      switch (map5[i]) {
        case 0:
          cells[i].classList.add("cell");
          cells[i].classList.add("road");
          break;
        case 1:
          cells[i].classList.add("cell");
          cells[i].classList.add("water");
          break;
        case 2:
          cells[i].classList.add("cell");
          cells[i].classList.add("grass");
          break;
      }
      grid.appendChild(cells[i]);
    }
  }
}
//#endregion

//#region draw player
let playerIndex = 160;
function drawPlayer() {
  cells[playerIndex].classList.add("player");
}
function erasePlayer() {
  cells[playerIndex].classList.remove("left");
  cells[playerIndex].classList.remove("right");
  cells[playerIndex].classList.remove("front");
  cells[playerIndex].classList.remove("back");
}
cells[playerIndex].classList.add("front");
//#endregion

//#region Main Gameplay
document.addEventListener("keydown", function (key) {
  // Move player around map with keys (and switch maps)
  switch (key.keyCode) {
    // Move left: A key
    case 65:
      if (!battle.classList.contains("in_battle")) {
        // Map 2 > 5
        if (playerIndex % width === 0 && currentMap === 2) {
          currentMap = 5;
          drawNextMap();
          erasePlayer();
          playerIndex += width;
        }
        // Map 4 > 2
        if (playerIndex % width === 0 && currentMap === 4) {
          currentMap = 2;
          drawNextMap();
          erasePlayer();
          playerIndex += width;
        }
        erasePlayer();
        playerIndex--;
        cells[playerIndex].classList.add("left");
      }
      break;

    // Move right: D key
    case 68:
      if (!battle.classList.contains("in_battle")) {
        // Map 2 > 4, middle to right map
        if ((playerIndex + 1) % width === 0 && currentMap === 2) {
          currentMap = 4;
          drawNextMap();
          erasePlayer();
          playerIndex -= width;
        }
        // Map 5 > 2
        if ((playerIndex + 1) % width === 0 && currentMap === 5) {
          currentMap = 2;
          drawNextMap();
          erasePlayer();
          playerIndex -= width;
        }
        erasePlayer();
        playerIndex++;
        cells[playerIndex].classList.add("right");
      }
      break;

    // Move down: S key
    case 83:
      if (!battle.classList.contains("in_battle")) {
        erasePlayer();
        playerIndex += width;

        // Map 2 > 3
        if (playerIndex >= 225 && currentMap === 2) {
          currentMap = 3;
          drawNextMap();
          playerIndex -= 225;

          // Map 1 > 2
        } else if (playerIndex >= 225 && currentMap === 1) {
          currentMap = 2;
          drawNextMap();
          playerIndex -= 225;
        }
        cells[playerIndex].classList.add("front");
      }
      break;

    // Move up: W key
    case 87:
      if (!battle.classList.contains("in_battle")) {
        erasePlayer();
        playerIndex -= width;

        // Map 2 > 1
        if (playerIndex < 0 && currentMap === 2) {
          currentMap = 1;
          drawNextMap();
          playerIndex += 225;

          // Map 3 > 2
        } else if (playerIndex <= 0 && currentMap === 3) {
          currentMap = 2;
          drawNextMap();
          playerIndex += 225;
        }
        cells[playerIndex].classList.add("back");
      }
      break;
  }
  // Roll dice for wild enemy after every step in the grass
  diceRoll = rollDice();
  checkForPlayer();
});

//#region run from enemy
const run = document.querySelector("#run");
run.addEventListener("click", function () {
  battleMusic.currentTime = 0;
  themeMusic.currentTime = 0;
  battle.classList.remove("in_battle");
  battle.close();
  if (mute === false) {
    battleMusic.pause();
    themeMusic.play();
  }
});
//#endregion
// #endregion

//#region Random chance to encounter enemy
// roll dice to see random enemy
let diceRoll;
let rollDice = () => Math.floor(Math.random() * 10);

// check for enemy in grass
function checkForPlayer() {
  if (
    diceRoll === 5 &&
    wildEnemy === 5 &&
    cells[playerIndex].classList.contains("grass")
  ) {
    if (mute === false) {
      themeMusic.pause();
      battleMusic.play();
    }
    battle.showModal();
    battle.classList.add("in_battle");
  }
}
//#endregion

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
const battle = document.querySelector(".battle_container");

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
