export default class Grid {
	constructor(config) {
		this.config = config;

		if (!config.scene) {
			console.error('missing scene');
			return;
		}

		this.scene = config.scene;
		this.config.rows = !config.rows ? 5 : config.rows;
		this.config.cols = !config.cols ? 5 : config.cols;
		this.config.height = !config.height ? game.config.height : config.height;
		this.config.width = !config.width ? game.config.width : config.width;
		this.cwidth = this.config.width / this.config.cols;
		this.cheight = this.config.height / this.config.rows;
	}

	show() {
		this.graphics = this.scene.add.graphics();
		this.graphics.lineStyle(2, 0xff0000);

		console.log(this.config.width);
		for (let i = 0; i < this.config.width; i += this.cwidth) {
			this.graphics.moveTo(i, 0);
			this.graphics.lineTo(i, this.config.height);
		}

		for (let i = 0; i < this.config.height; i += this.cheight) {
			this.graphics.moveTo(0, i);
			this.graphics.lineTo(this.config.height, i);
		}

		this.graphics.strokePath();
	}

	placeAt(x, y, obj) {
		obj.x = x * this.cwidth + this.cwidth / 2;
		obj.y = y * this.cheight + this.cheight / 2; 
	}
}
