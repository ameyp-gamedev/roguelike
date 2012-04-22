var PlayerGlobals = {
    Keycodes: {
	UP: 38,
	DOWN: 40,
	RIGHT: 39,
	LEFT: 37
    },
    Constants: {
	sqrt2: 1.414
    }
};

function Player(gs) {
    var WALK_VX = 10;
    var WALK_VY = 10;

    var pos = [
	gs.width * 0.5,
	gs.height * 0.5
    ];
    var vx = 0,
	vy = 0;

    var moveUp = false,
	moveDown = false,
	moveLeft = false,
	moveRight = false;

    var r = gs.width * 0.01;

    var update = function() {
	if (vx !== 0 && vy === 0) {
	    pos[0] += vx;
	}
	else if (vx === 0 && vy !== 0) {
	    pos[1] += vy;
	}
	else {
	    pos[0] += vx/PlayerGlobals.Constants.sqrt2;
	    pos[1] += vy/PlayerGlobals.Constants.sqrt2;
	}
	console.log("Player position = [" + pos[0] + "," + pos[1] + "]");
    };

    var draw = function(c) {
	// console.log("Drawing at [" + pos[0] + "," + pos[1] + "]");
	c.fillRect(pos[0] - r/2, pos[1] - r/2, r, r);
    };

    var setPos = function(x, y) {
	pos[0] = x;
	pos[1] = y;
    };

    var get_collision_aabb = function() {
	return [pos[0] - r/2, pos[1] - r/2, r, r];
    };

    var collide_aabb = function(who) {
	var ab = get_collision_aabb();
	var bb = who.get_collision_aabb();

	var compare = function(x, y) {
	    return x[0] < y[0] ? 1
		: x[0] > y[0] ? -1 : 0;
	};

	var sides = [
	    [bb[1] - (ab[1] + ab[3]), 1, 1],
 	    [bb[0] - (ab[0] + ab[2]), 0, 1],
 	    [ab[0] - (bb[0] + bb[2]), 0, 0],
 	    [ab[1] - (bb[1] + bb[3]), 1, 0]
 	];
	sides.sort(compare);
	var d = sides[0];

	if (d[1]) {
	    if (pos[1] > bb[1] + bb[3]) {
		pos[1] += WALK_VY;
	    }
	    else if (pos[1] < bb[1]) {
		pos[1] -= WALK_VY;
	    }
	    else {
		if (d[2]) {
		    pos[1] -= WALK_VY;
		}
		else {
		    pos[1] += WALK_VY;
		}
	    }
	    vy = 0;
	}
	else {
	    if (pos[0] > bb[0] + bb[2]) {
		pos[0] += WALK_VX;
	    }
	    else if (pos[0] < bb[0]) {
		pos[0] -= WALK_VX;
	    }
	    else {
		if (d[2]) {
		    pos[0] -= WALK_VX;
		}
		else {
		    pos[0] += WALK_VX;
		}
	    }
	    vx = 0;
	}
    };

    var handleKeyDown = function(code) {
	if (code === PlayerGlobals.Keycodes.UP ){
	    moveUp = true;
	    if (moveDown === false) {
		vy = -WALK_VY;
	    }
	    else {
		vy = 0;
	    }
	}
	else if (code === PlayerGlobals.Keycodes.DOWN) {
	    moveDown = true;
	    if (moveUp === false) {
		vy = WALK_VY;
	    }
	    else {
		vy = 0;
	    }
	}
	else if (code === PlayerGlobals.Keycodes.LEFT) {
	    moveLeft = true;
	    if (moveRight === false) {
		vx = -WALK_VX;
	    }
	    else {
		vx = 0;
	    }
	}
	else if (code === PlayerGlobals.Keycodes.RIGHT) {
	    moveRight = true;
	    if (moveLeft === false) {
		vx = WALK_VX;
	    }
	    else {
		vx = 0;
	    }
	}
    };

    var handleKeyUp = function(code) {
	if (code === PlayerGlobals.Keycodes.UP) {
	    moveUp = false;
	    if (moveDown === false) {
		vy = 0;
	    }
	    else {
		vy = WALK_VY;
	    }
	}
	else if (code === PlayerGlobals.Keycodes.DOWN){
	    moveDown = false;
	    if (moveUp === false) {
		vy = 0;
	    }
	    else {
		vy = -WALK_VY;
	    }
	}
	else if (code === PlayerGlobals.Keycodes.LEFT) {
	    moveLeft = false;
	    if (moveRight === false) {
		vx = 0;
	    }
	    else {
		vx = WALK_VX;
	    }
	}
	else if (code === PlayerGlobals.Keycodes.RIGHT) {
	    moveRight = false;
	    if (moveLeft === false) {
		vx = 0;
	    }
	    else {
		vx = -WALK_VX;
	    }
	}
    };

    return {
	update: update,
	draw: draw,
	keyDown: handleKeyDown,
	keyUp: handleKeyUp,
	get_collision_aabb: get_collision_aabb,
	collide_aabb: collide_aabb,
	pos: pos,
	setPos: setPos,
	WALK_VX: WALK_VX,
	WALK_VY: WALK_VY
    };
}