// temporary, need to change this to an object too (probably)
var createLevel = function(gs, spec) {
    var name = spec.name;
    var currentRoom = null;
    var player = null;

    var i;

    var rooms = createRooms(gs, spec.rooms);

    for (i = 0; i < rooms.length; i += 1) {
	if (rooms[i].isLevelStart()) {
	    currentRoom = rooms[i];
	    break;
	}
    }

    if (currentRoom === null) {
	throw "Unable to find level start";
    }

    activateRoom(gs, null, currentRoom);

    player = Player(gs);
    gs.addEntity(player);
    gs.launch();

    var update = function() {
	collide.aabb([player], currentRoom.getBlocks());
    };

    gs.addEntity({
	update: update
    });
};

var createRooms = function(gs, blueprint) {
    var i;
    var room,
	rooms = [];

    for (i = 0; i < blueprint.length; i += 1) {
	room = Room(blueprint[i]);
	rooms.push(room);
    }

    return rooms;
};

var activateRoom = function(gs, currentRoom, newRoom) {
    var blocks = [];
    var i;

    if (currentRoom !== null) {
	blocks = currentRoom.getBlocks();
	for (i = 0; i < blocks.length; i += 1) {
	    gs.delEntity(blocks[i]);
	}
    }

    blocks = newRoom.getBlocks();
    for (i = 0; i < blocks.length; i += 1) {
	gs.addEntity(blocks[i]);
    }
};

var Room = function(roomData) {
    var blocks = [];
    var i = 0;
    var temp_block;

    var tiles = roomData.tiles;

    for (i = 0; i < tiles.length; i += 1) {
	temp_block = Block(tiles[i]);
	blocks.push(temp_block);
    }

    return {
	getBlocks: function() {
	    return blocks;
	},
	getName: function() {
	    return roomData.name;
	},
	isLevelStart: function() {
	    return roomData.levelStart;
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