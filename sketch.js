//Project 30
//Viyath Wanninayake
//02/02/2021

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var dog,dog1
var happyDog
var database
var foodS = 20;
var foodStock
var log
var x = 150
var b = 10;
var milk = [];
var feed, addFood, foodObj
var bedroom, bathroom, garden
var fedTime, lastFed
var bedroomb, bathroomb, gardenb
var gameState = 0

function preload(){
  //Load images for the dog
  dog1 = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  bedroom = loadImage("bedroom.jpeg");
  bathroom = loadImage("bathroom.jpeg");
  garden = loadImage("garden.jpg")
}

function setup() {
  createCanvas(500, 500);
  //Create the database
  database = firebase.database();
  //Get that database values of food
  foodStock = database.ref("foodS");
  foodStock.on("value",readStock);
  //Create a dog sprite and add an image to it
  dog = createSprite(300,300,20,20);
  dog.scale = 0.3
  dog.addImage(dog1);

  // d = new food(0,50,foodStock,b);
  for (var k = 20;k<=450;k = k+22){ 
    milk.push(new food(k,150,50,50,foodStock,b));
    console.log(milk);
  }
  feed = createButton("Feed the dog");
  feed.position(175,100);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(185,175);
  addFood.mousePressed(addFoods);

  var bedroomb = createButton("Bedroom");
bedroomb.position(100,300);
if (bedroomb.mousePressed(function(){
  background(bedroom);
}));

var bathroomb = createButton("Bathroom");
bathroomb.position(100,400);
if (bathroomb.mousePressed(function(){
  background(bathroom);
}));

var gardenb = createButton("Garden");
gardenb.position(100,350);
if (gardenb.mousePressed(function(){
  background(garden);
}));

  readState = database.ref("gameState");
  readState.on("value",function(data){
    gameState = data.val();
  })
 
}

function draw() {
  rectMode(CENTER);
  x = x-1;
  
// if (gamestateb === 1){
//   background(150);
// }
  fill("white");
  textSize(20);
  //Add a text showing what to do and the amount of food
  text("Note : Press Up Arrow Key To Feed Shadow Milk!",20,30);
  text("Food: "+foodS,180,80);
  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  // if (lastFed===12){
    text("Last Feed:"+ lastFed + "PM",150,100);
  // }
  drawSprites();
  dog.display();
  // d.display();
  //Decrease the amount of food when the up arrow key is pressed
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    if (foodS===0){
      foodS = 0;
    }else{
      foodS = foodS-1;
      milk.shift();
    }
  }
  for (var j = 0;j<milk.length;j++){
    milk[j].display();
}
}
//Read and write the values
function readStock(data){
  foodS = data.val(); 
}

function writeStock(x){
  
database.ref("/").update({
   Food:x
})
}

function feedDog(){
  dog.addImage(happyDog);

  writeStock(foodS);
  dog.addImage(happyDog);
  if (foodS===0){
    foodS = 0;
  }else{
    foodS = foodS-1;
    milk.shift();
  }
}

function addFoods(){
  writeStock(foodS);
  foodS=foodS+1;
  database.ref("/").update({
    Food:foodS
  })
}

function backbathroom(){
  background(bathroom);
}

function backbedroom(){
  background(bedroom)
}

function backkitchen(){
  background(kitchen);
}
