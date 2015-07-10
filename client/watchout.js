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
	.style({'border': 'solid 1px black'})

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
	return results
}

var Enemies = createEnemies();

gameBoard.selectAll('rect').data(Enemies)
	.enter().append('svg:rect')
	.attr('width', 10)
	.attr('height', 10)
	.attr('x', function (d) { return axes.x(d.x) })
	.attr('y', function (d) { return axes.y(d.y) })
	



