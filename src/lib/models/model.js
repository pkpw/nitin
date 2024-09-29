export class Model {
	constructor() {
		if (new.target === Model) {
			throw new Error('Cannot instantiate abstract class');
		}
	}

	async fetch() {
		throw new Error("Method 'fetch' must be implemented");
	}

	async save() {
		throw new Error("Method 'save' must be implemented");
	}

	toJSON() {
		throw new Error("Method 'toJSON' must be implemented");
	}

	static fromJSON(json) {
		throw new Error("Static method 'fromJSON' must be implemented");
	}
}
