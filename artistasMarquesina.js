var separacion;
var disY;
var cuantos;
var cuantosDatos;
var alto;
var todosLosNombres = [];

function setup(){
	separacion = 40;
	disY = 0;
	alto = $("#con2017").height();
	cuantosDatos = baseVano["libro"].length;
	cuantos = alto / separacion;
	createCanvas(300, alto);
	
	//	baseVano["libro"][i]["Autor"];
	for(var i = 0; i < cuantos; i++){
		var datos = baseVano["libro"][i%cuantosDatos]["Autor"] +" "+ baseVano["libro"][i%cuantosDatos]["Titulo"];
		
		todosLosNombres.push(new t(10,disY,datos,0.5));
		disY += separacion;
	}
}
function draw(){
	background(255);
	fill(220);
	for(var i = 0; i < todosLosNombres.length;i++){
		todosLosNombres[i].move();
		todosLosNombres[i].show();
	}
	
}

function t(_posX,_posY,_nombre, _vel){
	// al esteban le gusta el pene
	this.x = _posX;
	this.y = _posY;
	this.vel = _vel;
	this.nombre =  _nombre;
	this.show = function(){
		text(this.nombre, this.x, this.y);
	}
	this.move = function(){
		this.y += this.vel;
		if(this.y > alto){
			this.y = 0;
		}
	}
}