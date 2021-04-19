import * as Phaser from 'phaser'
import Road from '../components/Road';
import Model from '../components/Model';
import Controller from '../components/Controller';
import Scorebox from '../components/Scorebox';
import Grid from '../utils/Grid';

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
  }

  create() {
    window.emitter = new Phaser.Events.EventEmitter();
    window.controller = new Controller();
    window.model = new Model();

    const grid = new Grid({ scene: this });
    grid.show();

    this.sb = new Scorebox({ scene: this });
    // this.sb.x = game.config.width - 50;
    // this.sb.y = 50;
    grid.placeAt(4, 0, this.sb);

    this.road = new Road({ scene: this });
    this.road.makeLines();

    model.score = 0;
  }

  update() {
    this.road.moveLines();
    this.road.moveObstacles();
  }
}
