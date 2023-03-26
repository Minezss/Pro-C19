var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,200,20,20);
  ghost.addImage("ghost", ghostImg); 
  ghost.scale = 0.3
  ghost.debug = false

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
    if(tower.y > 400){
        tower.y = 300
      }

      if(keyDown("space")){
        ghost.velocityY = -10;
      }

      if(keyDown("left_arrow")){
        ghost.velocityX = ghost.velocityX - 1;
      }

      if(keyDown("right_arrow")){
        ghost.velocityX = ghost.velocityX + 1;
      }

      ghost.velocityY = ghost.velocityY + 0.6
    

     if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
     }

     if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
     }

    spawnDoor();

    drawSprites();
}

function spawnDoor(){
  if (frameCount % 150 === 0){
    var door = createSprite(random(100,500),0);
    door.addImage(doorImg);
    door.velocityY = 3;
    doorsGroup.add(door);
    door.lifetime = 800

    var climber = createSprite(door.x,door.y+70);
    climber.addImage(climberImg);
    climber.velocityY = 3;
    climbersGroup.add(climber);
    climber.lifetime = 800;

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    var invisibleBlock = createSprite(door.x,climber.y+10,90,5)
    invisibleBlock.velocityY = 3;
    invisibleBlock.visible = false
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.lifetime = 800;
    invisibleBlock.debug = false



  }


}