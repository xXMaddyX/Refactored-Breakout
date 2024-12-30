//Player Sprite Imports
import PlayerNormalPaddel from "../Assets/SpriteAssets/playerAssets/paddle.png";
import PlayerPaddelSheet from "../Assets/SpriteAssets/playerAssets/PaddelBreak.png";

//Ball Sprite Imports
import NormalBall from "../Assets/SpriteAssets/playerAssets/NormalBall.png";
import BallHitWall from "../Assets/AudioAssets/BallAudios/BallHitWall.wav";
import BallHitStone from "../Assets/AudioAssets/BallAudios/BallHitStone.wav";

//Stone Imports
import NormalStoneSprite from "../Assets/SpriteAssets/Stones/StoneGreen.png";
import RedStoneSprite from "../Assets/SpriteAssets/Stones/RedStone.png";
import SolidRedStoneSprite from "../Assets/SpriteAssets/Stones/SolidStoneRed.png";
import NormalStoneHitAudio from "../Assets/AudioAssets/BallAudios/hitNormalStone.wav";
import SolidStoneHitAudio from "../Assets/AudioAssets/BallAudios/HitSolidStone.wav";

//UI IMPORTS
import UI_Crushed_it from "../Assets/SpriteAssets/UI/Crushed_it.png";
import ScoreBordSprite from "../Assets/SpriteAssets/UI/Highscore.png";
import NextLvLButton from "../Assets/SpriteAssets/UI/NextLevel.png";

//Main Scene Imports
import LoadingAnimationSprite from "../Assets/MainSceneAssets/LoadingAnimation.png";
import PauseSprite from "../Assets/MainSceneAssets/Pause.png";

//Titel Sceen Imports
import TitelBackgroundSprite from "../Assets/SpriteAssets/TitelScreenAssets/TitelBackground.png";
import TitelOptionSprite from "../Assets/SpriteAssets/TitelScreenAssets/Option.png";
import TitelStartSprite from "../Assets/SpriteAssets/TitelScreenAssets/Start.png";
import TitelQuitSprite from "../Assets/SpriteAssets/TitelScreenAssets/Quit.png";

//Level1 Imports
import BackgroundLvL1 from "../Assets/SpriteAssets/Backgrounds/scene-Sheet.png";
import LvL1Music from "../Assets/AudioAssets/LvLAudios/PiepsBreakout.wav";

//Level2 Imports
import LvL2Music from "../Assets/AudioAssets/LvLAudios/MusicLvL2.wav";
import BackgroundLvL2 from "../Assets/SpriteAssets/Backgrounds/Level2Background/BackgroundLvL2.png";


export {
    //PLAYER EXPORTS
    PlayerNormalPaddel,
    PlayerPaddelSheet,

    //BALL EXPORTS
    NormalBall,
    BallHitWall,
    BallHitStone,
    
    //UI EXPORTS
    UI_Crushed_it,
    ScoreBordSprite,
    PauseSprite,
    LoadingAnimationSprite,
    NextLvLButton,
    
    //STONE EXPORTS
    NormalStoneSprite,
    RedStoneSprite,
    SolidRedStoneSprite,
    NormalStoneHitAudio,
    SolidStoneHitAudio,

    //TITEL_SCREEN_EXPORTS
    TitelBackgroundSprite,
    TitelOptionSprite,
    TitelQuitSprite,
    TitelStartSprite,

    //LEVEL_EXPORTS
    BackgroundLvL1,
    BackgroundLvL2,
    LvL1Music,
    LvL2Music
};