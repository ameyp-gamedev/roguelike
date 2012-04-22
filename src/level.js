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
	var newRoom,
            exitPortal,
            spawnPoint;

	collide.aabb([player], currentRoom.getBlocks());

	if (player.pos[0] < 0 ||
	    player.pos[0] > gs.width ||
	    player.pos[1] < 0 ||
	    player.pos[1] > gs.height) {

	    exitPortal = currentRoom.findPortalFromPos(player.pos[0], player.pos[1]);
	    newRoom = findRoomFromPortal(rooms, currentRoom.getName(), exitPortal);

	    activateRoom(gs, currentRoom, newRoom);
	    spawnPoint = newRoom.findSpawnPoint(gs, player, currentRoom);
	    player.setPos(spawnPoint[0], spawnPoint[1]);
	    currentRoom = newRoom;
	    // console.log("Loaded room: " + JSON.stringify(currentRoom));
	}
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
	room = Room(gs, blueprint[i]);
	rooms.push(room);
    }

    return rooms;
};

// works only for axis-aligned portals
var findRoomFromPortal = function(rooms, roomName, portal) {
    var i, j, destinationPortal;

    for (i = 0; i < rooms.length; i += 1) {
	if (rooms[i].getName() === portal.to) {
	    return rooms[i];
	}
    }

    throw "Unable to find room named " + portal.to;
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

var Room = function(gs, roomData) {
    var blocks = [];
    var i = 0;
    var temp_block;


    for (i = 0; i < roomData.tiles.length; i += 1) {
	temp_block = Block(roomData.tiles[i]);
	blocks.push(temp_block);
    }

    var findPortalFromPos = function(x, y) {
	var i, portal;

	for (i = 0; i < roomData.portals.length; i += 1) {
	    portal = roomData.portals[i];
	    if (portal.at[0] !== portal.at[2]) {
		if (x > portal.at[0] && x < portal.at[2]) {
		    // pass1
		    if ((portal.at[1] === 0 && y <= portal.at[1]) ||
			(portal.at[1] === gs.height && y >= portal.at[1])) {
			return portal;
		    }
		}
	    }
	    else if (portal.at[1] !== portal.at[3]) {
		if (y > portal.at[1] && y < portal.at[3]) {
		    // pass1
		    if ((portal.at[0] === 0 && x <= portal.at[0]) ||
			(portal.at[0] === gs.width && x >= portal.at[0])) {
			return portal;
		    }
		}
	    }
	}
	throw "unable to find portal for [" + x + "," + y + "] in room " + roomData.name;
    };

    var findLinkedPortal = function(roomName, portal) {
	var i, myPortal;

	if (roomData.name !== portal.to) {
	    return null;
	}

	for (i = 0; i < roomData.portals.length; i += 1) {
	    myPortal = roomData.portals[i];

	    if (myPortal.to === roomName) {
		break;
	    }
	}

	return myPortal;
    };

    var findSpawnPoint = function(gs, player, currentRoom) {
	var i;
	var spawn = [];

	var offsetInPortal, entryPortalWidth, exitPortalWidth;

	var exitPortal = currentRoom.findPortalFromPos(player.pos[0], player.pos[1]);
	var entryPortal = findLinkedPortal(currentRoom.getName(), exitPortal);

	if (entryPortal.at[0] === entryPortal.at[2]) {
	    entryPortalWidth = exitPortal.at[3] - exitPortal.at[1];
	    exitPortalWidth = entryPortal.at[3] - entryPortal.at[1];
	    offsetInPortal = (player.pos[1] - exitPortal.at[1]) / entryPortalWidth;

	    if (entryPortal.at[0] === 0) {
		spawn = [player.WALK_VX, entryPortal.at[1] + offsetInPortal * exitPortalWidth];
	    }
	    else if (entryPortal.at[0] === gs.width) {
		spawn = [gs.width - player.WALK_VX, entryPortal.at[1] + offsetInPortal * exitPortalWidth];
	    }
	}
	else if (entryPortal.at[1] === entryPortal.at[3]) {
	    entryPortalWidth = exitPortal.at[2] - exitPortal.at[0];
	    exitPortalWidth = entryPortal.at[2] - entryPortal.at[0];
	    offsetInPortal = (player.pos[0] - exitPortal.at[0]) / entryPortalWidth;

	    if (entryPortal.at[1] === 0) {
		spawn = [entryPortal.at[0] + offsetInPortal * exitPortalWidth, player.WALK_VY];
	    }
	    else if (entryPortal.at[1] === gs.height) {
		spawn = [entryPortal.at[0] + offsetInPortal * exitPortalWidth, gs.height - player.WALK_VY];
	    }
	}

	console.log("Spawn point found to be [" + spawn[0] + "," + spawn[1] + "]");
	return spawn;
    };


    return {
	getBlocks: function() {
	    return blocks;
	},
	getName: function() {
	    return roomData.name;
	},
	isLevelStart: function() {
	    return roomData.levelStart;
	},
	findPortalFromPos: findPortalFromPos,
	findLinkedPortal: findLinkedPortal,
	findSpawnPoint: findSpawnPoint
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