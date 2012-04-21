// temporary, need to change this to an object too (probably)
var createLevel = function(gs) {
    var tiles = [
	[0, 0, gs.width, 20],
	[0, 0, 20, gs.height],
	[0, gs.height-20, gs.width, gs.height],
	[gs.width-20, 0, gs.width, gs.height]
    ];
    var firstroom = Room(gs, tiles);
    var player = null;

    gs.include("src/player.js", function(url) {
	player = Player(gs);
	gs.addEntity(player);
	gs.launch();
    });
};

var Room = function(gs, tiles) {
    var blocks = [];
    var i = 0;
    var temp_block;

    for (i = 0; i < tiles.length; i += 1) {
	temp_block = Block(tiles[i]);
	blocks.push(temp_block);
	gs.addEntity(temp_block);
    }

    return {
	getBlocks: function() {
	    return blocks;
	}
    };
};

var Block = function(tile) {
    var origin = {
	x: tile[0],
	y: tile[1]
    };
    var bounds = {
	x: tile[2],
	y: tile[3]
    };

    var draw = function(c) {
	c.fillRect(origin.x, origin.y, bounds.x, bounds.y);
    };

    var get_collision_aabb = function() {
	return [origin.x, origin.y, bounds.x, bounds.y];
    };

    return {
	draw: draw,
	get_collision_aabb: get_collision_aabb
    };
};