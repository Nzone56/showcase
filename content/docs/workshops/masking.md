# Workshop - Masking

## Kernel
In image processing, a kernel, convolution matrix, or mask is a small matrix used for blurring, sharpening, embossing, edge detection, and more. This is accomplished by doing a convolution between the kernel and an image.
## Convolution
Convolution is the process of adding each element of the image to its local neighbors, weighted by the kernel. This is related to a form of mathematical convolution. The matrix operation being performed—convolution—is not traditional matrix multiplication, despite being similarly denoted by *.

For each 3x3 block of pixels in the original image , we multiply each pixel by the corresponding entry of the kernel and then take the sum. That sum becomes a new pixel in the result image.

One subtlety of this process is what to do along the edges of the image. For example, the top left corner of the input image only has three neighbors. One way to fix this is to extend the edge values out by one in the original image while keeping our new image the same size.


## Results

JS CODE
 {{< details title="IMAGE KERNEL CODE " open=false >}}




```js
 A = 0;
B = 0;
C = 0;
D = 0;
E = 1;
F = 0;
G = 0;
H = 0;
I = 0;

kernel = [
  [A, B, C],
  [D, E, -F],
  [G, H, I],
];

function preload() {
  img = loadImage("/showcase/sketches/mandrill.png");
}

function setup() {
  createCanvas(512, 512);
  button = createButton("blackandwhite");
  button.position(540, 150);
  button.mousePressed(blackandwhite);
  button = createButton("Blur");
  button.position(540, 330);
  button.mousePressed(blur);
  button = createButton("Identity");
  button.position(540, 360);
  button.mousePressed(identity);
  button = createButton("Outline");
  button.position(540, 390);
  button.mousePressed(outline);
  button = createButton("Right Sobel");
  button.position(540, 420);
  button.mousePressed(ritsobel);
  button = createButton("Emboss");
  button.position(540, 450);
  button.mousePressed(emboss);
  button = createButton("Bottom Sobel");
  button.position(540, 480);
  button.mousePressed(botsob);
  noLoop();
}
function botsob() {
  clear();
  A = -1;
  B = -2;
  C = -1;
  D = 0;
  E = 0;
  F = 0;
  G = 1;
  H = 2;
  I = 1;
  kernel = [
    [A, B, C],
    [D, E, -F],
    [G, H, I],
  ];
  redraw();
}
function blackandwhite() {
  clear();
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 1;
  F = 0;
  G = 0;
  H = 0;
  I = 0;
  kernel = [
    [A, B, C],
    [D, E, -F],
    [G, H, I],
  ];

  redraw();
}
function outline() {
  clear();
  A = -5;
  B = 4;
  C = 0;
  D = 0;
  E = 2;
  F = 0;
  G = 0;
  H = -1;
  I = 0;
  kernel = [
    [A, B, C],
    [D, E, -F],
    [G, H, I],
  ];
  redraw();
}
function identity() {
  clear();
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 1;
  F = 0;
  G = 0;
  H = 0;
  I = 0;
  kernel = [
    [A, B, C],
    [D, E, -F],
    [G, H, I],
  ];
  redraw();
}

function blur() {
  clear();
  A = 0.0625;
  B = 0.125;
  C = 0.0625;
  D = 0.125;
  E = 0.25;
  F = 0.125;
  G = 0.0625;
  H = 0.125;
  I = 0.0625;
  kernel = [
    [A, B, C],
    [D, E, -F],
    [G, H, I],
  ];
  redraw();
}

function ritsobel() {
  clear();
  A = -32;
  B = 50;
  C = 45;
  D = -81;
  E = 63;
  F = 68;
  G = -68;
  H = 59;
  I = 59;
  kernel = [
    [A, B, C],
    [D, E, -F],
    [G, H, I],
  ];
  redraw();
}

function emboss() {
  clear();
  A = -1.8;
  B = -1;
  C = 0;
  D = -1;
  E = 1.5;
  F = 1.5;
  G = 0.1;
  H = 1.5;
  I = 2.5;
  kernel = [
    [A, B, C],
    [D, E, -F],
    [G, H, I],
  ];
  redraw();
}

function draw() {
  image(img, 0, 0);

  edgeImg = createImage(img.width, img.height);

  edgeImg.loadPixels();

  for (let x = 1; x < img.width - 1; x++) {
    for (let y = 1; y < img.height - 1; y++) {
      let sum = 0;

      for (kx = -1; kx <= 1; kx++) {
        for (ky = -1; ky <= 1; ky++) {
          let xpos = x + kx;
          let ypos = y + ky;
          let pos = (y + ky) * img.width + (x + kx);
          let val = red(img.get(xpos, ypos));
          sum += kernel[ky + 1][kx + 1] * val;
        }
      }
      edgeImg.set(x, y, color(sum, sum, sum));
    }
  }

  edgeImg.updatePixels();
  image(edgeImg, 0, 0);
}


```
{{< /details >}}

Apply image kernel

{{< p5-iframe sketch="/showcase/sketches/imageKernelWK.js" lib1="https://cdn.plot.ly/plotly-2.14.0.min.js" width="735" height="550"  >}}