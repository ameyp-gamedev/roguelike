function startGame() {
    var gs = new JSGameSoup("surface", 30);

    var levelData = {
	name: "level1",
	rooms: [
	    {
		name: "level1:room1",
		portals: [
		    {
			to: "level1:room2",
			at: [gs.width, gs.height/3-20, gs.width, gs.height/3+20]
		    },
		    {
			to: "level1:room3",
			at: [0, gs.height/1.5-20, 0, gs.height/1.5+20]
		    }
		],
		levelStart: true,
		tiles: [
		    [0, 0, gs.width, 20],
		    [0, 0, 20, gs.height/1.5-20],
		    [0, gs.height/1.5+20, 20, gs.height/3],
		    [0, gs.height-20, gs.width, gs.height],
		    [gs.width-20, 0, gs.width, gs.height/3-20],
		    [gs.width-20, gs.height/3+20, gs.width, gs.height]
		]
	    },
	    {
		name: "level1:room2",
		portals: [
		    {
			to: "level1:room1",
			at: [0, gs.height/1.5-20, 0, gs.height/1.5+20]
		    }
		],
		levelStart: false,
		tiles: [
		    [0, 0, gs.width, 20],
		    [0, 0, 20, gs.height/1.5-20],
		    [0, gs.height/1.5+20, 20, gs.height],
		    [0, gs.height-20, gs.width, gs.height],
		    [gs.width-20, 0, gs.width, gs.height]
		]
	    },
	    {
		name: "level1:room3",
		portals: [
		    {
			to: "level1:room1",
			at: [gs.width, gs.height/2-20, gs.width, gs.height/2+20]
		    }
		],
		levelStart: false,
		tiles: [
		    [0, 0, gs.width, 20],
		    [0, 0, 20, gs.height],
		    [0, gs.height-20, gs.width, gs.height],
		    [gs.width-20, 0, gs.width, gs.height/2-20],
		    [gs.width-20, gs.height/2+20, gs.width, gs.height]
		]
	    }
	]
    };
    createLevel(gs, levelData);
}