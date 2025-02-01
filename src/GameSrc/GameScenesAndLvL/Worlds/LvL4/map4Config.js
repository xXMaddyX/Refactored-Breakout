const calcBackPositionX = (position) => {
    return position + 960;
};
const calcBackPositionY = (position) => {
    return position + 540;
};

const World4Config = {
    backgroundPositions: [
        {x: calcBackPositionX(0), y: calcBackPositionY(0), key: KEYS.KEY_BACKGROUND, alpha: 1, depth: -10, scale: 1}
    ],
}

export {
    World4Config,
}