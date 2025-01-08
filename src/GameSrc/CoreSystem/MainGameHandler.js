const GAME_DATA = {
    PLAYER_STATES: {
        DEFAULT_PLAYER_LIFES: 3,
        PLAYER_LIFES: 3,
    },

    GAME_SCORE_SYSTEM: {
        DEFAULT_SCORE: 0,
        CURRENT_SCORE: 0,
        YOUR_HIGHEST_SCORE: 0,
    },

    UNLOCK_LEVEL: {
        LEVEL1: true,
        LEVEL2: false,
        LEVEL3: false,
        LEVEL4: false
    },

    CURRENT_GAME_STATES: {
        CURRENT_SCENE: null,
    },

    SCENE_REFS: {
        MAIN_SCENE_REF: null,
        SCENE_LOADER_REF: null,
    },

    CURRENT_SCENE_DATA_REFS: {
        IMAGE_DATA: [],
        ANIMATION_DATA: [],
        SOUND_DATA: []
    },

    GAME_SETTING: {
        GAME_VOLUME: 0.1,
    }
};

export default GAME_DATA;