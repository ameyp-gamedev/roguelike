var Trigger = function(gs, params) {
    var pos = [
	params.position[0],
	params.position[1]
    ];

    var p = params.sprite;
    var r = params.width;
    var active = false;

    var get_collision_aabb = function() {
	return p.aabb(pos);
    };

    var collide_aabb = function(who) {
	if (who.hasOwnProperty('is_player') &&
	    who.is_player === true) {
	    active = true;
	    p.action("active");

	    if (params.activeCallback) {
		params.activeCallback();
	    };
	}
    };

    var no_collide_aabb = function(who) {
	if (active === true) {
	    active = false;
	    p.action("inactive");

	    if (params.inactiveCallback) {
		params.inactiveCallback();
	    }
	}
    };

    var draw = function(c) {
	p.draw(c, pos);
    };

    return {
	draw: draw,

	// collision related
	get_collision_aabb: get_collision_aabb,
	collide_aabb: collide_aabb,
	no_collide_aabb: no_collide_aabb,
	opague: false
    };
};