var startGame = function () {
    var gs = new JSGameSoup("surface", 30);

    var levelData = {
	name: "level1",
	rooms: [
	    {
		name: "level1:room1",
		levelStart: false,
		portals: [
		    {
			to: "level1:room2",
			at: [gs.width, gs.height/3-20],
			alignment: "vertical",
			width: 40
		    },
		    {
			to: "level1:room3",
			at: [0, gs.height/1.5-20],
			alignment: "vertical",
			width: 40
		    }
		],
		triggers: [],
		targets: [],
		tiles: [
		    [0, 0, gs.width, 20],
		    [0, 0, 20, gs.height/1.5-20],
		    [0, gs.height/1.5+20, 20, gs.height/3],
		    [0, gs.height-20, gs.width, 20],
		    [gs.width-20, 0, 20, gs.height/3-20],
		    [gs.width-20, gs.height/3+20, 20, gs.height/1.5-20]
		]
	    },
	    {
		name: "level1:room2",
		levelStart: false,
		portals: [
		    {
			to: "level1:room1",
			at: [0, gs.height/1.5-20],
			alignment: "vertical",
			width: 40
		    }
		],
		triggers: [],
		targets: [],
		tiles: [
		    [0, 0, gs.width, 20],
		    [0, 0, 20, gs.height/1.5-20],
		    [0, gs.height/1.5+20, 20, gs.height/3-20],
		    [0, gs.height-20, gs.width, 20],
		    [gs.width-20, 0, 20, gs.height]
		]
	    },
	    {
		name: "level1:room3",
		levelStart: true,
		portals: [
		    {
			to: "level1:room1",
			at: [gs.width, gs.height/2-20],
			alignment: "vertical",
			width: 40
		    }
		],
		targets: [
		    {
			name: "level1:room1:entity1",
			type: "door",
			open: true,
			closedPos: [gs.width-40, gs.height/2],
			openPos: [gs.width-40, gs.height/2+60],
			sprite: {
			    anchor: ["center", "center"],
			    frames: {
				inactive: [["img/door_vertical.png", 0]]
			    },
			    default: "inactive"
			},
			scripts: [
			    {
				toggle: function() {
				    if (open) {
					pos = openPos;
					open = false;
				    }
				    else {
					pos = closedPos;
					open = true;
				    }
				}
			    }
			]
		    }
		],
		triggers: [
		    {
			name: "level1:room1:trigger1",
			pos: [gs.width-60, gs.height/3],
			type: "console",
			sprite: {
			    anchor: ["center", "center"],
			    frames: {
				active: [["img/plate_active.png", 0]],
				inactive: [["img/plate_inactive.png", 0]]
			    },
			    default: "inactive"
			},
			shoots: [
			    "level1:room1:entity1"
			]
		    }
		],
		tiles: [
		    [0, 0, gs.width, 20],
		    [0, 0, 20, gs.height],
		    [0, gs.height-20, gs.width, 20],
		    [gs.width-20, 0, 20, gs.height/2-20],
		    [gs.width-20, gs.height/2+20, 20, gs.height/2-20]
		]
	    }
	]
    };

    loadSprites();
    createLevel(gs, levelData);
};

var loadSprites = function() {
    Sprite.preload([
	"img/player_idle.png",
	"img/player_att_top_1.png",
	"img/player_att_top_2.png",
	"img/player_att_top_3.png",
	"img/player_att_top_4.png",
	"img/player_att_top_5.png",
	"img/player_att_right_1.png",
	"img/player_att_right_2.png",
	"img/player_att_right_3.png",
	"img/player_att_right_4.png",
	"img/player_att_right_5.png",
	"img/player_att_bottom_1.png",
	"img/player_att_bottom_2.png",
	"img/player_att_bottom_3.png",
	"img/player_att_bottom_4.png",
	"img/player_att_bottom_5.png",
	"img/player_att_left_1.png",
	"img/player_att_left_2.png",
	"img/player_att_left_3.png",
	"img/player_att_left_4.png",
	"img/player_att_left_5.png"
    ]);
};