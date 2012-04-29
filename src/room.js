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
	    if (portal.type === "horizontal") {
		if (x > portal.at[0] && x < portal.at[0] + portal.width) {
		    // pass1
		    if ((portal.at[1] === 0 && y <= portal.at[1]) ||
			(portal.at[1] === gs.height && y >= portal.at[1])) {
			return portal;
		    }
		}
	    }
	    else if (portal.type === "vertical") {
		if (y > portal.at[1] && y < portal.at[1] + portal.width) {
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

	var offsetInPortal;

	var exitPortal = currentRoom.findPortalFromPos(player.pos[0], player.pos[1]);
	var entryPortal = findLinkedPortal(currentRoom.getName(), exitPortal);

	if (entryPortal.type === "vertical") {
	    offsetInPortal = player.pos[1] - exitPortal.at[1];

	    if (entryPortal.at[0] === 0) {
		spawn = [player.WALK_VX, entryPortal.at[1] + offsetInPortal];
	    }
	    else if (entryPortal.at[0] === gs.width) {
		spawn = [gs.width - player.WALK_VX, entryPortal.at[1] + offsetInPortal];
	    }
	}
	else if (entryPortal.type === "horizontal") {
	    offsetInPortal = player.pos[0] - exitPortal.at[0];

	    if (entryPortal.at[1] === 0) {
		spawn = [entryPortal.at[0] + offsetInPortal, player.WALK_VY];
	    }
	    else if (entryPortal.at[1] === gs.height) {
		spawn = [entryPortal.at[0] + offsetInPortal, gs.height - player.WALK_VY];
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
