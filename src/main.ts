import * as Phaser from 'phaser'
// import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'


declare global {
  interface Window {
    game: Phaser.Game,
  }
}

const config: GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 480,
  height: 640,
  scene: [PlayScene],
}

const game = new Phaser.Game(config)
window.game = game