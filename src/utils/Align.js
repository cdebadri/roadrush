module.exports = {
	scaleToGameW: (obj, per) => {
		obj.displayWidth = game.config.width * per;
		obj.scaleY = obj.scaleX;
	},

	center: (obj) => {
		obj.x = game.config.width / 2;
		obj.y = game.config.height / 2;
	},

	checkCollide: (obj1, obj2) => {
		const distX = Math.abs(obj1.x - obj2.x);
		const distY = Math.abs(obj1.y - obj2.y);

		if (distX < obj1.width / 2 && distY < obj1.height / 2) {
			return true;
		}

		return false;
	}
}