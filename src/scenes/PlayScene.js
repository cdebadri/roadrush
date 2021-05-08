import * as Phaser from 'phaser'
import Road from '../components/Road';
import Scorebox from '../components/Scorebox';
import ToggleButtonWrapper from '../components/ToggleButtonWrapper';
import Media from '../components/Media';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' })
  }

  create() {
    model.gameOver = false;
    
    const media = new Media({ scene: this });
    emitter.emit('PLAY_BACKGROUND_MUSIC', 'race');

    this.road = new Road({ scene: this });
    this.road.makeLines();

    // grid.showNumbers();

    const sb = new Scorebox({ scene: this });
    grid.placeAt(4, sb);

    const soundOnOffButton = new ToggleButtonWrapper({
      scene: this,
      iconTrue: 'sfxOn',
      iconFalse: 'sfxOff',
      background: 'toggle',
      event: 'CHANGE_SOUND_SETTINGS',
    });
    grid.placeAt(0, soundOnOffButton);
  }

  update() {
    this.road.moveLines();
    this.road.moveObstacles();
  }
}
