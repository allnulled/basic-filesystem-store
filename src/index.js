const fs = require("fs");
const path = require("path");
const _debug = require("debug");
const debug = _debug("filesystem-store");

class Store {

	static create(...args) {
		return new this(...args);
	}

	static get DEFAULT_OPTIONS() {
		return {
			basedir: __dirname + "/_files_"
		};
	}

	constructor(options = {}) {
		Object.assign(this, this.constructor.DEFAULT_OPTIONS, options);
	}

	initialize() {
		return this.hasFolder("").catch(() => this.createFolder(""));
	}

	getPath(node) {
		const filepath = path.resolve(this.basedir, node.replace(/^\/+/g, ""));
		if(filepath.indexOf(this.basedir) === 0) {
			return filepath;
		}
		return new Error("PathOutOfScopeError");
	}

	describe(node) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			fs.lstat(filepath, (error, stats) => {
				return error ? fail(error) : ok(stats);
			});
		});
	}

	has(node) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			fs.access(filepath, fs.constants.F_OK, (error) => {
				return error ? fail(error) : ok(filepath.replace(this.basedir, ""));
			});
		});
	}

	hasFile(node) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			fs.lstat(filepath, (error, stats) => {
				if(error) {
					return fail(error);
				}
				return stats.isFile() ? ok(filepath.replace(this.basedir, "")) : fail(new Error("NotFileError"));
			});
		});
	}

	hasFolder(node) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			fs.lstat(filepath, (error, stats) => {
				if(error) {
					return fail(error);
				}
				return stats.isDirectory() ? ok(filepath.replace(this.basedir, "")) : fail(new Error("NotFolderError"));
			});
		});
	}

	readFile(node, options = "utf8") {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			fs.readFile(filepath, options, (error, contents) => {
				if(error) {
					return fail(error);
				}
				return ok(contents);
			});
		});
	}

	readFolder(node) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			fs.readdir(filepath, (error, files) => {
				if(error) {
					return fail(error);
				}
				return ok(files);
			});
		});
	}

	writeFile(node, contents, options = "utf8") {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			fs.writeFile(filepath, contents, options, (error) => {
				if(error) {
					return fail(error);
				}
				return ok(filepath.replace(this.basedir, ""));
			});
		});
	}

	createFolder(node, options = {}) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			fs.mkdir(filepath, options, (error) => {
				if(error) {
					return fail(error);
				}
				return ok(filepath.replace(this.basedir, ""));
			});
		});
	}

	updateFile(node, contents, options = "utf8") {
		return new Promise((ok, fail) => {
			this.hasFile(node).then(() => {
				this.writeFile(node, contents, options).then(ok).catch(fail);
			}).catch(fail);
		});
	}

	deleteFile(node) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			fs.unlink(filepath, (error) => {
				if(error) {
					return fail(error);
				}
				return ok(filepath.replace(this.basedir, ""));
			});
		});
	}

	deleteFolder(node, options = {}) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			fs.rmdir(filepath, options, (error) => {
				if(error) {
					return fail(error);
				}
				return ok(filepath.replace(this.basedir, ""));
			});
		});
	}

	rename(oldNode, newNode) {
		return new Promise((ok, fail) => {
			const filepathSrc = this.getPath(oldNode);
			if(filepathSrc instanceof Error) {
				return fail(filepathSrc);
			}
			const filepathDst = this.getPath(newNode);
			if(filepathDst instanceof Error) {
				return fail(filepathDst);
			}
			fs.rename(filepathSrc, filepathDst, (error) => {
				if(error) {
					return fail(error);
				}
				return ok(filepathDst.replace(this.basedir, ""));
			});
		});
	}

	createReadStream(node) {
		const filepath = this.getPath(node);
		if(filepath instanceof Error) {
			throw filepath;
		}
		return fs.createReadStream(filepath);
	}

	createWriteStream(node) {
		const filepath = this.getPath(node);
		if(filepath instanceof Error) {
			throw filepath;
		}
		return fs.createWriteStream(filepath);
	}

}

module.exports = Store;