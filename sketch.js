let offset=5;
let q=new Array();
let counter=0;
let c=0;
let offx=0,offy=0;

function food(x,y){
  this.x=x;
  this.y=y;
  this.bh=4;
  this.bw=4;
  this.isVisible=true;

  this.update=function(){
    this.x=random(3,width-3);
    this.y=random(3,height-3);
    this.isVisible=true;
  }

  this.draw=function(){
    if(this.isVisible){
      strokeWeight(0.5);
      fill(color(255,0,0));
      circle(this.x,this.y,5);
    }
  }

}

let boxes={
  x:0,
  y:0,
  col:'blue',
}
//let  = Object.assign({}, boxes);
let copy;

class snake{
  speed=10;
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
      this.x=this.x+0.1*this.speed;
    }
    else if(this.dir==='left'){
      this.x=this.x-0.1*this.speed;
    }
    else if(this.dir==='up'){
      this.y=this.y-0.1*this.speed;
    }
    else if(this.dir==='down'){
      this.y=this.y+0.1*this.speed;
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
      if(distanc(snak,d)<=5 && d.isVisible==true){
        d.isVisible=false;
        this.score++;

      }
    }
  }

};

let dots=new Array();
let snak=new snake(100,100);

function setup() {
  createCanvas(400, 400);
  for(i=0;i<4;i++){
    dots[i]=new food(0,0);
    dots[i].update();
  }
  
}

function draw() {
  
  background(220);
  strokeWeight(3);
  line(2,2,width,2);
  line(2,2,2,height);
  line(width,height,width,2);
  line(0,height,width,height);
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

  snak.move();
  snak.draw();
  snak.eat();
  
  if(counter % 13==0){
    let copy = Object.assign({}, boxes);
    copy.x=snak.x+offx;
    copy.y=snak.y+offy;
    q.push(copy);
  }

  for(i=0;i<q.length-snak.score;i++){
    q.reverse();
    q.pop();
  }
  q.reverse();

  for(i=0;i<q.length;i++){
    snak.drawBody(q[i]);
  }

  input();

  if(snak.x<=2 || snak.x>=width-10 || snak.y<=2 || snak.y>=height-10){
    //alert("DEAD");
    snak.restart();
  }
  for(i=0;i<q.length;i++){
    //console.log(q[i]);
    if(snak.x===q[i].x && snak.y===q[i].y){
      snak.restart();
    }
  }

  counter++;
}

function input(){
  if(keyIsDown(LEFT_ARROW) && snak.dir!='right'){
    snak.dir='left';
    offx=+13;
    offy=0;
  }
  if(keyIsDown(RIGHT_ARROW) && snak.dir!='left'){
    snak.dir='right';
    offx=-13;
    offy=0;
  }
  if(keyIsDown(UP_ARROW) && snak.dir!='down'){
    snak.dir='up';
    offy=+13;
    offx=0;
  }
  if(keyIsDown(DOWN_ARROW) && snak.dir!='up'){
    snak.dir='down';
    offx=0;
    offy=-13;
  }
}

function distanc(ob1,ob2){
  let x1=ob1.x+6;
  let y1=ob1.y+6;
  let x2=ob2.x;
  let y2=ob2.y;
  return sqrt(((x2-x1)**2)+((y2-y1)**2));
}