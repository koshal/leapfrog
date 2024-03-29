function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function ScoreBoard(height, width, parentClass) {
  this.height = height;
  this.width = width;
  this.stepIncrement = 1;
  this.score = 0;
  this.scoreBoardElement;
  this.scoreIndicatorElement;

  this.reset = function() {
    this.score = 0;
    this.draw();
  };

  this.init = function() {
    this.scoreBoardElement = document.createElement("div");
    this.scoreBoardElement.innerHTML = "Score";
    this.scoreIndicatorElement = document.createElement("span");
    this.scoreIndicatorElement.style.display = "block";
    this.scoreIndicatorElement.innerHTML = this.score;

    this.scoreBoardElement.appendChild(this.scoreIndicatorElement);
    this.scoreBoardElement.style.height = this.height + "px";
    this.scoreBoardElement.style.minWidth = this.width + "px";
    this.scoreBoardElement.style.position = "absolute";
    this.scoreBoardElement.style.zIndex = "10";
    this.scoreBoardElement.style.left = "50%";
    this.scoreBoardElement.style.transform = "translateX(-50%)";
    this.scoreBoardElement.style.fontSize = "32px";
    this.scoreBoardElement.style.color = "yellow";
    this.scoreBoardElement.style.textAlign = "center";

    return this.scoreBoardElement;
  };

  this.updateScore = function() {
    this.score += this.stepIncrement;
    this.draw();
  };

  this.draw = function() {
    this.scoreIndicatorElement.innerHTML = this.score;
  };
}

function Obstacle(height, width, parentClass) {
  this.height = height;
  this.width = width;
  this.dx = parentClass.backgroundClass.dx + 0.2;
  this.MAX_DX = parentClass.backgroundClass.MAX_VELOCITY + 0.2;
  this.intervalId;
  this.genrateInLane = getRandomNumber(1, 4);
  this.top = -this.height;
  this.left =
    this.genrateInLane === 1
      ? parentClass.racerClass.MIN_LEFT
      : (this.genrateInLane - 1) * parentClass.racerClass.offSetValue +
        parentClass.racerClass.MIN_LEFT;

  this.getSpeed = function() {
    this.dx += parentClass.backgroundClass.increaseRate;
    // console.log(this.dx);
    return this.dx >= this.MAX_DX ? this.MAX_DX : this.dx;
  };

  this.init = function() {
    this.obstacleElement = document.createElement("div");

    this.obstacleElement.style.height = this.height + "px";
    this.obstacleElement.style.width = this.width + "px";
    this.obstacleElement.style.backgroundImage =
      "url(./images/car" + getRandomNumber(1, 4) + ".png)";
    this.obstacleElement.style.backgroundRepeat = "no-repeat";
    this.obstacleElement.style.backgroundSize = "100% 100%";
    this.obstacleElement.style.position = "absolute";
    this.obstacleElement.style.top = this.top + "px";
    this.obstacleElement.style.left = this.left + "px";

    this.move();

    return this.obstacleElement;
  };

  this.detectCollisionY = function() {
    if (this.top >= parentClass.height) {
      return true;
    } else {
      return false;
    }
  };

  this.move = function() {
    this.intervalId = setInterval(
      function() {
        this.top += this.getSpeed();
        if (this.detectCollisionY()) {
          parentClass.gameElement.removeChild(this.obstacleElement);
          parentClass.removeObstacle(this.obstacleElement);
          parentClass.scoreBoardClass.updateScore();
          clearInterval(this.intervalId);
        }
        parentClass.detectCollision(this);
        this.draw();
      }.bind(this),
      parentClass.backgroundClass.increaseInInterval
    );
  };

  this.draw = function() {
    this.obstacleElement.style.top = this.top + "px";
  };
}

function Player(height, width, parentClass) {
  this.height = height;
  this.width = width;
  this.moving = false;
  this.inLane = 1;
  this.MIN_LEFT = 55;
  this.top = parentClass.height - this.height;
  this.left = this.MIN_LEFT;
  this.offSetValue = 180;
  this.bulletLeft = 10;
  this.bulletIncreaseBy = 10;
  this.bulletShooting = false;

  this.init = function() {
    this.racerElement = document.createElement("div");
    this.racerElement.style.height = this.height + "px";
    this.racerElement.style.width = this.width + "px";
    this.racerElement.style.backgroundImage = "url(./images/car.png)";
    this.racerElement.style.backgroundRepeat = "no-repeat";
    this.racerElement.style.backgroundSize = "100% 100%";
    this.racerElement.style.position = "absolute";
    this.racerElement.style.top = this.top + "px";
    this.racerElement.style.left = this.left + "px";

    return this.racerElement;
  };

  this.increaseBullet = function() {
    this.bulletLeft += this.bulletIncreaseBy;
    parentClass.bulletIndicatorClass.draw();
  };

  this.reset = function() {
    this.bulletLeft = 10;
  };

  this.detectCollisionX = function() {
    if (this.left <= 0 || this.left >= parentClass.width - this.width) {
      return true;
    } else {
      return false;
    }
  };

  this.move = function(from, to) {
    if (from < to) {
      var id = setInterval(
        function() {
          this.left += 2;
          this.draw();
          if (this.left >= to) clearInterval(id);
        }.bind(this)
      );
    } else if (from > to) {
      var id = setInterval(
        function() {
          this.left -= 2;
          this.draw();
          if (this.left <= to) clearInterval(id);
        }.bind(this)
      );
    }
    this.moving = false;
  };

  this.moveRight = function() {
    if (!this.detectCollisionX() && this.inLane < 3) {
      this.moving = true;
      this.inLane++;
      this.move(this.left, this.left + this.offSetValue);
    }
  };

  this.moveLeft = function() {
    if (!this.detectCollisionX() && this.inLane > 1) {
      this.moving = true;
      this.inLane--;
      this.move(this.left, this.left - this.offSetValue);
    }
  };

  this.draw = function() {
    this.racerElement.style.left = this.left + "px";
  };
}

function BulletCartridge(height, width, parentClass) {
  this.height = height;
  this.width = width;
  this.top = -this.height;
  this.inLane = getRandomNumber(1, 4);
  // this.intervalId;
  this.dx = parentClass.backgroundClass.dx;
  // this.bulletCartridgeElement;

  this.init = function() {
    this.bulletCartridgeElement = document.createElement("div");
    this.bulletCartridgeElement.style.width = this.width + "px";
    this.bulletCartridgeElement.style.height = this.height + "px";
    this.bulletCartridgeElement.style.position = "absolute";
    this.bulletCartridgeElement.style.top = this.top + "px";
    this.bulletCartridgeElement.style.left =
      (this.inLane - 1) * parentClass.racerClass.offSetValue +
      parentClass.racerClass.MIN_LEFT +
      "px";
    this.bulletCartridgeElement.style.backgroundImage =
      "url(./images/bullet.png)";
    this.bulletCartridgeElement.style.backgroundSize = "100% 100%";
    this.bulletCartridgeElement.style.backgroundRepeat = "no-repeat";

    return this.bulletCartridgeElement;
  };

  this.reachedTheEnd = function() {
    if (this.top > parentClass.height) {
      parentClass.gameElement.removeChild(this.bulletCartridgeElement);
      this.bulletCartridgeElement = undefined;
      clearInterval(this.intervalId);
    }
  };

  this.collisionWithRacer = function() {
    if (
      this.inLane === parentClass.racerClass.inLane &&
      this.top + this.height >
        parentClass.height - parentClass.racerClass.height
    ) {
      parentClass.gameElement.removeChild(this.bulletCartridgeElement);
      this.bulletCartridgeElement = undefined;
      clearInterval(this.intervalId);
      parentClass.racerClass.increaseBullet();
    }
  };

  this.move = function() {
    this.intervalId = setInterval(
      function() {
        this.top += this.dx;
        this.draw();
        this.reachedTheEnd();
        this.collisionWithRacer();
      }.bind(this),
      parentClass.backgroundClass.increaseInInterval
    );
  };

  this.draw = function() {
    this.bulletCartridgeElement.style.top = this.top + "px";
  };
}

function Bullet(height, width, parentClass) {
  this.height = height;
  this.width = width;
  this.shooting;
  this.dx = 10;
  this.top = parentClass.height - parentClass.racerClass.height - 10;

  this.init = function() {
    this.bulletElement = document.createElement("div");
    this.bulletElement.style.height = this.height + "px";
    this.bulletElement.style.width = this.width + "px";
    this.bulletElement.style.backgroundImage = "url(./images/bullet.png)";
    this.bulletElement.style.backgroundSize = "100% 100%";
    this.bulletElement.style.backgroundRepeat = "no-repeat";
    this.bulletElement.style.position = "absolute";
    this.bulletElement.style.top = this.top + "px";
    this.genrateInLane = parentClass.racerClass.inLane;
    this.left =
      this.genrateInLane === 1
        ? parentClass.racerClass.MIN_LEFT
        : (this.genrateInLane - 1) * parentClass.racerClass.offSetValue +
          parentClass.racerClass.MIN_LEFT;

    this.bulletElement.style.left = this.left + "px";

    return this.bulletElement;
  };

  this.detectCollisionX = function() {
    if (this.top <= 0) {
      parentClass.racerClass.bulletShooting = false;
      parentClass.gameElement.removeChild(this.bulletElement);
      clearInterval(this.intervalId);
    }
  };

  this.detectCollisionWithObstacle = function() {
    parentClass.obstacles.forEach(
      function(element) {
        if (this.genrateInLane === element.genrateInLane) {
          if (element.top + element.height > this.top) {
            parentClass.racerClass.bulletShooting = false;
            parentClass.gameElement.removeChild(this.bulletElement);
            clearInterval(this.intervalId);
            parentClass.removeObstacle(this);
            parentClass.scoreBoardClass.updateScore();
          }
        }
      }.bind(this)
    );
  };

  this.fireBullet = function() {
    this.intervalId = setInterval(
      function() {
        this.top -= this.dx;
        this.draw();
        this.detectCollisionWithObstacle();
        this.detectCollisionX();
      }.bind(this),
      10
    );
  };

  this.draw = function() {
    this.bulletElement.style.top = this.top + "px";
  };
}

function BulletIndicator(height, width, parentClass) {
  this.height = height;
  this.width = width;
  this.top = 0;
  this.left = 0;
  this.bulletCount = parentClass.racerClass.bulletLeft;

  this.init = function() {
    this.bulletIndicatorElement = document.createElement("div");
    this.bulletIndicatorElement.style.position = "absolute";
    this.bulletIndicatorElement.style.width = this.width + "px";
    this.bulletIndicatorElement.style.top = this.top + "px";
    this.bulletIndicatorElement.style.left = this.left + "px";
    this.bulletIndicatorElement.style.backgroundImage =
      "url(./images/bullet.png)";
    this.bulletIndicatorElement.style.backgroundSize = "30%";
    this.bulletIndicatorElement.style.backgroundRepeat = "no-repeat";
    this.bulletIndicatorElement.style.backgroundPosition = "left center";
    this.bulletIndicatorElement.innerHTML = this.bulletCount;
    this.bulletIndicatorElement.style.textAlign = "right";
    this.bulletIndicatorElement.style.fontSize = "36px";
    this.bulletIndicatorElement.style.lineHeight = this.height + "px";

    return this.bulletIndicatorElement;
  };

  this.draw = function() {
    this.bulletCount = parentClass.racerClass.bulletLeft;
    this.bulletIndicatorElement.innerHTML = this.bulletCount;
  };
}

function GameBackground(height, width, scaleFactor, parentClass) {
  this.height = scaleFactor * height;
  this.width = width;
  this.intervalId;
  this.scaleFactor = scaleFactor;
  this.MAX_VELOCITY = 8;
  this.increaseRate = 0.0009;
  this.top = -(this.scaleFactor - 1) * parentClass.height;
  this.dx = 1;
  this.increaseInInterval = 10;

  this.reset = function() {
    this.dx = 1;
  };

  this.init = function() {
    this.gameBackgroundElement = document.createElement("div");
    this.gameBackgroundElement.style.width = this.width + "px";
    this.gameBackgroundElement.style.height = this.height + "px";
    this.gameBackgroundElement.style.position = "absolute";
    this.gameBackgroundElement.style.backgroundImage = "url(./images/road.png)";
    this.gameBackgroundElement.style.backgroundPosition = "top -left";
    this.gameBackgroundElement.style.backgroundRepeat = "repeat-y";
    this.gameBackgroundElement.style.backgroundSize = "100%";
    this.gameBackgroundElement.style.top = this.top + "px";

    this.move();
    return this.gameBackgroundElement;
  };

  this.move = function() {
    this.intervalId = setInterval(
      function() {
        this.dx = this.dx >= this.MAX_VELOCITY ? this.MAX_VELOCITY : this.dx;
        this.top += this.dx;
        this.dx += this.increaseRate;
        this.top =
          this.top >= 0
            ? -(this.scaleFactor - 1) * parentClass.height
            : this.top;
        this.draw();
      }.bind(this),
      this.increaseInInterval
    );
  };

  this.draw = function() {
    this.gameBackgroundElement.style.top = this.top + "px";
  };
}

function Game(width, height, parentElement, parentClass) {
  var that = this;
  this.carHeight = 130;
  this.carWidth = 70;
  this.scoreHeight = 100;
  this.scoreWidth = 200;

  this.width = width;
  this.height = height;
  this.obstacles = [];
  this.obstacleCreateInterval;
  this.obstacleCreateDelay = 1000 / 60;
  this.obstacleOffset = 30;
  this.pedestrianGappingOffsetIncrementStep = 0.009;
  this.MAX_PEDESTRIAN_GAPPING_OFFSET = 80;
  this.backgroundScale = 10;

  this.init = function() {
    this.gameElement = document.createElement("div");
    this.gameElement.style.height = this.height + "px";
    this.gameElement.style.width = this.width + "px";
    this.gameElement.style.position = "relative";
    this.gameElement.style.overflow = "hidden";

    this.startGame();
    return this.gameElement;
  };

  this.startGame = function() {
    this.buildHighway();
    this.playerCar();
    this.control();
    this.generateObstacle();
    this.initBulletCartridge();
    this.initBulletIndicator();
    this.scoreBoard();
  };

  this.buildHighway = function() {
    this.backgroundClass = new GameBackground(
      this.height,
      this.width,
      this.backgroundScale,
      this
    );
    this.gameElement.appendChild(this.backgroundClass.init());
  };

  this.playerCar = function() {
    this.racerClass = new Player(this.carHeight, this.carWidth, this);
    this.gameElement.appendChild(this.racerClass.init());
  };

  this.initBulletIndicator = function() {
    this.bulletIndicatorClass = new BulletIndicator(
      this.scoreHeight - 50,
      this.scoreHeight,
      this
    );
    parentElement.appendChild(this.bulletIndicatorClass.init());
  };

  this.initBulletCartridge = function() {
    this.bulletCartridgeGenratingId = setInterval(
      function() {
        this.bulletCartridgeClass = new BulletCartridge(40, 30, this);
        this.gameElement.appendChild(this.bulletCartridgeClass.init());
        this.bulletCartridgeClass.move();
      }.bind(this),
      10000
    );
  };

  this.control = function() {
    document.addEventListener(
      "keyup",
      function(event) {
        if (
          (event.keyCode === 39 || event.keyCode === 68) &&
          !this.racerClass.moving
        ) {
          that.racerClass.moveRight();
        } else if (
          (event.keyCode === 37 || event.keyCode === 65) &&
          !this.racerClass.moving
        ) {
          that.racerClass.moveLeft();
        } else if (event.keyCode === 38 || event.keyCode === 87) {
          if (
            this.racerClass.bulletLeft > 0 &&
            !this.racerClass.bulletShooting
          ) {
            this.racerClass.bulletShooting = true;
            this.bulletClass = new Bullet(40, 30, this);
            this.gameElement.appendChild(this.bulletClass.init());
            this.bulletClass.fireBullet();
            this.racerClass.bulletLeft--;
            this.racerClass.bulletLeft =
              this.racerClass.bulletLeft < 0 ? 0 : this.racerClass.bulletLeft;
            this.bulletIndicatorClass.draw();
          }
        }
      }.bind(this)
    );
  };

  this.generateObstacle = function() {
    this.obstacleCreateInterval = setInterval(
      function() {
        var obstacle = new Obstacle(this.carHeight, this.carWidth, this);
        if (this.distaceOk(obstacle)) {
          this.obstacles.push(obstacle);
          this.gameElement.appendChild(obstacle.init());
        } else {
          delete obstacle;
        }
      }.bind(this),
      this.obstacleCreateDelay
    );
  };

  this.scoreBoard = function() {
    this.scoreBoardClass = new ScoreBoard(
      this.scoreHeight,
      this.scoreWidth,
      this
    );
    parentElement.appendChild(this.scoreBoardClass.init());
  };

  this.gameOver = function() {
    clearInterval(this.obstacleCreateInterval);
    clearInterval(this.backgroundClass.intervalId);
    this.obstacles.forEach(function(element) {
      clearInterval(element.intervalId);
    });
    document.removeEventListener("keyup", this.inputFunction);
    parentElement.appendChild(new EndScreen(parentElement, this).init());
  };

  this.restartGame = function() {
    this.obstacles.forEach(
      function(element) {
        this.gameElement.removeChild(element.obstacleElement);
      }.bind(this)
    );
    this.obstacles.forEach(function(element) {
      delete element;
    });
    this.obstacles = [];
    this.backgroundClass.reset();
    this.scoreBoardClass.reset();
    this.backgroundClass.move();
    document.addEventListener("keyup", this.inputFunction);
    this.generateObstacle();
  };

  this.exitGame = function() {
    this.obstacles.forEach(
      function(element) {
        this.gameElement.removeChild(element.obstacleElement);
      }.bind(this)
    );
    this.obstacles.forEach(function(element) {
      delete element;
    });
    this.obstacles = [];
    this.gameElement.removeChild(this.racerClass.racerElement);
    this.gameElement.removeChild(this.backgroundClass.gameBackgroundElement);
    parentElement.removeChild(this.gameElement);
    parentElement.removeChild(this.scoreBoardClass.scoreBoardElement);
    parentElement.removeChild(this.highScoreBoardClass.highScoreBoardElement);
    if (
      this.bulletCartridgeClass &&
      this.bulletCartridgeClass.bulletCartridgeElement
    ) {
      this.gameElement.removeChild(
        this.bulletCartridgeClass.bulletCartridgeElement
      );
    }
    parentClass.reset();
    parentElement.appendChild(parentClass.startScreenElement);
  };

  this.detectCollision = function(withObstacle) {
    if (
      withObstacle.genrateInLane === this.racerClass.inLane &&
      withObstacle.top + withObstacle.height > this.racerClass.top
    ) {
      this.gameOver();
    }
  };

  this.distaceOk = function(obstacle) {
    var okToGenrate = true;
    this.obstacles.forEach(
      function(element) {
        if (obstacle.genrateInLane - element.genrateInLane <= 1) {
          if (
            element.top - (obstacle.top + obstacle.height) <
            this.racerClass.height + this.obstacleOffset
          ) {
            okToGenrate = false;
          }
        }
      }.bind(this)
    );
    this.obstacleOffset += this.pedestrianGappingOffsetIncrementStep;
    this.obstacleOffset =
      this.obstacleOffset >= this.MAX_PEDESTRIAN_GAPPING_OFFSET
        ? this.MAX_PEDESTRIAN_GAPPING_OFFSET
        : this.obstacleOffset;
    return okToGenrate;
  };

  this.removeObstacle = function(obstacleElement) {
    // this.obstacles = this.obstacles.filter(function(obstacle) {
    //   return obstacle.obstacleElement != obstacleElement;
    // });
    if (obstacleElement instanceof HTMLElement) {
      this.obstacles = this.obstacles.filter(function(pedestrian) {
        return pedestrian.obstacleElement != obstacleElement;
      });
    } else if (obstacleElement instanceof Bullet) {
      for (var i = 0; i < this.obstacles.length; i++) {
        if (
          this.obstacles[i].genrateInLane === obstacleElement.genrateInLane &&
          this.obstacles[i].top + this.obstacles[i].height > obstacleElement.top
        ) {
          this.gameElement.removeChild(this.obstacles[i].obstacleElement);
          clearInterval(this.obstacles[i].intervalId);
          this.obstacles.splice(i, 1);
        }
      }
    }
  };

  this.initInputsRead = function() {
    document.addEventListener("keyup", this.inputFunction);
  };
}

function EndScreen(parentElement, gameClass) {
  this.endScreenElement;

  this.init = function() {
    this.endScreenElement = document.createElement("div");
    this.endScreenElement.style.position = "absolute";
    this.endScreenElement.style.top = "50%";
    this.endScreenElement.style.left = "50%";
    this.endScreenElement.style.transform = "translate(-50%, -50%)";

    var restartMsg = document.createElement("div");
    restartMsg.innerHTML = "Press 'R' to restart";
    document.addEventListener(
      "keydown",
      function(event) {
        if (event.keyCode == 82) {
          gameClass.restartGame();
          parentElement.removeChild(this.endScreenElement);
        }
      }.bind(this)
    );
    restartMsg.style.color = "green";
    restartMsg.style.textAlign = "center";
    restartMsg.style.fontSize = "40px";

    restartMsg.style.margin = "0 auto";

    this.endScreenElement.appendChild(restartMsg);

    return this.endScreenElement;
  };
}

function StartScreen(parentElement) {
  this.startScreenElement;

  this.gameClass;

  this.reset = function() {
    this.playerName = "";
    this.draw();
  };

  this.init = function() {
    this.startScreenElement = document.createElement("div");
    this.startScreenElement.style.position = "relative";

    this.startScreenElement.style.width = "100%";
    this.startScreenElement.style.height = "900px";
    this.startScreenElement.style.background = "#f2f2f2";

    var start = document.createElement("div");
    start.innerHTML = "Click to start";
    start.style.color = "green";
    start.style.fontSize = "75px";
    start.style.textAlign = "center";
    start.style.border = "0";
    start.style.paddingLeft = "10px";
    start.style.position = "absolute";
    start.style.top = "50%";
    start.style.left = "50%";
    start.style.transform = "translate(-50%, -50%)";
    start.onclick = function() {
      this.gameClass = new Game(540, 900, parentElement, this);
      parentElement.removeChild(this.startScreenElement);
      parentElement.appendChild(this.gameClass.init());
    }.bind(this);

    // window.addEventListener(
    //   "keyDown",
    //   function(event) {
    //     if (event.keyCode == 32) {
    //       this.gameClass = new Game(540, 900, parentElement, this);
    //       parentElement.removeChild(this.startScreenElement);
    //       parentElement.appendChild(this.gameClass.init());
    //     }
    //   }.bind(this)
    // );
    this.startScreenElement.appendChild(start);

    return this.startScreenElement;
  };

  this.draw = function() {
    this.input.value = this.playerName;
  };
}

window.onload = function() {
  var game = this.document.getElementById("app");
  game.style.background = "#181818";
  game.style.width = "540px";
  game.style.position = "relative";

  game.appendChild(new StartScreen(game).init());
};
