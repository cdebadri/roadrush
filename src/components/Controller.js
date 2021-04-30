import * as C from '../utils/Constants';

export default class Controller {
	constructor() {
	  window.emitter.on(C.SET_SCORE, this.setScore);
	  window.emitter.on(C.UPDATE_POINTS, this.updatePoints);
	  window.emitter.on('CHANGE_SOUND_SETTINGS', this.updateSound);
	}

	updateSound() {
		model.soundOn = !model.soundOn;
	}

	setScore(score) {
		model.score = score;
	}

	updatePoints(points) {
		model.score += points;
	}
}