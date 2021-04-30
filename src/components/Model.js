import * as constants from '../utils/Constants';

export default class Model {
	constructor(props) {
	  this._score = 0;
	  this._soundOn = true;
	}

	set soundOn(val) {
		this._soundOn = val;
		emitter.emit('SOUND_SETTINGS_CHANGED');
	}

	get soundOn() {
		return this._soundOn;
	}

	set score(val) {
		this._score = val;
		emitter.emit(constants.SCORE_UPDATED);
	}

	get score() {
		return this._score;
	}
}