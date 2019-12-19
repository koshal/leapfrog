try {
  // Fix up for prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();
} catch (e) {
  alert('Web Audio API is not supported in this browser');
}
let isPlaying = undefined;
let bufferList = new Object();

let bufferLoader = new BufferLoader(audioContext, samplesObject, bl => {
  // console.log(bl);
  bufferList = bl;
});
let loop = null;

bufferLoader.load();
// let musicSamples = audio.audioBatchLoader(samples);
// let audioCtx = new Sound(audioContext);

const drums = document.querySelector('.drums');
const bass = document.querySelector('.bass');
const sounds = document.querySelector('.sounds');
const stopBtn = document.querySelector('.stopBtn');
const pausePlayBtn = document.querySelector('.pausePlayBtn');
const timeDisplay = document.querySelector('p');
const addNew = document.querySelector('.addnew');
const loopProgress = document.getElementById('.loopProgress');

let progress = 0;

drums.addEventListener('click', music, false);
bass.addEventListener('click', music, false);
sounds.addEventListener('click', music, false);
stopBtn.addEventListener('click', audioContextState, false);
pausePlayBtn.addEventListener('click', pausePlayAudioCtx, false);

function audioContextState() {
  audioContext.close().then(function() {
    stopBtn.setAttribute('disabled', 'disabled');
  });
}

function pausePlayAudioCtx() {
  if (audioContext.state === 'running') {
    audioContext.suspend().then(function() {
      pausePlayBtn.textContent = 'Resume context';
    });
  } else if (audioContext.state === 'suspended') {
    audioContext.resume().then(function() {
      pausePlayBtn.textContent = 'Suspend context';
    });
  }
}

function displayProgress(timestamp) {
  if (audioContext && audioContext.state !== 'closed') {
    timeDisplay.textContent =
      'Current context time: ' + audioContext.currentTime.toFixed(3);
  } else {
    timeDisplay.textContent = 'Current context time: No context exists.';
  }
  // loopProgress.style.width = progress + '%';

  requestAnimationFrame(displayProgress);
}

displayProgress();

function music(e) {
  if (e.target !== e.currentTarget) {
    // console.log(e.target.id);
    toggleSound(e.target);
  }
  e.stopPropagation();
}

function toggleSound(elem) {
  if (elem.classList.contains('playing')) {
    elem.classList.remove('playing');
    playStopBuffer(elem);
  } else {
    elem.classList.add('playing');
    // console.log(elem.isPlaying);
    playStopBuffer(elem);
  }
}

function playStopBuffer(elem) {
  prop = elem.id;

  let sound = audioContext.createBufferSource();
  sound.buffer = bufferList[prop];
  // sound.loop = true;
  console.log(sound);
  // sound.buffer = bufferList[index];
  sound.connect(audioContext.destination);
  console.log(isPlaying);

  if (!isPlaying || isPlaying == undefined) {
    console.log(sound);
    sound.start(0);
    isPlaying = true;
    console.log(isPlaying);
  } else if (isPlaying) {
    console.log(sound);
    sound.stop();
    isPlaying = false;
    return;
  }
}

// function playLoop() {}
