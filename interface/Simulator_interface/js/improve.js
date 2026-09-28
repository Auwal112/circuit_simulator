class Terminal{
  constructor(type,component,x,y){
    this.posx=x;
    this.posy=y;
    this.type=type;
    this.component=component
  }
  draw() {
        ctx.beginPath();
         ctx.arc( this.posx,
                this.posy,
                5,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.fillText(
                this.type,
                this.posx ,
                this.posy
            );
    }
}
class Component{
  constructor(type){
    this.posx=150;
    this.posy=200;
    this.type=type;
   // this.id=nextId++;
  }
  input_terminal(){}
  output_terminal(){}
  draw(){}
drawTerminals() {

        for (let terminal of this.terminals) {

            ctx.beginPath();

            ctx.arc(
                terminal.x,
                terminal.y,
                5,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.fillText(
                terminal.name,
                terminal.x - 5,
                terminal.y - 10
            );
        }
    }
}

class Resistor extends Component{
  constructor(type,resistance){
    super(type);
    this.resistance=resistance;
    this.in=new Terminal("p",this,this.posx,this.posy+20);
    this.out=new Terminal("n",this,this.posx+80,this.posy+20);
  }
  input_terminal(){
    return this.in
  }
  output_terminal(){
    return this.out
  }
  draw(){
    ctx.beginPath();
    let x=this.posx;
    let y=this.posy;

            ctx.moveTo(x + 5, y + 20);

            ctx.lineTo(x + 15, y + 20);

            ctx.lineTo(x + 20, y + 10);
            ctx.lineTo(x + 30, y + 30);
            ctx.lineTo(x + 40, y + 10);
            ctx.lineTo(x + 50, y + 30);
            ctx.lineTo(x + 60, y + 10);
            ctx.lineTo(x + 65, y + 20);

            ctx.lineTo(x + 75, y + 20);

            ctx.stroke();
            this.in.draw();
            this.out.draw();
  }
}
class Battery extends Component{
  constructor(type,volt){
    super(type);
    this.volt=volt;
    this.in=new Terminal("n",this,this.posx+5,this.posy+20);
    this.out=new Terminal("p",this,this.posx+75,this.posy+20);
  }
  input_terminal(){
    return this.in
  }
  output_terminal(){
    return this.out
  }
  draw(){
   let  x=this.posx;
   let y=this.posy;
   ctx.moveTo(x+10,y+20);
   ctx.lineTo(x+30,y+20)
   
   ctx.moveTo(x + 30, y + 10);
   ctx.lineTo(x + 30, y + 30);

   ctx.moveTo(x + 40, y + 5);
   ctx.lineTo(x + 40, y + 35);
   
   ctx.moveTo(x+40,y+20);
   ctx.lineTo(x+70,y+20)
            ctx.stroke();

            ctx.fillText("+", x + 55, y + 15);
            ctx.fillText("-", x + 18, y + 15);
            this.in.draw();
            this.out.draw();
  }
}

class LED extends Component{
  constructor(type,limit){
    super(type);
    this.current_limit=limit
    this.in=new Terminal("p",this,this.posx,this.posy+20);
    this.out=new Terminal("n",this,this.posx+80,this.posy+20);
  }
  input_terminal(){
    return this.in
  }
  output_terminal(){
    return this.out
  }
  draw(){
   let  x=this.posx;
   let  y=this.posy;
    ctx.beginPath();
            ctx.arc(x + 40,y + 20,18, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            //terminal line
            ctx.moveTo(x,y+20);
            ctx.lineTo(x+23,y+20)
            //cross
            ctx.moveTo(x + 30, y + 10);
            ctx.lineTo(x + 50, y + 30);
            ctx.moveTo(x + 50, y + 10);
            ctx.lineTo(x + 30, y + 30);
            //terminal line
            ctx.moveTo(x+58,y+20);
            ctx.lineTo(x+80,y+20)
            ctx.stroke();
            this.in.draw();
            this.out.draw();
  }
}
let r=new Resistor("r1",5);

let l=new LED("l1");
let b=new Battery("v1",5);






const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let tool = "battery";

let components = [];
let wires = [];

let selectedComponent = null;
let wireStart = null;

let nextId = 1;


components.push(l)
draw();



function draw() {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
   // drawGrid();
   // drawWires();
    for (let component of components) {
        component.draw();
    }
 /*   if (wireStart !== null) {
        ctx.beginPath();
        ctx.arc(
            wireStart.x,
            wireStart.y,
            8,
            0,
            Math.PI * 2
        );
        ctx.stroke();
    }*/
}
