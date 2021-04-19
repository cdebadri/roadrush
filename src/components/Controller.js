import * as C from '../utils/Constants';

export default class Controller {
	constructor() {
	  window.emitter.on(C.SET_SCORE, this.setScore);
	  window.emitter.on(C.UPDATE_POINTS, this.updatePoints);
	}

	setScore(score) {
		model.score = score;
	}

	updatePoints(points) {
		model.score += points;
	}
}