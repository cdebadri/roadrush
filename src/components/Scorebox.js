import * as Phaser from 'phaser';
import * as constants from '../utils/Constants';

export default class Scorebox extends Phaser.GameObjects.Container {
	constructor(config) {
		super(config.scene);

		this.scene = config.scene;
		this.text1 = this.scene.add.text(0, 0, `SCORE\n${model.score}`);
		this.text1.setOrigin(0.5, 0.5);
		this.add(this.text1);

		this.scene.add.existing(this);
		emitter.on(constants.SCORE_UPDATED, this.scoreUpdated, this);
	}

	scoreUpdated() {
		this.text1.setText(['SCORE', model.score]);
	}
}