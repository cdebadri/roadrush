import * as Phaser from 'phaser';
import Bar from '../components/Bar';
import Grid from '../utils/Grid';

export default class SceneLoad extends Phaser.Scene {
	constructor() {
		super({ key: 'SceneLoad' });
	}

	preload() {
		window.grid = new Grid({ scene: this, color: '#ffffff' });
		// grid.showNumbers();
		this.bar = new Bar({ scene: this, color: 0xFFFF00	});
		grid.placeAt(15, this.bar);

		this.load.on('progress', this.onProgress, this);
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

  onProgress(value) {
  	this.bar.setPercent(value);
  }

  create() {
  	this.scene.start('BootScene');
  }
}