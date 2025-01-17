const calcBackPositionX = (position) => {
    return position + 960;
};
const calcBackPositionY = (position) => {
    return position + 540;
};

const KEYS = {
    KEY_BACKGROUND: "Background3",
}

const World3Config = {
    backgroundPositions: [
        {x: calcBackPositionX(0), y: calcBackPositionY(0), key: KEYS.KEY_BACKGROUND, alpha: 1, depth: -10, scale: 1}
    ],
}

export {
    World3Config,
    KEYS,
}