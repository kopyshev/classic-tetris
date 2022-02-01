"use strict";

class Game {
  constructor() {
    this.game = document.createElement("div");
    this.game.setAttribute("id", "game");
    this.continue = true;
    this.init();
    this.score = 0;
    this.setScore();
    this.speed = 500;
  }
  init() {
    let y = 25;
    let x = 0;
    for (let i = 0; i < 240; i++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");

      cell.setAttribute("x", x < 10 ? ++x : (x = 1));
      cell.setAttribute("y", x == 1 ? --y : y);

      this.game.append(cell);
    }
    let app = document.querySelector("#tetris");
    app.append(this.game);
  }
  start() {
    if (this.continue) {
      let currentFigure = new Figure();
      currentFigure.draw();
      let interval = setInterval(() => {
        if (!currentFigure.pause){
        currentFigure.falldown();
        
        if (!currentFigure.canmove) {
          clearInterval(interval);
          this.stop(currentFigure);
          this.checkLines();
        }}
      }, this.speed);
    }
  }
  checkLines() {
    let lines = 0;
    for (let y = 1; y < 21; y++) {
      let occupied = document.querySelectorAll(`.occupied[y="${y}"]`);
    
      if (occupied.length == 10) {
        occupied.forEach((item) => item.classList.remove("occupied"));
        lines += 1;
        for (let z = y + 1; z < 20; z++) {
          const cellsToDown = document.querySelectorAll(`.occupied[y="${z}"]`);
          let down = [];
          cellsToDown.forEach((x) => {
            x.classList.remove("occupied");
            down.push(x.getAttribute("x"));
          });

          down.forEach((item) =>
            document
              .querySelector(`[x="${item}"][y="${z - 1}"]`)
              .classList.add("occupied")
          );
        }
        y -= 1;
      }
    }
    this.score += 5;
    switch (lines) {
      case 1:
        this.score += 40;
        break;
      case 2:
        this.score += 100;
        break;
      case 3:
        this.score += 300;
        break;
      case 4:
        this.score += 1200;
        break;
    }
    this.setScore();
    this.changeSpeed();
    this.start();
  }
  setScore() {
    const score = document.querySelector("#score");
    score.textContent = `${this.score}`.padStart(6, "0");
  }
  changeSpeed(){
    if (this.score > 1000) {this.speed = 400}
    if (this.score > 3000) {this.speed = 300}
    if (this.score > 8000) {this.speed = 200}
    if (this.score > 20000){this.speed = 150}
    if (this.speed > 50000){this.speed = 100}
    if (this.speed > 100000){this.speed = 60}
  }
  stop(figure) {
    for (let xy of figure.coordinates) {
      if (!figure.canmove && xy[1] == 21) {
        console.log("STOP!!!!");
        this.continue = false;
        window.addEventListener("keydown", start, false);
        break;
      }
    }
  }
}

const figures = new Map([
  [
    "I",
    {
      coord: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      rotate: [
        [
          [1, 1],
          [0, 0],
          [-1, -1],
          [-2, -2],
        ],
        [
          [-1, -1],
          [0, 0],
          [1, 1],
          [2, 2],
        ],
      ],
    },
  ],
  [
    "O",
    {
      coord: [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ],
      rotate: [
        [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ],
      ],
    },
  ],
  [
    "T",
    {
      coord: [
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
      ],
      rotate: [
        [
          [1, 1],
          [0, 0],
          [-1, -1],
          [1, -1],
        ],
        [
          [1, -1],
          [0, 0],
          [-1, 1],
          [-1, -1],
        ],
        [
          [-1, -1],
          [0, 0],
          [1, 1],
          [-1, 1],
        ],
        [
          [-1, 1],
          [0, 0],
          [1, -1],
          [1, 1],
        ],
      ],
    },
  ],
  [
    "S",
    {
      coord: [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
      ],
      rotate: [
        [
          [2, 0],
          [1, 1],
          [0, 0],
          [-1, 1],
        ],
        [
          [-2, 0],
          [-1, -1],
          [0, 0],
          [1, -1],
        ],
      ],
    },
  ],
  [
    "Z",
    {
      coord: [
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
      ],
      rotate: [
        [
          [0, 1],
          [-1, 0],
          [2, 1],
          [1, 0],
        ],
        [
          [0, -1],
          [1, 0],
          [-2, -1],
          [-1, 0],
        ],
      ],
    },
  ],
  [
    "L",
    {
      coord: [
        [0, 0],
        [1, 0],
        [0, 1],
        [0, 2],
      ],
      rotate: [
        [
          [-2, 0],
          [-3, 1],
          [-1, 0],
          [0, -1],
        ],
        [
          [1, 2],
          [0, 1],
          [0, 0],
          [-1, -1],
        ],
        [
          [2, -1],
          [3, 0],
          [1, 0],
          [0, 1],
        ],
        [
          [-1, -1],
          [0, -2],
          [0, 0],
          [1, 1],
        ],
      ],
    },
  ],

  [
    "J",
    {
      coord: [
        [0, 0],
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      rotate: [
        [
          [0, 2],
          [-1, 1],
          [0, 0],
          [1, -1],
        ],
        [
          [2, 0],
          [1, 1],
          [0, 0],
          [-1, -1],
        ],
        [
          [0, -2],
          [1, -1],
          [0, 0],
          [-1, 1],
        ],
        [
          [-2, 0],
          [-1, -1],
          [0, 0],
          [1, 1],
        ],
      ],
    },
  ],
]);
const figLetters = "IOTSZLJ";


class Figure {
  constructor() {
    this.startX = 5;
    this.startY = 21;
    this.canmove = true;
    this.letter = "I";
    this.rotate = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];
    this.state = 0;
    this.pause = false;
    this.init();
  }

  init = () => {
    let d = Math.floor(Math.random() * figLetters.length);
    this.letter = figLetters.charAt(d);
    let coord = figures.get(this.letter).coord;
    this.rotate = figures.get(this.letter).rotate;

    this.coordinates = coord.map(function (arr) {
      return arr.slice();
    });
    for (let xy of this.coordinates) {
      xy[0] += this.startX;
      xy[1] += this.startY;
    }
    this.handler = this.move.bind(this);
    window.addEventListener("keydown", this.handler, false);
  };

  draw(drawing) {
    for (let xy of this.coordinates) {
      drawing
        ? document
            .querySelector(`[x="${xy[0]}"][y="${xy[1]}"]`)
            .classList.add("figure", this.letter)
        : document
            .querySelector(`[x="${xy[0]}"][y="${xy[1]}"]`)
            .classList.remove("figure", this.letter);
    }
  }
  occupy() {
    for (let xy of this.coordinates) {
      document
        .querySelector(`[x="${xy[0]}"][y="${xy[1]}"]`)
        .classList.add("occupied");
      document
        .querySelector(`[x="${xy[0]}"][y="${xy[1]}"]`)
        .classList.remove("figure", this.letter);
    }
  }

  falldown() {
    if (!this.canmove) {
      this.occupy();
      window.removeEventListener("keydown", this.handler, false);
      return false;
    }

    for (let xy of this.coordinates) {
      if (
        xy[1] == 1 ||
        document
          .querySelector(`[x="${xy[0]}"][y="${xy[1] - 1}"]`)
          .classList.contains("occupied")
      ) {
        this.canmove = false;
        this.occupy();
        window.removeEventListener("keydown", this.handler, false);
        return false;
      }
    }

    this.draw(false);
    for (let xy of this.coordinates) {
      xy[1] -= 1;
    }
    this.draw(true);
  }


  move(e) {
    if (e.keyCode == 27 || e.keyCode == 80){
      this.pause = !this.pause;
      return;
    }
    if (e.keyCode == 37) {
      this.moveLeftRight(-1);
      return;
    }

    if (e.keyCode == 39) {
      this.moveLeftRight(1);
      return;
    }
    if (!this.pause){
    if (e.keyCode == 32) {
      this.falldown();
      return;
    }}
    if (e.keyCode == 38) {
      this.rotateCW();
      return;
    }
  }
  moveLeftRight(x) {
    for (let xy of this.coordinates) {
      if (
        xy[0] == (x == -1 ? 1 : 10) ||
        document
          .querySelector(`[x="${xy[0] + x}"][y="${xy[1]}"]`)
          .classList.contains("occupied")
      ) {
        return;
      }
    }
    this.draw(false);
    for (let xy of this.coordinates) {
      xy[0] += x;
    }
    this.draw(true);
  }

  rotateCW() {
    let newCoord = [];
    for (let i = 0; i < 4; i++) {
      let xNew = this.coordinates[i][0] + this.rotate[this.state][i][0];
      let yNew = this.coordinates[i][1] + this.rotate[this.state][i][1];
      newCoord.push([xNew, yNew]);
      if (
        xNew == 0 ||
        xNew == 11 ||
        yNew == 0 ||
        document
          .querySelector(`[x="${xNew}"][y="${yNew}"]`)
          .classList.contains("occupied")
      ) {
        return;
      }
    }
    this.draw(false);
    this.coordinates = newCoord.map(function (arr) {
      return arr.slice();
    });
    this.draw(true);
    this.state = this.state + 1 == this.rotate.length ? 0 : this.state + 1;
  }
}

(function () {
  if (localStorage.getItem("theme") === "theme-default") {
    setTheme("theme-default");
  } else {
    setTheme("theme-brick-game");
    // setTheme('theme-default');
  }
})();

function setTheme(theme) {
  const doc = document.documentElement;
  doc.className = theme;
}
function toggleTheme() {
  const doc = document.documentElement;
  document.activeElement.blur()
  if (doc.className == "theme-brick-game") {
    setTheme("theme-default");
  } else {
    setTheme("theme-brick-game");
  }
}
function start(e){
  if (e.keyCode == 13) {
    document.querySelector("#tetris").textContent = "";
    window.removeEventListener("keydown", start, false);
    let game = new Game();
    game.start();
  }
  
}

onload = () => {
  document.querySelector("#theme").addEventListener("click", toggleTheme);
  window.addEventListener("keydown", start, false);
};
