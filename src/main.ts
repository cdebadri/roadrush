import * as Phaser from 'phaser'
// import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'


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
    type: Phaser.AUTO,
    parent: 'app',
    width: 480,
    height: 640,
    scene: [PlayScene],
  }
} else {
  config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [PlayScene],
  }
}

const game = new Phaser.Game(config)
window.game = game