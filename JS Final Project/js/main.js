class Sound {
  constructor(audioContext) {
    this.audioContext = audioContext;
  }

  loadSound() {
    this.path = '';
  }

  playSound(buffer) {
    // creates a sound source
    var source = context.createBufferSource();

    // tell the source which sound to play
    source.buffer = buffer;

    // connect the source to the context's destination (the speakers)
    source.connect(context.destination);

    // play the source now
    source.start(0);
  }

  loadBuffer() {
    console.log(this.audioContext);
  }
}

window.addEventListener('load', init, false);

function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
  } catch (e) {
    alert('Web Audio API is not supported in this browser');
  }
  let audio = new Sound(audioContext);
  audio.loadBuffer();
  // audio.
}
