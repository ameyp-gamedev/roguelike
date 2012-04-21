var Keycodes = {
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    LEFT: 37
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

    return {
	update: function() {
	    if (vy === 0) {
		pos.x += vx;
	    }
	    else if (vx === 0) {
		pos.y -= vy;
	    }
	    else {
		pos.x += vx/1.414;
		pos.y -= vy/1.414;
	    }
	},
	draw: function(c) {
	    c.fillRect(pos.x - r/2, pos.y - r/2, r, r);
	},
	keyDown: function(code) {
	    if (code === Keycodes.UP ){
		if (moveDown === false) {
		    vy = WALK_VY;
		}
		else {
		    vy = 0;
		}
		moveUp = true;
	    }
	    else if (code === Keycodes.DOWN) {
		if (moveUp === false) {
		    vy = -WALK_VY;
		}
		else {
		    vy = 0;
		}
		moveDown = true;
	    }
	    else if (code === Keycodes.LEFT) {
		if (moveRight === false) {
		    vx = -WALK_VX;
		}
		else {
		    vx = 0;
		}
		moveLeft = true;
	    }
	    else if (code === Keycodes.RIGHT) {
		if (moveLeft === false) {
		    vx = WALK_VX;
		}
		else {
		    vx = 0;
		}
		moveRight = true;
	    }
	},
	keyUp: function(code) {
	    if (code === Keycodes.UP ){
		if (moveDown === true) {
		    vy = -WALK_VY;
		}
		else {
		    vy = 0;
		}
		moveUp = false;
	    }
	    else if (code === Keycodes.DOWN) {
		if (moveUp === true) {
		    vy = WALK_VY;
		}
		else {
		    vy = 0;
		}
		moveDown = false;
	    }
	    else if (code === Keycodes.LEFT) {
		if (moveRight === true) {
		    vx = WALK_VX;
		}
		else {
		    vx = 0;
		}
		moveLeft = false;
	    }
	    else if (code === Keycodes.RIGHT) {
		if (moveLeft === true) {
		    vx = -WALK_VX;
		}
		else {
		    vx = 0;
		}
		moveRight = false;
	    }
	}
    };
}