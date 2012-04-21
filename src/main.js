function startGame() {
    var gs = new JSGameSoup("surface", 30);
    gs.include("src/level.js", function(url) {
	createLevel(gs);
	gs.include("src/player.js", function(url) {
	    gs.addEntity(Player(gs));
	    gs.launch();
	});
    });
}