//str.trim();
//baseVano["libro"][index]["ISSUU"];

var ancho = window.innerWidth;
var alto = window.innerHeight;

//var libros = baseVano["libro"].length+1;
var libros = 15;
var anchoC = ancho / libros;
var altoC = alto / anchoC;
var cuantos = anchoC * altoC;
console.log(ancho+"  "+anchoC+"   "+altoC+"   "+cuantos);

var index = 0;
var clases = [];

var tiempo = 0;

var z = 1;

$("body").css("background-size",anchoC+"px");




function seq(){
	tiempo++;
	if(tiempo >= 1){
		avance(clases[parseInt(Math.random()*clases.length)], Math.random());
		tiempo = 0;	
	}
}

setInterval(seq,250);

for(var i = 0; i < baseVano["libro"].length; i++){
	var nombre = baseVano["libro"][i]["Autor"];
	nombre = nombre.replace(/ /g, "");
	var clase = nombre+"-"+i;
	clases.push(clase); 
}
console.log(clases);

for(var i = 0; i < cuantos; i++){
	
	if(index >= baseVano["libro"].length){
		index = 0;
	}
	$("body").append("<div></div>");	
	$("body > div").last().addClass(clases[index]);
	$("."+clases[index]).css("background-image", "url("+baseVano["libro"][index]["Cover"]+")");	
	index++;
}

var cajas = 0;
for(var i = 0; i < libros; i++){
	for(var j = 0; j < libros; j++){
		cajas++;
		$("body > div").eq(cajas).css({
			"top": i*anchoC+"px",
			"left": j*anchoC+"px",
		});
		$("body > div").eq(cajas).addClass("a"+j);
		$("body > div").eq(cajas).addClass("b"+i);
	}
}
cajas = 0;

$("body > div").css({
	"height": anchoC+"px",
	"width": anchoC+"px",
});
$("body").css("overflow", "hidden");

$("body").append("<div id='logo_vano'></div>");
$("#logo_vano").css({
	"position":"absolute",
	"top":"0",
	"left":anchoC+"px",
	"width":anchoC*3+"px",
	"height":anchoC*3+"px",
	"background-image":"url('logoBoton.jpg')",
	"z-index":"9999"
});

function avance(_clase, _left){
	var aPx = "+="+anchoC+"px";
	var _aPx = "-="+anchoC+"px";
	var indexClass = parseInt(libros-(Math.random()*libros));
	var cajaClass;
	z++;
	
	if(Math.random() > 0.5){
		cajaClass = $(".a"+indexClass);	
	}else{
		cajaClass = $(".b"+indexClass);
	}
	for(var i = 0; i < cajaClass.length/2; i++){
		var caja = cajaClass.eq(i*2);
		caja.css("z-index", z+"");
		if(_left < 0.25){
			caja.animate({
				top : aPx
			},700);
		}else if(_left < 0.5){
			caja.animate({
				left : aPx
			},700);
		}else if(_left < 0.75){
			caja.animate({
				top : _aPx
			},700);
		}else if(_left > 0.75){
			caja.animate({
				left : _aPx
			},700);
		}
	}
};


var clicks = 0;
/*
$("div").click(function(){
	//console.log("yeah");
	//avance(clases[parseInt(Math.random()*clases.length)], Math.random());
	if(clicks == 0){
		$("body > div").css({
			"position":"static",
			"float":"left"
		});
	}
	if(clicks == 1){
		$("body > div").css({
			"position":"absolute"
		});
		clicks = 0;
	}
	clicks++;
})
*/
$("body > div").click(function(){
	if($(this).attr("id") != "logo_vano"){
		
	
	var classClicked = $(this).attr("class");
	var spl = classClicked.split(" ");
	classClicked = spl[0];
	var classInfo = classClicked.split("-");
	var pos = classInfo[1];
	classClicked = classInfo[0];
	
	var posX = $(this).css("left");
	var posY = $(this).css("top");
	
	crearInfoDiv(pos,posX,posY);
	}
});


function crearInfoDiv(_index,_posX,_posY){
    $("#libroActivo").remove();
    $("#info-box").remove();
    $("body").append("<a id='libroActivo' target='_blank'></a>");
    
	
	
	//let url = baseVano["libro"][_index]["ISSUU"];
    //let splitUrl = url.split("/");
    //url = "libros/libro.html?book="+splitUrl[splitUrl.length-1];
	
	let url =  "libros/libro.html?book=" + baseVano["libro"][_index]["Archive.embed"];
    // ejemplo QueCaiganPorSuPropioPesoNetoVanoEditorial
	$("#libroActivo").attr("href",url);
	$("#libroActivo").append("<div id='info-box'></div>");
    
    
    
	$("#info-box").css({
		"background-image": "url("+baseVano["libro"][_index]["Cover"]+")",
		"top":_posY,
		"left":_posX,
		"width": (anchoC*4)+"px",
		"height": (anchoC*4)+"px",
        "cursor": "pointer"
		});
	var titulo = "<h1>"+baseVano["libro"][_index]["Titulo"]+"</h1>";
	var autor = "<h3>"+baseVano["libro"][_index]["Autor"]+"</h3>";
	$("#info-box").append(titulo+autor);
    
}



/*
$("#logo_vano").click(function(){
    $("#libroActivo").remove();
	$("#info-box").remove();
    $("body").append("<a id='libroActivo' target='_blank' href='#'></a>");
	$("#libroActivo").append("<div id='info-box'></div>");
    $("#libroActivo").attr("href","https://www.facebook.com/vanoeditorial/");
	$("#info-box").css({
		"background-color": "black",
        "background-image": "url('fb.jpg')",
		"background-size": "50%",
		"background-position": "center bottom",
		"top":"0",
		"left": anchoC+"px",
		"width": (anchoC*4)+"px",
		"height": (anchoC*4)+"px",
        "cursor": "pointer"
		});
	
	var titulo = "<h3>Pública en VanoEditorial: </h3>";
	var autor = "<a href='convocatoria20172018.html'><h1 id='convocatoria'>Convocatoria 2017 / 2018 </h1></a>";
	$("#info-box").append(titulo);
	$("#info-box").append(autor);
	
    //var iframeee = "<iframe src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fvanoeditorial%2F&tabs&width="+anchoC*4+"&height="+anchoC*4+"&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&appId=1913892452167477' width='"+anchoC*4+"' height='"+anchoC*4+"' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true'></iframe>";
	//$("#info-box").append("");
});
*/





