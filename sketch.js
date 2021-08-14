var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;



//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.debug=false
//boy.setCollider("rectangle",0,0,50,200)
boy.addAnimation("gameOver",gameOverImg)

  
gameOver=createSprite(200,200,30,40);  



cashG=createGroup();
diamondsG=createGroup();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges)

  gameOver.visible=false

  //code to reset the background
  if(path.y > 400 ){
  path.y = height/2;
  }

  if(jwelleryG.isTouching(boy)) {
    jwelleryG[0].destroy();
    treasureCollection=treasureCollection+50;
  }
  
  if (cashG.isTouching(boy)) {
    cashG[0].destroy();
    treasureCollection=treasureCollection+50;
  }
  
  if (diamondsG.isTouching(boy)) {
    diamondsG[0].destroy();
    treasureCollection=treasureCollection+50;
  }

  if(boy.isTouching(swordGroup)) {
    
    gameState=END 
  }
 
  if(gameState===END){
    path.velocityY = 0
    boy.changeAnimation("gameOver")
    boy.scale=1
    boy.x=200
    boy.y=300
    cashG.destroyEach();
    cashG.setVelocityEach(0);
    treasureCollection=0
    gameOver.visible=true

  }
  
  createCash();
  createDiamonds();
  createJwellery();
  createSword();

  drawSprites();
  textSize(20);
  fill("blue");
  text("Treasure: "+ treasureCollection,150,30);
  }

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 250;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 50 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 250;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 50 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 250;
  jwelleryG.add(jwellery);
  
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 250;
  swordGroup.add(sword);
  
  }
}