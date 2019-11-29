function Carousel(containerId) {

  var indicatorWrapper;
  var that = this;

  this.currentImageIndex = 0;
  this.width = 800;
  this.height = 480;
  this.containerId = containerId[0];
  this.left = null;
  this.right = null;

  this.imagesWrapper = containerId[0].children;
  this.images = this.imagesWrapper.item(0).children;
  this.imageCount = this.images.length;

  // this.images = Array.from(this.imagesWrapper.getElementsByTagName('img'));
  this.func = function () {
    // console.log(this.addDirection());
  }

  this.init = function () {
    this.setStyle();
    this.addDirection();
    this.addIndicators();
    this.activateIndicator(this.currentImageIndex);

  }

  this.addDirection = function () {
    moveLeft = document.createElement('div');
    moveRight = document.createElement('div');

    moveLeft.classList.add('prev-img');
    moveRight.classList.add('next-img');

    this.containerId.appendChild(moveLeft);
    this.containerId.appendChild(moveRight);
    var left = document.createElement('i');
    var right = document.createElement('i');
    moveLeft.appendChild(left).className = "fas fa-chevron-left";
    moveRight.appendChild(right).className = "fas fa-chevron-right";

    // moveLeft.addEventListener('click', console.log('object'));



  }



  // this.slideRight = function (c) {
  // if (this.isCurrentImageLast()) {
  //   this.currentImageIndex = 0;
  //   this.slideImage(this.currentImageIndex);
  //   this.activateIndicator(this.currentImageIndex);
  // } 
  // else {
  //   this.currentImageIndex++;
  //   this.slideImage(this.currentImageIndex);
  //   this.activateIndicator(this.currentImageIndex);
  // }

  // this.slideLeft = function () {
  //   if (this.isCurrentImageFirst()) {
  //     this.currentImageIndex = this.imageCount - 1;
  //     this.slideImage(this.currentImageIndex);
  //     this.activateIndicator(this.currentImageIndex);
  //   } else {
  //       this.currentImageIndex--;
  //     this.slideImage(this.currentImageIndex);
  //     this.activateIndicator(this.currentImageIndex);
  //   }
  // }

  this.slideImage = function (c) {
    this.imagesWrapper[0].style.marginLeft = '-' + c * this.width + 'px';
  }

  this.addIndicators = function () {
    indicatorWrapper = document.createElement('div');
    indicatorWrapper.classList.add('dots-wrapper');
    this.containerId.appendChild(indicatorWrapper);
    this.addDots();
  }

  this.addDots = function () {
    for (let i = 0; i < this.imageCount; i++) {
      var dot = document.createElement("span");
      dot.classList.add('dots');
      indicatorWrapper.appendChild(dot);
      dot.addEventListener("click", function () {
        currentImageIndex = i;
        that.slideImage(currentImageIndex);
        that.activateIndicator(currentImageIndex)
      });
    }
  }

  this.setStyle = function () {
    this.containerId.style.width = this.width + 'px';
    this.containerId.style.height = this.height + 'px';
    this.containerId.style.position = 'relative';
    this.containerId.style.overflow = 'hidden';

    this.imagesWrapper[0].style.width = this.imageCount * this.width + 'px';

    for (let i = 0; i < this.imageCount; i++) {
      this.images[i].style.float = 'left';
    }
  }

  this.activateIndicator = function (c) {
    var active = document.querySelector('.active');
    var dots = Array.from(this.containerId.getElementsByClassName('dots'));
    if (active != null) {
      active.classList.remove('active');
    }
    dots[c].classList.add('active');
    this.currentImageIndex = c;
  }

  this.isCurrentImageLast = function () {
    return this.currentImageIndex == this.imageCount - 1;
  }

  this.isCurrentImageFirst = function () {
    return this.currentImageIndex == 0;
  }
}

var container = document.getElementsByClassName('carousel-container');

var carousel = new Carousel(container);
carousel.init();
carousel.func();

