import * as Phaser from 'phaser'
import ButtonWrapper from '../components/ButtonWrapper';
import Controller from '../components/Controller';
import Grid from '../utils/Grid';
import * as Align from '../utils/Align';


export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' })
  }

  preload() {
    this.load.image('button', '../src/assets/4.png');
    this.load.image('title', '../src/assets/title.png');
  }

  create() {
    const title = this.add.image(0, 0, 'title');
    Align.scaleToGameW(title, 0.9);
    grid.placeAt(7, title);

  	const buttonPlay = new ButtonWrapper({
  		scene: this,
  		key: 'button',
  		text: 'Play Again',
  		style: {
  			color: '#000000',
  			fontSize: 20,
  		},
  		event: 'play_again',
  	});

  	grid.placeAt(17, buttonPlay);

  	emitter.on('play_again', this.startPlayScene, this);
  }

  startPlayScene() {
    this.scene.start('PlayScene');  	
  }
}
