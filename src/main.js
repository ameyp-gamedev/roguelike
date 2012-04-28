var startGame = function () {
    var gs = new JSGameSoup("surface", 30);

    var levelData = {
	name: "level1",
	rooms: [
	    {
		name: "level1:room1",
		portals: [
		    {
			to: "level1:room2",
			at: [gs.width, gs.height/3-20],
			type: "vertical",
			width: 40
		    },
		    {
			to: "level1:room3",
			at: [0, gs.height/1.5-20],
			type: "vertical",
			width: 40
		    }
		],
		levelStart: false,
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
		portals: [
		    {
			to: "level1:room1",
			at: [0, gs.height/1.5-20],
			type: "vertical",
			width: 40
		    }
		],
		levelStart: false,
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
		portals: [
		    {
			to: "level1:room1",
			at: [gs.width, gs.height/2-20],
			type: "vertical",
			width: 40
		    }
		],
		levelStart: true,
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