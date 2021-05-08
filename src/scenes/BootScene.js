import * as Phaser from 'phaser'
import ButtonWrapper from '../components/ButtonWrapper';
import Controller from '../components/Controller';
import Grid from '../utils/Grid';
import Model from '../components/Model';
import * as Align from '../utils/Align';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    this.load.image('button', '../src/assets/4.png');
    this.load.image('title', '../src/assets/title.png');
  }

  create() {
    window.emitter = new Phaser.Events.EventEmitter();
    window.controller = new Controller();
    window.model = new Model();

    model.soundOn = true;
    
    // grid.showNumbers();

    const title = this.add.image(0, 0, 'title');
    Align.scaleToGameW(title, 0.9);
    grid.placeAt(7, title);

  	const buttonPlay = new ButtonWrapper({
  		scene: this,
  		key: 'button',
  		text: 'Play',
  		style: {
  			color: '#000000',
  			fontSize: 20,
  		},
  		event: 'play',
  	});

  	grid.placeAt(17, buttonPlay);

  	emitter.on('play', this.startPlayScene, this);
  }

  startPlayScene() {
    this.scene.start('PlayScene');  	
  }
}
