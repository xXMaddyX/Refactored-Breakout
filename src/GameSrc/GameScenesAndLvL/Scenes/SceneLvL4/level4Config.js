const stoneConfigLvL4 = {
    normal_stones: [
        {x: 150, y: 100, scale: 0.2, depth: 0},
        {x: 350, y: 100, scale: 0.2, depth: 0},
        {x: 550, y: 100, scale: 0.2, depth: 0},
        {x: 750, y: 100, scale: 0.2, depth: 0},
        {x: 950, y: 100, scale: 0.2, depth: 0},
        {x: 1150, y: 100, scale: 0.2, depth: 0},
        {x: 1350, y: 100, scale: 0.2, depth: 0},
        {x: 1550, y: 100, scale: 0.2, depth: 0},
        {x: 1750, y: 100, scale: 0.2, depth: 0},
    ],
    red_stones: [
        {x: 250, y: 150, scale: 0.2, depth: 0},
        {x: 450, y: 150, scale: 0.2, depth: 0},
        {x: 650, y: 150, scale: 0.2, depth: 0},
        {x: 850, y: 150, scale: 0.2, depth: 0},
        {x: 1050, y: 150, scale: 0.2, depth: 0},
        {x: 1250, y: 150, scale: 0.2, depth: 0},
        {x: 1450, y: 150, scale: 0.2, depth: 0},
        {x: 1650, y: 150, scale: 0.2, depth: 0},
    ],
    lila_stones: [
        {x: 150, y: 200, scale: 0.2, depth: 0},
        {x: 350, y: 200, scale: 0.2, depth: 0},
        {x: 550, y: 200, scale: 0.2, depth: 0},
        {x: 750, y: 200, scale: 0.2, depth: 0},

        {x: 1150, y: 200, scale: 0.2, depth: 0},
        {x: 1350, y: 200, scale: 0.2, depth: 0},
        {x: 1550, y: 200, scale: 0.2, depth: 0},
        {x: 1750, y: 200, scale: 0.2, depth: 0},
    ],
    lila_bomb_stones: [],
    solid_stones: [],
    normal_ai_stones: [],
    normal_tripple_stones: [
        {x: 950, y: 200, scale: 0.2, depth: 0},
    ],
    bienen_positions: [
        {y: 300, scale: 0.2, depth: -1, direction: -1, inizialPositions: {start: 2000, end: -300}, flipH: 1},
        {y: 600, scale: 0.2, depth: -1, direction: 1, inizialPositions: {start: -300, end: 2000}, flipH: -1},
        {y: 900, scale: 0.2, depth: -1, direction: -1, inizialPositions: {start: 2500, end: -300}, flipH: 1},
    ]
};

export {
    stoneConfigLvL4,
}