import * as Phaser from 'phaser';
import * as Align from '../utils/Align';

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

    this.car = this.scene.add.sprite(this.displayWidth - 50, game.config.height * .9, 'car');
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
    const lane = Math.random() * 100;
    
    this.obstacle = lane > 50 
      ? this.scene.add.sprite(this.left, 0, obstacles[index].key)
      : this.scene.add.sprite(this.right, 0, obstacles[index].key);
    
    Align.scaleToGameW(this.obstacle, obstacles[index].scale);
    
    this.obstacle.speed = obstacles[index].speed;
    this.add(this.obstacle);
  }

  changeLanes() {
    if (this.parentContainer.car.x > this.displayWidth) {
      this.parentContainer.car.x = this.displayWidth - 50;
    } else {
      this.parentContainer.car.x = this.displayWidth + 50;
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
      this.car.alpha = 0.5;
    } else {
      this.car.alpha = 1;
    }
    
    if (this.obstacle.y > game.config.height) {
      this.obstacle.destroy();
      this.addOstacles();
    }
  }
}