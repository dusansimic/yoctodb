const uuid = require('uuid/v4');
const isUUID = require('is-uuid').v4;

function YoctoDB() {
	this.db = [];
}

YoctoDB.prototype.insert = function (object) {
	return new Promise((resolve, reject) => {
		if (typeof object !== 'object') {
			return reject(new Error('Object is not of type object!'));
		}

		if (Array.isArray(object)) {
			for (let i = 0; i < object.length; i++) {
				if (!('_id' in object)) {
					object[i]._id = uuid();
				}
				if (!isUUID(object[i]._id)) {
					object[i]._id = uuid();
				}

				this.db.push(object[i]);
			}
			return resolve(object);
		}

		if (!('_id' in object)) {
			object._id = uuid();
		}
		if (!isUUID(object._id)) {
			object._id = uuid();
		}

		this.db.push(object);
		resolve(object);
	});
};

YoctoDB.prototype.find = function (query) {
	return new Promise((resolve, reject) => {
		if (typeof query !== 'object') {
			return reject(new Error('Query is not of type object!'));
		}

		const docs = [];

		for (let i = 0; i < this.db.length; i++) {
			let found = true;
			for (const p in query) {
				if (!(p in this.db[i]) || this.db[i][p] !== query[p]) {
					found = false;
					break;
				}
			}
			if (found) {
				docs.push(this.db[i]);
			}
		}

		resolve(docs);
	});
};

YoctoDB.prototype.update = function (query, data) {
	return new Promise((resolve, reject) => {
		if (typeof query !== 'object') {
			return reject(new Error('Query is not of type object!'));
		}
		if (typeof data !== 'object') {
			return reject(new Error('Data is not of type object!'));
		}

		const docs = [];

		for (let i = 0; i < this.db.length; i++) {
			let found = true;
			for (const p in query) {
				if (!(p in this.db[i]) || this.db[i][p] !== query[p]) {
					found = false;
					break;
				}
			}
			if (found) {
				for (const p in data) {
					if (p in this.db[i]) {
						this.db[i][p] = data[p];
					}
				}
				docs.push(this.db[i]);
			}
		}

		resolve(docs);
	});
};

YoctoDB.prototype.delete = function (query) {
	return new Promise((resolve, reject) => {
		if (typeof query !== 'object') {
			return reject(new Error('Query is not of type object!'));
		}

		const docs = [];

		for (let i = 0; i < this.db.length; i++) {
			let found = true;
			for (const p in query) {
				if (!(p in this.db[i]) || this.db[i][p] !== query[p]) {
					found = false;
					break;
				}
			}
			if (found) {
				this.db.splice(i, 1);
				docs.push(this.db[i]);
			}
		}

		resolve(docs);
	});
};

module.exports = YoctoDB;
