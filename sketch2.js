let body=new Array();
let counter=0;
let offx=0,offy=0;
let inp=false;
let speed=10;
let prev;

function food(x,y){
  this.x=x;
  this.y=y;
  this.isVisible=true;

  this.update=function(){
    this.x=random(5,width-5);
    this.y=random(5,height-5);
    this.isVisible=true;
  }

  this.draw=function(){
    if(this.isVisible){
      strokeWeight(0.5);
      fill(color(255,0,0));
      square(this.x,this.y,6);
    }
  }

}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

let boxes={
  x:0,
  y:0,
  col:'blue',
}
//let  = Object.assign({}, boxes);
let copy;

class snake{
  dir='up';
  ox=150;
  oy=150;
  score=0;
  constructor(x,y){
    this.x=x;
    this.y=y;
  }

  move(){
    if(this.dir==='right'){
      //this.x=this.x+0.1*this.speed;
      this.x+=13;
    }
    else if(this.dir==='left'){
      //this.x=this.x-0.1*this.speed;
      this.x-=13;
    }
    else if(this.dir==='up'){
      //this.y=this.y-0.1*this.speed;
      this.y-=13;
    }
    else if(this.dir==='down'){
      //this.y=this.y+0.1*this.speed;
      this.y+=13;
    }
  }

  draw(){
    fill(color('yellow'));
    square(this.x,this.y,12);
  }

  drawBody(s){
    fill(color(s.col));
    square(s.x,s.y,12);
  }

  restart(){
    this.x=this.ox;
    this.y=this.oy;
    this.score=0;
  }

  eat(){
    for(d of dots){
      if(distanc(snak,d)<=9 && d.isVisible==true){
        d.isVisible=false;
        this.score++;
      }
    }
  }

};

let dots=new Array();
let snak=new snake(100,100);

function setup() {
  createCanvas(500, 500);
  for(i=0;i<10;i++){
    dots[i]=new food(0,0);
    dots[i].update();
  }
  //frameRate(10);
}

function draw() {
  stroke(0);
  background(220);
  strokeWeight(3);
  line(2,2,width,2);
  line(2,2,2,height);
  line(width,height,width,2);
  line(0,height,width,height);
  noStroke();
  fill(color(139, 245, 252,100));
  circle(70,width/2,75);
  circle(width-70,width/2,75);
  circle(height/2,70,75);
  circle(height/2,height-70,75);
  fill(color(255,0,0));
  textWidth(20);
  text("Score: "+snak.score,5,17);
  
  let cnt=0;
  for(d of dots){
    d.draw();
    if(!d.isVisible){cnt++;}
  }
  if(cnt==4){
    for(d of dots){
      d.update();
    }
  }

if(counter%speed==0){

  snak.move();
  inp=true;
  //snak.draw();
  snak.eat();

  if(snak.score>0){
    body.reverse();
    let copy = Object.assign({}, boxes);
    copy.x=snak.x+offx;
    copy.y=snak.y+offy;
    body.push(copy);
    body.reverse();
  }
  
  if(body.length>snak.score){
      body.pop();
  }
  //input();
}
  input();
  if(snak.x<=2 || snak.x>=width-4 || snak.y<=2 || snak.y>=height-4){
    //alert("DEAD bruh...");
    snak.restart();
    body.splice(0,body.length);
  }
  for(i=0;i<body.length;i++){
    if(snak.x===body[i].x && snak.y===body[i].y){
      //alert("DEAD bruh...");
      snak.restart();
      body.splice(0,body.length);
    }
  }
  snak.draw();
  noStroke();
  drawQueue();
  counter++;

  if(snak.score===0){
      speed=10;
  }
  if((speed-1)<1){
      speed=speed+1;
  }
  else if((snak.score+1)%11==0 && snak.score!=prev){
      speed-=1;
  }
  if((snak.score+1)%11==0){
    prev=snak.score;
  }
}

function drawQueue(){
    for(i=0;i<body.length;i++){
        snak.drawBody(body[i]);
    }
}

function input(){
    if(inp){
        if(keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)){
            return;
        }
        if((keyIsDown(LEFT_ARROW) || (distanc2(mouseX,mouseY,70,width/2)<=75 && mouseIsPressed)) && snak.dir!='right'){
            snak.dir='left';
            inp=false;
            offx=+13;
            offy=0;
        }
        else if((keyIsDown(RIGHT_ARROW) || (distanc2(mouseX,mouseY,width-70,width/2)<=75 && mouseIsPressed)) && snak.dir!='left'){
            snak.dir='right';
            inp=false;
            offx=-13;
            offy=0;
        }
        else if((keyIsDown(UP_ARROW) || (distanc2(mouseX,mouseY,height/2,70)<=75 && mouseIsPressed))&& snak.dir!='down'){
            snak.dir='up';
            inp=false;
            offy=+13;
            offx=0;
        }
        else if((keyIsDown(DOWN_ARROW) || (distanc2(mouseX,mouseY,height/2,height-70)<=75 && mouseIsPressed))&& snak.dir!='up'){
            snak.dir='down';
            inp=false;
            offx=0;
            offy=-13;
        }
    }
}

function distanc(ob1,ob2){
  let x1=ob1.x+6;
  let y1=ob1.y+6;
  let x2=ob2.x;
  let y2=ob2.y;
  return sqrt(((x2-x1)**2)+((y2-y1)**2));
}

function distanc2(x1,y1,x2,y2){
    return sqrt(((x2-x1)**2)+((y2-y1)**2));
}
