// start slingin' some d3 here.


var gameOptions = {
	height: 450,
	width: 700,
	numEnemies: 30,
	padding: 20,
}

var gameStats = {
	score: 0,
	bestScore: 0
}

var gameBoard = d3.select('.gameboard').append('svg:svg')
	.attr('width', gameOptions.width)
	.attr('height', gameOptions.height)
	.style({'border': 'solid 1px black', 'background-color': 'blue'})

// creating x and y plane on gameBoard
var axes = {
	x: d3.scale.linear().domain([0,100]).range([0, gameOptions.width]),
	y: d3.scale.linear().domain([0,100]).range([0, gameOptions.height])
}

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
gameBoard.selectAll('rect').data(enemies)
	.enter().append('rect')
	.attr('width', 10)
	.attr('height', 10)
	.attr('x', function (d) { return axes.x(d.x) })
	.attr('y', function (d) { return axes.y(d.y) })
	.style({'fill': 'yellow'})

var createPlayer = function () {
	var playerArr = [];
	playerArr.push({
		x: 50,
		y: 50,
		id: "player"
	})
	return playerArr;
}

// place player on gameBoard
var player = createPlayer();

gameBoard.selectAll('circle').data(player)
	.enter().append('circle')
	.attr('cx', function (d) { return axes.x(d.x)})
	.attr('cy', function (d) { return axes.y(d.y)})
	.attr('r', 5)



setInterval(function () {
	var newEnemiesPos = createEnemies();
	gameBoard.selectAll('rect').data(newEnemiesPos)
		.transition()
		.attr('x', function (d) { return axes.x(d.x) })
		.attr('y', function (d) { return axes.y(d.y) })
		.duration(2000)
}, 2000)

