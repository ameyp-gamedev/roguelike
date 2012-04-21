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

    var pos = {
	x: gs.width * 0.5,
	y: gs.height * 0.5
    };
    var vx = 0,
	vy = 0;
    var moveLeft = false,
	moveRight = false,
	moveUp = false,
	moveDown = false;

    var r = gs.width * 0.01;

    var update = function() {
	if (vy === 0) {
	    pos.x += vx;
	}
	else if (vx === 0) {
	    pos.y -= vy;
	}
	else {
	    pos.x += vx/PlayerGlobals.Constants.sqrt2;
	    pos.y -= vy/PlayerGlobals.Constants.sqrt2;
	}
    };

    var draw = function(c) {
	c.fillRect(pos.x - r/2, pos.y - r/2, r, r);
    };

    var get_collision_aabb = function() {
	return [pos.x - r/2, pos.y - r/2, r, r];
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
 	    [ab[0] - (bb[0] + bb[2]), 0, -1],
 	    [ab[1] - (bb[1] + bb[3]), 1, -1]
 	];
	sides.sort(compare);
	var d = sides[0];

	if (d[1]) {
	    if (pos.y > bb[1] + bb[3]) {
		pos.y += WALK_VY;
	    }
	    else if (pos.y < bb[1]) {
		pos.y -= WALK_VY;
	    }
	    else {
		pos.y = bb[1];
	    }
	    vy = 0;
	}
	else {
	    if (pos.x > bb[0] + bb[2]) {
		pos.x += WALK_VX;
	    }
	    else if (pos.x < bb[0]) {
		pos.x -= WALK_VX;
	    }
	    else {
		pos.x = bb[0];
	    }
	    vx = 0;
	}
    };

    var handleKeyDown = function(code) {
	if (code === PlayerGlobals.Keycodes.UP ){
	    if (moveDown === false) {
		vy = WALK_VY;
	    }
	    else {
		vy = 0;
	    }
	    moveUp = true;
	}
	else if (code === PlayerGlobals.Keycodes.DOWN) {
	    if (moveUp === false) {
		vy = -WALK_VY;
	    }
	    else {
		vy = 0;
	    }
	    moveDown = true;
	}
	else if (code === PlayerGlobals.Keycodes.LEFT) {
	    if (moveRight === false) {
		vx = -WALK_VX;
	    }
	    else {
		vx = 0;
	    }
	    moveLeft = true;
	}
	else if (code === PlayerGlobals.Keycodes.RIGHT) {
	    if (moveLeft === false) {
		vx = WALK_VX;
	    }
	    else {
		vx = 0;
	    }
	    moveRight = true;
	}
    };

    var handleKeyUp = function(code) {
	if (code === PlayerGlobals.Keycodes.UP ){
	    if (moveDown === true) {
		vy = -WALK_VY;
	    }
	    else {
		vy = 0;
	    }
	    moveUp = false;
	}
	else if (code === PlayerGlobals.Keycodes.DOWN) {
	    if (moveUp === true) {
		vy = WALK_VY;
	    }
	    else {
		vy = 0;
	    }
	    moveDown = false;
	}
	else if (code === PlayerGlobals.Keycodes.LEFT) {
	    if (moveRight === true) {
		vx = WALK_VX;
	    }
	    else {
		vx = 0;
	    }
	    moveLeft = false;
	}
	else if (code === PlayerGlobals.Keycodes.RIGHT) {
	    if (moveLeft === true) {
		vx = -WALK_VX;
	    }
	    else {
		vx = 0;
	    }
	    moveRight = false;
	}
    };

    return {
	update: update,
	draw: draw,
	keyDown: handleKeyDown,
	keyUp: handleKeyUp,
	get_collision_aabb: get_collision_aabb,
	collide_aabb: collide_aabb
    };
}