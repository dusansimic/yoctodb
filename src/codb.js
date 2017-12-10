const uuid = require('uuid/v4');
const isUUID = require('is-uuid').v4;

function CoDB() {
	this.db = [];
}

CoDB.prototype.insert = function(object) {
	return new Promise((resolve, reject) => {
		if (typeof object !== 'object') {
			return reject(new Error('Object is not of type object!'));
		}

		if (!object.hasOwnProperty('_id')) {
			object._id = uuid();
		}
		if (!isUUID(object._id)) {
			object._id = uuid();
		}

		this.db.push(object);
		resolve(object);
	});
};

CoDB.prototype.find = function(query) {
	return new Promise((resolve, reject) => {
		if (typeof query !== 'object') {
			return reject(new Error('Query is not of type object!'));
		}

		let docs = [];

		for (let i = 0; i < this.db.length; i++) {
			let found = true;
			for (p in query) {
				if (!this.db[i].hasOwnProperty(p) || this.db[i][p] !== query[p]) {
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
}

module.exports = new CoDB();
