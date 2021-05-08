import * as Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import GameOver from './scenes/GameOver';
import SceneLoad from './scenes/SceneLoad';

declare global {
  interface Window {
    game: Phaser.Game,
  }
}

var isMobile = navigator.userAgent.indexOf("Mobile");
if (isMobile === -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
}

let config: GameConfig;

if (isMobile === -1) {
  config = {
    type: Phaser.CANVAS,
    parent: 'app',
    width: 480,
    height: 640,
    scene: [SceneLoad, BootScene, PlayScene, GameOver],
  }
} else {
  config = {
    type: Phaser.CANVAS,
    parent: 'app',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [SceneLoad, BootScene, PlayScene, GameOver],
  }
}

const game = new Phaser.Game(config)
window.game = game