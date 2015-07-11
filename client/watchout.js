// start slingin' some d3 here.


var gameOptions = {
	height: 1000,
	width: 1000,
	numEnemies: 5,
	padding: 20,
}

var gameStats = {
	score: 0,
	bestScore: 0
}

var gameBoard = d3.select('.gameboard').append('svg:svg')
	.attr('width', gameOptions.width)
	.attr('height', gameOptions.height)
	.style({'border': 'solid 1px black', 
			'background-image': 'url("https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSYwb0HbAoVu-9yGoGLBeKl8eLNQMSwpyqkCClMPuGtGawwAPcf")'
	})

// creating x and y plane on gameBoard
var axes = {
	x: d3.scale.linear().domain([0,100]).range([0, gameOptions.width]),
	y: d3.scale.linear().domain([0,100]).range([0, gameOptions.height])
}

var mouseLoc = [500, 500]; 


var createEnemies = function () {
	var results = [];
	for (var i = 0; i < gameOptions.numEnemies; i++) {
		results.push({
			x: Math.random() * 100,
			y: Math.random() * 100,
			id: i
		})
	}
	return results;
}

var enemies = createEnemies();

// place enemies on gameBoard
gameBoard.selectAll('.gameBoard').data(enemies)
	.enter().append('svg:image')
//	.attr('width', 20)
//	.attr('height', 20)
//	.style({'fill': 'blue'})
	.attr("xlink:href", "http://www.elisa-poli.it/studionora/images/pacman-2.gif")
	.attr('height', 50)
	.attr('width', 50)
	.attr('x', function (d) { return axes.x(d.x) })
	.attr('y', function (d) { return axes.y(d.y) })
	.attr('class', 'enemy')

var createPlayer = function () {
	var playerArr = [];
	playerArr.push({
		x: mouseLoc[0],
		y: mouseLoc[1],
		id: "player"
	})
	return playerArr;
}

// place player on gameBoard
var player = createPlayer();

gameBoard.selectAll('.gameBoard').data(player)
	.enter().append('svg:image')
//	.attr('cx', function (d) { return axes.x(d.x)})
//	.attr('cy', function (d) { return axes.y(d.y)})
//	.attr('r', 7.5)
//	.style({'fill': 'yellow'})
	.attr("xlink:href", "http://files.softicons.com/download/game-icons/classic-games-icons-by-thvg/png/512/Pacman%201.png")
	.attr('height', 50)
	.attr('width', 50)
	.attr('x', 500)
	.attr('y', 500)
	.attr('class', 'player')

setInterval(function () {
	var newEnemiesPos = createEnemies();
	gameBoard.selectAll('.enemy').data(newEnemiesPos)
		.transition()
		.attr('x', function (d) { return axes.x(d.x) })
		.attr('y', function (d) { return axes.y(d.y) })
		.duration(1500)
}, 1500)

setInterval(function () {
	var newPlayerPos = createPlayer();
	gameBoard.selectAll('.player').data(newPlayerPos)
		.transition()
		.attr('x', function (d) { return d.x - 25 })
		.attr('y', function (d) { return d.y - 25})
		.duration(0)

	gameBoard.selectAll(".enemy").each( function(d, i){
		var xp = axes.x.invert(mouseLoc[0]);
		var yp = axes.y.invert(mouseLoc[1]);
		var xe = d.x;
		var ye = d.y;

		var a = xe - xp;
		var b = ye - yp;
		var c = Math.pow(a, 2) + Math.pow(b, 2);
		c = Math.sqrt(c);

		if(c < 10){
			console.log('COLLISION!!');
		}
		//console.log(c);
		//console.log(d);
		//console.log('mouseLoc: ', axes.x.invert(mouseLoc[0]));
	});

}, 0)


gameBoard.on('mousemove', function () {  
   mouseLoc = d3.mouse(this);
});

// loop through all the enemies, and store their positions into a variable

//gameBoard.selectAll('rect')
	






