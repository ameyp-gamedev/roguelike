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
	keyUp: handleKeyUp
    };
}