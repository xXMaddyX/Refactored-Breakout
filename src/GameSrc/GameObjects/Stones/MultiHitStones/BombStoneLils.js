import Phaser from "phaser";
import { BombStoneLilaSprite, StoneRedBombSprite, BombStoneYellowSprite } from "../../../CoreSystem/AssetLoader";

export default class BombStoneLila {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.HP = 3;
        this.isDestroyed = false;
        this.iscollidet = false;
        this.score = 150;
        this.colliderPool = [];

        this.stoneDamageState = {
            FULL_HP: 0,
            MID_HP: 1,
            LOW_HP: 2
        };
        this.currentDamageState = null;
    };
    /**
     * 
     * @param {Phaser.Scene} sceneRef 
     */
    static loadSprites(sceneRef) {
        if (!sceneRef.textures.exists("red-bomb-stone")) sceneRef.load.image("red-bomb-stone", StoneRedBombSprite);
        if (!sceneRef.textures.exists("yellow-bomb-stone")) sceneRef.load.image("yellow-bomb-stone", BombStoneYellowSprite);
        if (!sceneRef.textures.exists("lila-bomb-stone")) sceneRef.load.image("lila-bomb-stone", BombStoneLilaSprite);
    };

    setDamageState(newState) {
        this.currentDamageState = newState;
    };

    create(x, y, scale, depth) {
        this.lilaBombStone = this.scene.physics.add.sprite(x, y).setScale(scale).setDepth(depth);
        this.setDamageState(this.stoneDamageState.FULL_HP);

        //NEED TO ADD OVERLAP, STONE GENERATOR IMP, COLLITION HANDLER, AUDIO,
    };

    update(time, delta) {};
};