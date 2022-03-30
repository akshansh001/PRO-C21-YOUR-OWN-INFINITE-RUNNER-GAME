var ground,groundImage;
var boy_running, boy_collided;
var cloudImg,cloudGroup;
var obstacle,obstacleGroup;
var gameOver,restart,restarImg;
var score=0;
var PLAY,END
var gameState=PLAY;
function preload() {
 boy_running=loadImage("running-animated-gif-9.gif")
 boy_collidedImg=loadImage("boy_collided.jpg")
 backgroundImg=loadImage("jason-scheier-animation-background.jpg")
 groundImg=loadImage("ground_png.jpg")
 obstacleImg=loadImage("cartoon-tree-stump-illustration.jpg")
 gameOverImg=loadImage("gameOver.jpg")
 cloudImg=loadImage("1.jpg")
restartImg=loadImage("game-result-restart.png")
}

function setup(){
createCanvas(windowWidth,windowHeight)
boy = createSprite(50,180,20,50);
boy.addImage("running",boy_running)
boy.addImage("collided",boy_collidedImg)
boy.scale=0.7;

ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImg);
ground.x = ground.width /2;
ground.velocityX = -(6 + 3*score/100);

gameOver=createSprite(300,100);
gameOver.addImage(gameOverImg)

restart = createSprite(300,140);
restart.addImage(restartImg);

gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}
function draw(){
    background(backgroundImg);
  text("Score: "+ score, 500,50);
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    boy.changeAnimation("running", boy_running); 
    if(keyDown("space") && boy.y >= 159) {
        boy.velocityY = -12;
      }
      boy.velocityY = boy.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  }
    boy.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(boy)){
        gameState = END;
    }
    else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
    
    ground.velocityX = 0;
    boy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    boy.changeAnimation("collided",boy_collidedImg);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
        reset()
    }
  }
    drawSprites();
}
function spawnClouds() {
     if (frameCount % 60 === 0) {
      var cloud = createSprite(600,120,40,10);
      cloud.y = Math.round(random(80,120));
      cloud.addImage(cloudImg);
      cloud.scale = 0.5;
      cloud.velocityX = -3;
     
     cloud.lifetime = 200;
     cloud.depth = boy.depth;
    boy.depth = boy.depth + 1;
    cloudsGroup.add(cloud);
    }
  }
    function reset(){
        gameState = PLAY;
        gameOver.visible = false;
        restart.visible = false;
        
        obstaclesGroup.destroyEach();
        cloudsGroup.destroyEach();
        score = 0;
      }
      
      function spawnObstacles() {
        if(frameCount % 60 === 0) {
          var obstacle = createSprite(600,165,10,40);
          obstacle.addImage(obstacleImg)
          obstacle.velocityX = -(6 + 3*score/100);
        
        var rand = Math.round(random(1,6));
    
    

      
    
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
        }
    }