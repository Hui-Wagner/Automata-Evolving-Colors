const automata = new Automata(100);

window.onload = function () {
	const canvas = document.getElementById('gameWorld');
	const ctx = canvas.getContext('2d');
	const engine = new GameEngine();

	// Attach event listeners to the buttons
	document.getElementById('plant').addEventListener('click', function() {
		automata.addPlant();
	});

	document.getElementById('animat').addEventListener('click', function() {
		automata.addAnimat();
	});

	document.getElementById('clear').addEventListener('click', function() {
		automata.clear();
	});

	// Attach event listeners to the sliders
	document.getElementById('plantgrowth').addEventListener('change', function(event) {
		automata.plantGrowth = Number(event.target.value);
	});

	document.getElementById('animatgrowth').addEventListener('change', function(event) {
		automata.animatGrowth = Number(event.target.value);
	});

	document.getElementById('animatselection').addEventListener('change', function(event) {
		automata.animatFoodSelectivity = Number(event.target.value);
	});

	engine.init(ctx);
	engine.start();

	engine.addEntity(automata);
};



