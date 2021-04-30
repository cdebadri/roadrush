import * as Phaser from 'phaser';
import * as Align from '../utils/Align';
import * as constants from '../utils/Constants';

export default class Road extends Phaser.GameObjects.Container {
	constructor(config) {
		super(config.scene);

		this.scene = config.scene;
		this.back = this.scene.add.image(game.config.width / 2, game.config.height / 2, 'road');

    // this.back.displayWidth = game.config.width * .5;
    // this.back.scaleY = this.back.scaleX;
    Align.scaleToGameW(this.back, 0.5);

    this.setSize(this.back.displayWidth, game.config.height);

    this.add(this.back);

    this.lineGroup = this.scene.add.group();
    this.count = 0;

    this.car = this.scene.add.sprite(0, 0, 'car');
    grid.placeAt(22, this.car, 'corner');
    Align.scaleToGameW(this.car, 0.1);
    this.add(this.car);

    this.back.setInteractive();
    this.back.on('pointerdown', this.changeLanes);

    this.scene.add.existing(this);

    this.left = this.displayWidth - 50;
    this.right = this.displayWidth + 50;

    this.addOstacles();
	}

  addOstacles() {
    const obstacles = [
      {
        key: 'pcar1',
        speed: 10,
        scale: .10,
      }, {
        key: 'pcar2',
        speed: 10,
        scale: .10,
      }, {
        key: 'cone',
        speed: 20,
        scale: .05,
      }, {
        key: 'barrier',
        speed: 20,
        scale: .10,
      }
    ];
    
    const index = Math.floor(Math.random() * 4);
    const lane = Math.random() * 10;
    this.obstacle = this.scene.add.sprite(0, 0, obstacles[index].key)
    
    if (lane > 5) {
      grid.placeAt(2, this.obstacle, 'corner');
    } else {
      grid.placeAt(3, this.obstacle, 'corner');
    }
    
    Align.scaleToGameW(this.obstacle, obstacles[index].scale);
    
    this.obstacle.speed = obstacles[index].speed;
    this.add(this.obstacle);
  }

  changeLanes() {
    emitter.emit('PLAY_SOUND', 'whoosh');
    if (this.parentContainer.car.x > this.displayWidth) {
      grid.placeAt(22, this.parentContainer.car, 'corner');
    } else {
      grid.placeAt(23, this.parentContainer.car, 'corner');
    }
  }

  makeLines() {
    this.vSpace = this.displayHeight / 10;
    
    for (let i = 0; i < 20; i++) {
      const line = this.scene.add.image(game.config.width/2, i * this.vSpace, 'line');
      line.oy = line.y;
      this.lineGroup.add(line);
    }
  }

  moveLines() {
    this.lineGroup.children.iterate(function (child) {
      child.y += this.vSpace / 20;
      this.count++;
      
      if (this.count === 19) {
        this.count = 0;
        child.y = child.oy;
      }
    }.bind(this));
  }

  moveObstacles() {
    this.obstacle.y += this.vSpace / this.obstacle.speed;
    
    if (Align.checkCollide(this.car, this.obstacle)) {
      emitter.emit('PLAY_SOUND', 'crash');
      this.car.alpha = 0.5;
      // this.start('GameOver');
    } else {
      this.car.alpha = 1;
    }
    
    if (this.obstacle.y > game.config.height) {
      emitter.emit(constants.UPDATE_POINTS, 1);
      this.obstacle.destroy();
      this.addOstacles();
    }
  }
}