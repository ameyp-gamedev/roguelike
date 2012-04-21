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

    var r = gs.width * 0.01;

    var update = function() {
	if (vx !== 0 && vy === 0) {
	    pos.x += vx;
	}
	else if (vx === 0 && vy !== 0) {
	    pos.y += vy;
	}
	else {
	    pos.x += vx/PlayerGlobals.Constants.sqrt2;
	    pos.y += vy/PlayerGlobals.Constants.sqrt2;
	}
    };

    var draw = function(c) {
	// console.log("Drawing at [" + pos.x + "," + pos.y + "]");
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
 	    [ab[0] - (bb[0] + bb[2]), 0, 0],
 	    [ab[1] - (bb[1] + bb[3]), 1, 0]
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
		if (d[2]) {
		    pos.y -= WALK_VY;
		}
		else {
		    pos.y += WALK_VY;
		}
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
		if (d[2]) {
		    pos.x -= WALK_VX;
		}
		else {
		    pos.x += WALK_VX;
		}
	    }
	    vx = 0;
	}
    };

    var handleKeyDown = function(code) {
	if (code === PlayerGlobals.Keycodes.UP ){
	    vy = -WALK_VY;
	}
	else if (code === PlayerGlobals.Keycodes.DOWN) {
	    vy = WALK_VY;
	}
	else if (code === PlayerGlobals.Keycodes.LEFT) {
	    vx = -WALK_VX;
	}
	else if (code === PlayerGlobals.Keycodes.RIGHT) {
	    vx = WALK_VX;
	}
    };

    var handleKeyUp = function(code) {
	if (code === PlayerGlobals.Keycodes.UP ||
	    code === PlayerGlobals.Keycodes.DOWN){
	    vy = 0;
	}
	else if (code === PlayerGlobals.Keycodes.LEFT ||
		 code === PlayerGlobals.Keycodes.RIGHT) {
	    vx = 0;
	}
    };

    console.log("Returning player");
    return {
	update: update,
	draw: draw,
	keyDown: handleKeyDown,
	keyUp: handleKeyUp,
	get_collision_aabb: get_collision_aabb,
	collide_aabb: collide_aabb
    };
}