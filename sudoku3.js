var numSelected = null;
var titleSelected = null;

var vitoria = false;
var pontos = 2000;
var tempo = 0;
var erros = 0;
var errors = 0;

var board = [
	"--74916-5",
	"2---6-3-9",
	"-----7-1-",
	"-586----4",
	"--3----9-",
	"--62--187",
	"9-4-7---2",
	"67-83----",
	"81--45---"
]

var solution = [
	"387491625",
	"241568379",
	"569327418",
	"758619234",
	"123784596",
	"496253187",
	"934176852",
	"675832941",
	"812945763"
]

/*
window.onload = function(){
	setGame();
	setInterval(contarSegundos, 1000);
}
*/

function startGame(){
	setGame();
	setInterval(contarSegundos, 1000);
	
	document.getElementById("button").className = 'display-none';
	document.getElementById("score").className = 'display-none';
	document.getElementById("board").className = 'board';
	document.getElementById("digits").className = 'digits';
}

var contador = 0;

function setGame(){


	//Digits 1-9
	for(let i = 1; i <=9 ; i++){
		let number = document.createElement("div");
		number.id = i;
		number.innerText = i;
		number.addEventListener("click", selectNumber);
		number.classList.add("number");
		document.getElementById("digits").appendChild(number);
	}

	// board 9x9
	for(let r = 0; r < 9; r++){
		for(let c = 0; c < 9; c++){
			let tile = document.createElement("div");
			tile.id = r.toString() + "-" + c.toString();
			if(board[r][c] != "-"){
				contador += 1;
				tile.innerText = board[r][c];
				tile.classList.add("tile-start");
			}
			if(r == 2 || r == 5){
				tile.classList.add("horizontal-line");
			}
			if(c == 2 || c == 5){
				tile.classList.add("vertical-line");
			}
			tile.addEventListener("click", selectTile);
			tile.classList.add("tile");
			document.getElementById("board").append(tile);

		}
	}

}

function selectNumber(){
	if(numSelected != null){
		numSelected.classList.remove("number-selected");
	}
	numSelected = this;
	numSelected.classList.add("number-selected");
}

function selectTile(){
	if(this.innerText != ""){
		return;
	}


	// 0-0
	let coords = this.id.split("-"); //["0", "0"]
	let r = parseInt(coords[0]);
	let c = parseInt(coords[1]);

	if (solution[r][c] == numSelected.id){
		this.innerText = numSelected.id;
		this.classList.add("tile-start");;

		contador += 1;
		if(contador == 81){
			vitoria = true;
			tempo = document.getElementById('time').innerText;
			erros = document.getElementById('errors').innerText;
			erros = erros.replace('x', '');
			contarPontos(tempo, erros);

			//alert('você ganhou!' + document.getElementById("time").innerText);
			swal({
				icon: 'trofeu.png',
			  	title: 'Vitória!',
			  	content: {
				    element: "input",
				    attributes: {
				      placeholder: "Digite seu nome",
				      type: "text",
				    },
				},
				closeOnClickOutside: false,
			})
			.then((value)=>{
				if(value == ''){
					value = 'Jogador sem nome';
				} 
				window.location.href = "sudoku.php?acao=inserir&nome=" + value + "&tempo=" + tempo + "&erros=" + erros + "&pontos=" + pontos;
			});
		}

		console.log(contador)
	}
	else{
		errors += 1;
		document.getElementById("errors").innerText = "x" + errors;
	}
}

function contarSegundos(){
    var seconds = parseInt(document.getElementById("seconds").innerText) + 1;
    var minutes = parseInt(document.getElementById("minutes").innerText);
    
    if(vitoria == false){
    	if(seconds == 60){
	    	seconds = 0;
	    	minutes += 1;
	    	if(minutes < 10){
	    		document.getElementById("minutes").innerText = '0' + minutes;
	    	}else{
	    		document.getElementById("minutes").innerText = minutes;
    		}
    	}

	    if(seconds < 10){
	    	document.getElementById("seconds").innerText = '0' + seconds;	
	    }else{
	    	document.getElementById("seconds").innerText = seconds;	
	    }
    }
    
}

function contarPontos(tempo, erros){

	let contarTempo = tempo.split(":");
	var contarMinutos = parseInt(contarTempo[0]) * 60;
	var contarSegundos = parseInt(contarTempo[1]);

	var contarErros = erros.replace('x', '');
	contarErros = parseInt(contarErros) * 5;

	var pontosPerdidos = contarMinutos + contarSegundos + contarErros;

	pontos -= pontosPerdidos;
	console.log(pontos);

}
