var container = document.getElementById('carousel-container');
var imageCarousel = document.getElementById('carousel-image-container');
var images = document.getElementById('carousel-image-container').getElementsByTagName('img');
var dotContainer = document.getElementById('dots-wrapper');

var currentImageIndex = 0;
var imageCount = images.length;
var imageWidth = container.offsetWidth;
var timer;

for (var i = 0; i < images.length; i++) {
  images[i].width = imageWidth;
}

var carouselWidth = imageCount * imageWidth;

imageCarousel.style.width = carouselWidth + 'px';
addDots();

var dots = Array.from(document.getElementsByClassName('dots'));

// startSlide();
function startSlide() {
  timer = setInterval(playSlides, 1500);
}

function stopSlide() {
  clearInterval(timer);
}

function addDots() {
  for (let i = 0; i < imageCount; i++) {
    var dot = document.createElement("span");
    dot.classList.add('dots');
    dotContainer.appendChild(dot);
    dot.addEventListener("click", function () {
      currentImageIndex = i;
      slideImage(currentImageIndex);
      activateIndicator(currentImageIndex)
    });
  }

}

function activateIndicator(currentImageIndex) {
  var active = document.querySelector('.active');
  if (active != null) {
    active.classList.remove('active');
  }

  dots[currentImageIndex].classList.add('active');
}

function playSlides() {
  if (currentImageIndex + 1 > imageCount) {
    currentImageIndex = 0;
  }
  slideImage(currentImageIndex);
  activateIndicator(currentImageIndex);
  currentImageIndex++;
}

function slideImage(c) {
  imageCarousel.style.marginLeft = '-' + c * imageWidth + 'px';
}

function isCurrentImageLast() {
  return currentImageIndex == imageCount - 1;
}

function isCurrentImageFirst() {
  return currentImageIndex == 0;
}

document.getElementById('next-img').addEventListener('click', function () {
  stopSlide();
  if (isCurrentImageLast()) {
    currentImageIndex = 0;
    slideImage(currentImageIndex);
    activateIndicator(currentImageIndex);
    startSlide();
  } else {
    stopSlide();
    currentImageIndex++;
    slideImage(currentImageIndex);
    activateIndicator(currentImageIndex);
    startSlide()
  }
})

document.getElementById('prev-img').addEventListener('click', function () {
  stopSlide();
  if (isCurrentImageFirst()) {
    currentImageIndex = imageCount - 1;
    slideImage(currentImageIndex);
    activateIndicator(currentImageIndex);
    startSlide();
  } else {
    stopSlide();
    currentImageIndex--;
    slideImage(currentImageIndex);
    activateIndicator(currentImageIndex);
    startSlide();
  }
})


// document.addEventListener('keydown', function (event) {
//   if (event.keyCode == 37) {
//     if (isCurrentImageFirst()) {
//       currentImageIndex = imageCount - 1;
//       slideImage(currentImageIndex);
//     } else {
//       currentImageIndex--;
//       slideImage(currentImageIndex);
//     }
//   }
//   else if (event.keyCode == 39) {
//     if (isCurrentImageLast()) {
//       imageCarousel.style.left = 0;
//       currentImageIndex = 0;
//     } else {
//       currentImageIndex++;
//       slideImage(currentImageIndex);
//     }
//   }
// });



