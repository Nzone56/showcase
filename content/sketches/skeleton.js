let skull;
let clavicle;
let feet;
let femur;
let hand;
let humerus;
let illium;
let radius;
let rib;
let spine;
let tibia;

function preload() {
  skull = loadModel('/showcase/sketches/body/Skull.obj',true);
  spine = loadModel('/showcase/sketches/body/Spine.obj',true);
  clavicle = loadModel('/showcase/sketches/body/Clavivle.obj',true);
  humerus = loadModel('/showcase/sketches/body/Humerus.obj',true);
  radius = loadModel('/showcase/sketches/body/Radius.obj',true);
  hand = loadModel('/showcase/sketches/body/Hand.obj',true);
  rib = loadModel('/showcase/sketches/body/Rib.obj',true);
  illium = loadModel('/showcase/sketches/body/Illium.obj',true);
  femur = loadModel('/showcase/sketches/body/Femur.obj',true);
  tibia = loadModel('/showcase/sketches/body/Tibia.obj',true);
  feet = loadModel('/showcase/sketches/body/Feet.obj',true);

}

function setup() {
  angleMode(DEGREES);
  createCanvas(800, 1600,WEBGL);
  normalMaterial();
  rotate(180)
}

function transObj(m,x=0,y=0,z=0,s=1,r=0){
  scale(s)
  translate(x,y,z)
  rotateZ(r);
  model(m)
  push()
}

function skeleton(){
  
  transObj(skull,0,0,0,1,180)
  
  transObj(spine,0,-120,0,3)
  
  transObj(clavicle,0,95,0,0.5)
  
  transObj(humerus,0,-38,0,1.6)
  
  transObj(radius,0,-75,3,1.4)

  transObj(hand,0,-48,5,1.3)
  
  transObj(rib,0,320,0,0.35)
  
  transObj(illium,0,-200)
  
  transObj(femur,0,-110,10,1.3)
  
  transObj(tibia,0,-170,0,1.1)
  
  transObj(feet,0,-170,50,0.7)
}

function draw() {
  background(220);
  orbitControl();
  
  rotateY(90)
  
  translate(0,-500)
  skeleton()
  
  
}