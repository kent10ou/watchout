// start slingin' some d3 here.


var gameOptions = {
	height: 800,
	width: 1000,
	numEnemies: 2,
	padding: 20,
}

var gameStats = {
	score: 0,
	bestScore: 0,
	collision: 0
}

//var hesTouching = false;

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
			id: i,
			touching: false
		})
	}
	return results;
}

var enemies = createEnemies();

// place enemies on gameBoard
/*gameBoard.selectAll('.gameBoard').data(enemies)
	.enter().append('svg:image')
	.attr("xlink:href", "http://www.elisa-poli.it/studionora/images/pacman-2.gif")
	.attr('height', 50)
	.attr('width', 50)
	.attr('x', function (d) { return axes.x(d.x) })
	.attr('y', function (d) { return axes.y(d.y) })
	.attr('class', 'enemy')
*/
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

var enemySpeed = 1500
setInterval(function () {
	var newEnemiesPos = createEnemies();
	var enemiesSelection = gameBoard.selectAll('.enemy').data(newEnemiesPos)
	
	enemiesSelection
		.enter().append('svg:image')
		.attr("xlink:href", "http://www.elisa-poli.it/studionora/images/pacman-2.gif")
		.attr('height', 50)
		.attr('width', 50)
		.attr('x', function (d) { return axes.x(d.x) })
		.attr('y', function (d) { return axes.y(d.y) })
		.attr('class', 'enemy')
	
//transition
	enemiesSelection
		.transition()
		.attr('x', function (d) { return axes.x(d.x) })
		.attr('y', function (d) { return axes.y(d.y) })
		.duration(enemySpeed)

	enemiesSelection
		.exit().remove()	
}, enemySpeed)



setInterval(function () {
	var newPlayerPos = createPlayer();
	gameBoard.selectAll('.player').data(newPlayerPos)
		.transition()
		.attr('x', function (d) { return d.x - 25 })
		.attr('y', function (d) { return d.y - 25})
		.duration(0)

	gameBoard.selectAll(".enemy").each( function(d, i){
		var xp = mouseLoc[0] - 25//axes.x.invert(mouseLoc[0]);
		var yp = mouseLoc[1] - 25//axes.y.invert(mouseLoc[1]);
		var xe = d3.select(this).attr('x')//d.x;
		var ye = d3.select(this).attr('y')//d.y;
		var touching = d.touching;
		var a = xe - xp;
		var b = ye - yp;
		var c = Math.pow(a, 2) + Math.pow(b, 2);
		c = Math.sqrt(c);

		
		if (c > 50){
			//console.log('COLLISION!!');
			d.touching = false;
			gameStats.score++;

		} else {
			if (!touching) {
				gameStats.collision++;
				d.touching = true;
				if (gameStats.score > gameStats.bestScore) {
					gameStats.bestScore = gameStats.score
				}
			}
			gameStats.score = 0;
		}
	d3.selectAll('.current').select("span").text(gameStats['score'])
	d3.selectAll('.collisions').select("span").text(gameStats['collision'])
	d3.selectAll('.high').select("span").text(gameStats['bestScore'])	
		//console.log(c);
		//console.log(d);
		//console.log('mouseLoc: ', axes.x.invert(mouseLoc[0])
		//console.log(c);
	});



}, 0)

gameBoard.on('mousemove', function () {  
   mouseLoc = d3.mouse(this);
});

d3.select('.addEnemies').on('click', function () {
	gameOptions.numEnemies++;
	console.log('addEnemies: ', gameOptions.numEnemies)
})

d3.select('.minusEnemies').on('click', function () {
	gameOptions.numEnemies--;
	console.log('minusEnemies: ', gameOptions.numEnemies)
})


// loop through all the enemies, and store their positions into a variable

//gameBoard.selectAll('rect')
	






