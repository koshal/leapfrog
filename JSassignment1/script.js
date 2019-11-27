var container = document.getElementById('carousel-container');
var imageCarousel = document.getElementById('carousel-image-container');
var images = document.getElementById('carousel-image-container').getElementsByTagName('img');
var dotContainer = document.getElementById('dots-wrapper');

var currentImageIndex = 0;
var imageCount = images.length;
var imageWidth = container.offsetWidth;

for (var i = 0; i < images.length; i++) {
  images[i].width = imageWidth;
}
var carouselWidth = imageCount * imageWidth;

imageCarousel.style.width = carouselWidth + 'px';

addDots();

function addDots() {
  for (let i = 0; i < imageCount; i++) {
    var dot = document.createElement("span");
    dot.classList.add("dots");
    dotContainer.appendChild(dot);
    dot.addEventListener("click", function () {
      currentImageIndex = i;
      slideImage(currentImageIndex);
      // dots[currentImageIndex].classList.add('active');
    });
  }
}

playSlides();

function playSlides() {
  var dots = document.getElementsByClassName('dots');
  var active = document.querySelector('.active');
  if (currentImageIndex + 1 > imageCount) {
    currentImageIndex = 0;
  }
  slideImage(currentImageIndex);

  if (active != null) {
    active.classList.remove('active');
  }

  dots[currentImageIndex].classList.add('active');

  currentImageIndex++;
  setTimeout(playSlides, 3000);

}

function slideImage(c) {
  imageCarousel.style.left = '-' + c * imageWidth + 'px';
}

function isCurrentImageLast() {
  return currentImageIndex == imageCount - 1;
}

function isCurrentImageFirst() {
  return currentImageIndex == 0;
}

document.getElementById('next-img').addEventListener('click', function () {
  if (isCurrentImageLast()) {
    imageCarousel.style.left = 0;
    currentImageIndex = 0;
  } else {
    currentImageIndex++;
    slideImage(currentImageIndex);
  }
})

document.getElementById('prev-img').addEventListener('click', function () {
  if (isCurrentImageFirst()) {
    currentImageIndex = imageCount - 1;
    slideImage(currentImageIndex);
  } else {
    currentImageIndex--;
    slideImage(currentImageIndex);
  }
})

document.addEventListener('keydown', function (event) {
  if (event.keyCode == 37) {
    if (isCurrentImageFirst()) {
      currentImageIndex = imageCount - 1;
      slideImage(currentImageIndex);
    } else {
      currentImageIndex--;
      slideImage(currentImageIndex);
    }
  }
  else if (event.keyCode == 39) {
    if (isCurrentImageLast()) {
      imageCarousel.style.left = 0;
      currentImageIndex = 0;
    } else {
      currentImageIndex++;
      slideImage(currentImageIndex);
    }
  }
});



