self.onmessage = bridge;

function bridge() {
  doWork();
}

function CallBack( message: string ) {
  self.postMessage( message, undefined);
}

function doWork() {
  let counter = 0;
  function measureInternal() {
    const imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/03/Zofia_Golubiew.jpg';
    const imgSize = 204545;
    const download = new XMLHttpRequest();
    download.responseType = 'blob';
    const startTime = (new Date()).getTime();
    download.onload = function() {
      const endTime = (new Date()).getTime();
      const result = {
        startTime: startTime,
        endTime: endTime,
        duration: (endTime - startTime) / 1000,
        bitsLoaded: imgSize * 8,
        speedBps: (imgSize * 8) / ((endTime - startTime) / 1000),
        speedKbps: (imgSize * 8) / ( 1024 * (endTime - startTime) / 1000),
        speedMbps: (imgSize * 8) / ( 1024 * 1024 * (endTime - startTime) / 1000),
      };
      counter++;
      CallBack(JSON.stringify(result));
      if (counter < 10) {
        setTimeout(measureInternal, 100);
      } else {
        CallBack('Done');
      }
    };
    download.onerror = function () {
      if (counter < 10) {
        setTimeout(measureInternal, 100);
      } else {
        CallBack('Done');
      }
    };
    const cacheBuster = '?nnn=' + startTime;
    download.open('GET', imgUrl + cacheBuster, true);
    download.send();
  }
  measureInternal();
}
