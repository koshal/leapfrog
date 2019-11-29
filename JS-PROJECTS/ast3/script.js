function Box(parentElement) {
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.speed = 2;
  this.size = 30;
  this.width = this.size;
  this.height = this.size;
  this.element = null;
  this.parentElement = parentElement;
  this.fps = 60;
  this.timer;

  this.init = function () {
    var img = document.createElement("img");
    img.src = "images/giphy.gif";
    img.style.width = '100%';
    img.style.objectFit = 'contain';

    var box = document.createElement('div');
    box.appendChild(img);
    box.style.height = this.height + 'px';
    box.style.width = this.width + 'px';
    box.style.position = 'absolute';
    box.classList.add('box');


    this.parentElement.appendChild(box);
    this.element = box;
    this.element.onclick = this.boxClicked.bind(this);
    this.draw();

    return this;
  }

  this.setPostion = function (x, y) {
    this.x = x;
    this.y = y;
  }

  this.setDirection = function (dx, dy) {
    this.dx = (Math.random() - 0.5) * this.speed * 2;
    this.dy = (Math.random() - 0.5) * this.speed * 2;
  }

  this.boxClicked = function () {
    this.element.style.display = 'none';
  }

  this.draw = function () {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

  this.move = function () {
    this.x += this.dx;
    this.y += this.dy;
  }

  this.stop = function () {
    this.x += 0;
    this.y += 0;
    this.draw();
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function Game(parentElement, boxCount) {
  var boxes = [];
  var MAX_WIDTH = 800;
  var MAX_HEIGHT = 500;
  this.parentElement = parentElement;
  this.parentElement.style.width = MAX_WIDTH + 'px';
  this.parentElement.style.height = MAX_HEIGHT + 'px';
  this.parentElement.style.position = 'relative';
  this.boxCount = boxCount || 10;

  this.startGame = function () {
    for (var i = 0; i < this.boxCount; i++) {
      var box = new Box(parentElement).init();
      box.setPostion(
        getRandomArbitrary(0, MAX_WIDTH - 30),
        getRandomArbitrary(0, MAX_HEIGHT - 30)
      );
      box.setDirection();
      box.draw();
      boxes.push(box);
    }

    this.boxClicked = function () {
      console.log('lol');
    }

    this.timer = setInterval(this.gameLoop.bind(this), 1000 / 60);
  }

  // boxes.forEach(onclick)

  this.gameLoop = function () {
    for (var i = 0; i < this.boxCount; i++) {
      var box1 = boxes[i];

      //Update
      box1.move();

      //Draw
      box1.draw();

      this.checkWallCollision(box1);

      for (var j = i + 1; j < boxes.length; j++) {
        var box2 = boxes[j];
        this.checkBoxCollision(box1, box2);
      }
    }


  }

  this.checkBoxCollision = function (box1, box2) {
    var deltaX = Math.abs(box1.x - box2.x);
    var deltaY = Math.abs(box1.y - box2.y);

    //Collision Detection
    if (deltaX <= 30 && deltaY <= 30) {
      // collision remove
      if (deltaX < deltaY) {
        var tempvy = box1.dy
        box1.dy = box2.dy;
        box2.dy = tempvy;
        if (box1.y < box2.y) {
          box1.y = box2.y - box1.size;
        }
        else {
          box1.y = box2.y + box1.size;
        }
      }
      else {
        var tempvx = box1.dx
        box1.dx = box2.dx;
        box2.dx = tempvx;
        if (box1.x < box2.x) {
          box1.x = box2.x - box1.size;
        }
        else {
          box1.x = box2.x + box1.size;
        }
      }
    }
  }

  this.checkWallCollision = function (box) {
    if (box.x <= 0 || box.x + box.width >= MAX_WIDTH) {
      box.dx *= -1;
      box.x = box.x <= 0 ? 0 : MAX_WIDTH - box.size;
    }

    if (box.y <= 0 || box.y + box.height >= MAX_HEIGHT) {
      box.dy *= -1;
      box.y = box.y <= 0 ? 0 : MAX_HEIGHT - box.size;
    }
  }
}

var parentElement = document.getElementById('app');
new Game(parentElement, 10).startGame();