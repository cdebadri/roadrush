import * as constants from '../utils/Constants';

export default class Model {
	constructor(props) {
	  this._score = 0;
	}

	set score(val) {
		this._score = val;
		emitter.emit(constants.SCORE_UPDATED);
	}

	get score() {
		return this._score;
	}
}