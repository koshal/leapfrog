class BuferLoader {
  constructor(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  }

  loadBuffer(url, index) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    let loader = this;

    request.onload = function() {
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount == loader.urlList.length)
            loader.onload(loader.bufferList);
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    };

    request.onerror = function() {
      alert('BufferLoader: XHR error');
    };

    request.send();
  }

  load() {
    console.log(this);
    for (let i = 0; i < this.urlList.length; ++i) {
      this.loadBuffer(this.urlList[i], i);
    }
  }
}
