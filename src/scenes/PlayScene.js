import * as Phaser from 'phaser'
import Road from '../components/Road';
import Scorebox from '../components/Scorebox';
import ToggleButtonWrapper from '../components/ToggleButtonWrapper';
import Media from '../components/Media';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' })
  }

  preload() {
    this.load.image('road', '../src/assets/road.jpg');
    this.load.spritesheet(
      'car',
      '../src/assets/cars.png',
      {
        frameWidth: 60,
        frameHeight: 126,
      }
    );
    this.load.image('line', '../src/assets/line.png');
    this.load.image('barrier', '../src/assets/barrier.png');
    this.load.image('cone', '../src/assets/cone.png');
    this.load.image('pcar1', '../src/assets/pcar1.png');
    this.load.image('pcar2', '../src/assets/pcar2.png');
    this.load.image('toggle', '../src/assets/toggle.png');
    this.load.image('sfxOn', '../src/assets/sfx_on.png');
    this.load.image('sfxOff', '../src/assets/sfx_off.png');
    this.load.audio('race', [
      '../src/assets/random-race.mp3',
      '../src/assets/random-race.ogg'
    ]);
    this.load.audio('crash', [
      '../src/assets/boom.mp3',
      '../src/assets/boom.ogg'
    ]);
    this.load.audio('whoosh', [
      '../src/assets/whoosh.mp3',
      '../src/assets/whosh.ogg'
    ]);
  }

  create() {
    const media = new Media({ scene: this });
    emitter.emit('PLAY_BACKGROUND_MUSIC', 'race')

    this.road = new Road({ scene: this });
    this.road.makeLines();

    grid.showNumbers();


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

    model.score = 0;
  }

  update() {
    this.road.moveLines();
    this.road.moveObstacles();
  }
}
