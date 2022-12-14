p5.disableFriendlyErrors = true;

let obj;
let pixelSize = 8;
let isCircle = true;
let isVid = false;
let vW = 0;
let vH = 0;
let load = "/showcase/sketches/carro.mp4"
let isMute = false;
let isPause = false;

function preload() {
  let ext = load.split(".").pop();
  if (ext === "mp4") {
    isVid = true;
  } else {
    isVid = false;
  }
  if (isVid) {
    obj = createVideo(load);

  } else {
    obj = loadImage(load);
  }
  print(isVid);
}

function setup() {
  print(vW, vH);
  if (isVid) {
    createCanvas(vW, vH);
  } else {
    createCanvas(obj.width, obj.height);
  }
  print(width);
  print(height);
  noStroke();
  background(0);
  if (isVid) {
    obj.loop();
    obj.hide();
  }
}

getVideoDimensionsOf(load).then(({
  width,
  height
}) => {
  vW = width;
  vH = height;
  print("vd" +  " " + vW + " " +vH);
  reset();

});

function reset() {
  createCanvas(vW, vH);
  obj.loop();
  obj.hide();
}

function draw() {
  Pixelate(0, 0, width, height, pixelSize);
}

function keyPressed() {
  if (key === '1') {
    isCircle = !isCircle;
  }
  if (key === ',') {
    pixelSize = max(4, pixelSize - 2);
  }
  if (key === '.') {
    pixelSize = min(50, pixelSize + 2);
  }
  if (key === 'm' || key === 'M') {
    isMute = !isMute;
    if (isVid) {
      if (isMute) {
        obj.volume(0);
      } else {
        obj.volume(1);
      }
    }
  }
  if (key === 'p' || key === 'P') {
    isPause = !isPause;
    if (isVid) {
      if (isPause) {
        obj.pause();
      } else {
        obj.play();
      }
    }
  }
  if (key === ' ') {
  	save("capture_pixel.jpg");
  }
}

function Pixelate(startX, startY, endX, endY, pSize) {
  obj.loadPixels();
  for (let x = startX; x < endX; x += pixelSize) {
    for (let y = startY; y < endY; y += pixelSize) {
      let offset = ((y * width) + x) * 4;
      if (isCircle) {
        let dim = 80;
        fill(obj.pixels[offset] - dim, obj.pixels[offset + 1] - dim, obj.pixels[offset + 2] - dim);
        rect(x, y, pSize, pSize);
        fill(obj.pixels[offset], obj.pixels[offset + 1], obj.pixels[offset + 2]);
        ellipse(x + pSize / 2, y + pSize / 2, pSize, pSize);
      } else {
        fill(obj.pixels[offset], obj.pixels[offset + 1], obj.pixels[offset + 2]);
        rect(x, y, pSize, pSize);
      }
    }
  }
}

function unPixelate() {
  background(0);
  image(obj, 0, 0);
}

/**

 @param {String} url
 @return {Promise}
 */
function getVideoDimensionsOf(url) {
  return new Promise(function(resolve) {
    let video = document.createElement('video');

    video.addEventListener("loadedmetadata", function() {
      let height = this.videoHeight;
      let width = this.videoWidth;
      resolve({
        height: height,
        width: width
      });
    }, false);
    video.src = url;
  });
}
