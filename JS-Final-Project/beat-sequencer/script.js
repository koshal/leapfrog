let step = 0;
let context = new AudioContext();
let bufferList = null;
let compressor = 0;

let bufferLoader = new BuferLoader(
  context,
  [
    'samples/bd.wav',
    'samples/sn.wav',
    'samples/clhat.wav',
    'samples/hitom.wav'
  ],
  bl => {
    bufferList = bl;
  }
);

bufferLoader.load();

let playing = false;
let loop = null;
const bpm = 120;
const rows = document.querySelectorAll('tr');
const bpmElement = document.getElementById('bpm-display');

function initialize() {
  compressor = context.createDynamicsCompressor();
  compressor.connect(context.destination);

  bpmElement.innerText = bpm + ' bpm';

  document.querySelectorAll('.step').forEach(element => {
    element.onclick = activateStep;
  });

  document.getElementById('play-btn').onclick = ev => {
    step = 0;
    if (playing) {
      clearPlayhead();
      clearTimeout(loop);
    } else {
      playLoop();
    }
    playing = !playing;
  };

  document.getElementById('bpm-slider').onchange = ev => {
    bpm = ev.target.value;
    bpmElement.innerText = bpm + ' bpm';
    step = 0;
    clearPlayhead();
    clearInterval(loop);
    playLoop();
    playing = true;
  };
}

function clearPlayhead() {
  playheads = document.querySelectorAll('.playhead');
  playheads.forEach(element => {
    element.classList.remove('playhead');
  });
}

function activateStep() {
  if (this.classList.contains('active')) {
    this.classList.remove('active');
  } else {
    this.classList.add('active');
  }
}

function playBuffer(index) {
  let sound = context.createBufferSource();
  sound.buffer = bufferList[index];
  sound.connect(compressor);
  sound.start(0);
}

function playSound(sound) {
  if (sound == 'bd') {
    playBuffer(0);
  } else if (sound == 'sn') {
    playBuffer(1);
  } else if (sound == 'clhat') {
    playBuffer(2);
  } else if (sound == 'hitom') {
    playBuffer(3);
  }
}

function playLoop() {
  rows.forEach(row => {
    row.cells[step].classList.remove('playhead');
  });

  step = (step + 1) % 16;

  rows.forEach(row => {
    row.cells[step].classList.add('playhead');
    if (row.cells[step].classList.contains('active')) {
      playSound(row.cells[step].getAttribute('data-sound'));
    }
  });

  loop = window.setTimeout(playLoop, 60000 / bpm / 4);
}

initialize();
