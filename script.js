const popup = document.querySelector(".start-popup");
const road = document.querySelector(".road");
const score = document.querySelector(".result");
const cars = ["./pink.png", "./silver.png", "./yellow.png"];
let player = {
  speed: 5,
  score: 0,
  inPlay: true,
};
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

popup.addEventListener("click", startGame);

function startGame() {
  popup.style.display = "none";
  road.classList.remove("hide");
  player.inPlay = true;
  player.score = 0;
  road.innerHTML = "";

  let car = document.createElement("div");
  car.classList.add("car");
  road.appendChild(car);
  car.y = car.offsetTop;
  car.x = car.offsetLeft;

  generateLines();
  generateEnemys();

  requestAnimationFrame(playGame);
}

function generateEnemys() {
  for (let x = 0; x < 3; x++) {
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    let ran = Math.floor(Math.random() * cars.length);
    enemy.y = (x + 1) * 300 * -1;
    enemy.x = Math.floor(Math.random() * 400);
    enemy.style.top = enemy.y + "px";
    enemy.style.left = enemy.x + "px";
    enemy.style.backgroundImage = `url(${cars[ran]})`;
    road.appendChild(enemy);
  }
}
function moveEnemys(car) {
  let enemys = document.querySelectorAll(".enemy");

  enemys.forEach((enemy) => {
    enemy.y += player.speed;

    if (isCollide(car, enemy)) {
      endGame();
    }

    if (enemy.y > 1500) {
      enemy.y = -600;
      enemy.x = Math.floor(Math.random() * 400);
      let ran = Math.floor(Math.random() * cars.length);
      enemy.style.backgroundImage = `url(${cars[ran]})`;
    }
    enemy.style.top = enemy.y + "px";
    enemy.style.left = enemy.x + "px";
  });
}

function playGame() {
  player.score++;
  score.innerHTML = player.score;
  let car = document.querySelector(".car");
  let roadBound = road.getBoundingClientRect();

  moveLines();
  moveEnemys(car);
  if (player.inPlay) {
    if (keys.ArrowRight && car.x + 50 < roadBound.width) {
      car.x += player.speed;
    }
    if (keys.ArrowLeft && car.x > 0) {
      car.x -= player.speed;
    }
    if (keys.ArrowUp) {
      car.y -= player.speed;
    }
    if (keys.ArrowDown) {
      car.y += player.speed;
    }

    car.style.left = car.x + "px";
    car.style.top = car.y + "px";
    requestAnimationFrame(playGame);
  }
}

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function generateLines() {
  for (let x = 0; x < 10; x++) {
    let line = document.createElement("div");
    line.classList.add("line");
    line.y = x * 150;
    line.x = 50;
    line.style.left = line.x + "%";
    line.style.top = line.y + "px";
    road.appendChild(line);
  }
}

function moveLines() {
  let lines = document.querySelectorAll(".line");

  lines.forEach((line) => {
    line.y += player.speed;

    if (line.y > 1500) {
      line.y = 0;
    }
    line.style.top = line.y + "px";
  });
}
function endGame() {
  player.inPlay = false;
  popup.style.display = "block";
}

function pressOn(e) {
  e.preventDefault();
  keys[e.code] = true;
}

function pressOff(e) {
  e.preventDefault();
  keys[e.code] = false;
}
