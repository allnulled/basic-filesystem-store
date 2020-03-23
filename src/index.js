const fs = require("fs-extra");
const globby = require("globby");
const rimraf = require("rimraf");
const path = require("path");
const _debug = require("debug");
const debug = _debug("filesystem-store");

class Store {

	/**
	 * 
	 * ### `Store.create(...args):Store`
	 * 
	 * @description Creates a new store instance. Read about the constructor of the class for more info.
	 * 
	 */
	static create(...args) {
		return new this(...args);
	}

	/**
	 * 
	 * ### `Store.DEFAULT_OPTIONS:Object`
	 * 
	 * @description Default values of options. Any property here can be overwritten from the constructor's options.
	 * @property `basedir:String` - directory used as store.
	 *    - defaults to `process.cwd() + "/_files_"`
	 * 
	 */
	static get DEFAULT_OPTIONS() {
		return {
			basedir: process.cwd() + "/_files_"
		};
	}

	/**
	 * 
	 * ### `Store.constructor(options={}:Object):Store`
	 * 
	 * @description Method that generates a new store.
	 * @parameter `options={}:Object` - options that can overwrite properties and methods of the created store.
	 * @returns `Store` - a new store.
	 * 
	 */
	constructor(options = {}) {
		Object.assign(this, this.constructor.DEFAULT_OPTIONS, options);
	}

	/**
	 * 
	 * ### `Store#initialize():Promise`
	 * 
	 * @description Ensures the existence of `basedir` folder.
	 * @asynchronous
	 * @returns `Promise`
	 * 
	 */
	initialize() {
		return this
			.hasFolder("")
			.then(result => {
				if(result === false) {
					return this.ensureFolder("");
				}
			});
	}

	/**
	 * 
	 * ### `Store#getPath(node:String):String`
	 * 
	 * @description Returns the full path from an identifier of the node in the store.
	 * @parameter `node:String` - node identifier, or subpath. Must be inside the folder.
	 * @returns `String | Error` 
	 * @throws `new Error("PathOutOfScopeError")` - error indicating that the path is out of the scope of the store. This error is not thrown, but returned.
	 * 
	 */
	getPath(node) {
		const filepath = path.resolve(this.basedir, node.replace(/^\/+/g, ""));
		if(filepath.indexOf(this.basedir) === 0) {
			return filepath;
		}
		return new Error("PathOutOfScopeError");
	}

	/**
	 * 
	 * ### `Store#describe(node:String):Promise<Object>`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
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

	/**
	 * 
	 * ### `Store#has(node:String):Promise<Boolean>`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
	has(node) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			fs.access(filepath, fs.constants.F_OK, (error) => {
				return error ? ok(false) : ok(true);
			});
		});
	}

	/**
	 * 
	 * ### `Store#hasFile(node:String):Promise<Boolean>`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
	hasFile(node) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			fs.lstat(filepath, (error, stats) => {
				if(error) {
					return ok(false);
				}
				return stats.isFile() ? ok(true) : ok(false);
			});
		});
	}

	/**
	 * 
	 * ### `Store#hasFolder(node:String):Promise<Boolean>`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
	hasFolder(node) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			fs.lstat(filepath, (error, stats) => {
				if(error) {
					return ok(false);
				}
				return stats.isDirectory() ? ok(true) : ok(false);
			});
		});
	}

	/**
	 * 
	 * ### `Store#readFile(node:String, options="utf8":String|Object):Promise<String>`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
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

	/**
	 * 
	 * ### `Store#readFolder(node:String):Promise<String>`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
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

	/**
	 * 
	 * ### `Store#writeFile(node:String, contents:String|Buffer, options="utf8":String|Object):Promise<String>`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
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

	/**
	 * 
	 * ### `Store#createFolder(node:String, options={}:String|Object):Promise<String>`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
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

	/**
	 * 
	 * ### `Store#updateFile(node:String, contents:String, options="utf8":String|Object):Promise<String>`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
	updateFile(node, contents, options = "utf8") {
		return new Promise((ok, fail) => {
			this.hasFile(node).then(() => {
				this.writeFile(node, contents, options).then(ok).catch(fail);
			}).catch(fail);
		});
	}

	/**
	 * 
	 * ### `Store#deleteFile(node:String):Promise<String>`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
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

	/**
	 * 
	 * ### `Store#deleteFolder(node:String, options={}:String|Object):Promise<String>`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
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

	/**
	 * 
	 * ### `Store#rename(oldNode:String, newNode:String):Promise<String>`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
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

	/**
	 * 
	 * ### `Store#createReadStream(node:String):ReadStream`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
	createReadStream(node) {
		const filepath = this.getPath(node);
		if(filepath instanceof Error) {
			throw filepath;
		}
		return fs.createReadStream(filepath);
	}

	/**
	 * 
	 * ### `Store#createWriteStream(node:String):WriteStream`
	 * 
	 * @description 
	 * @parameter 
	 * @returns 
	 * @throws 
	 * 
	 */
	createWriteStream(node) {
		const filepath = this.getPath(node);
		if(filepath instanceof Error) {
			throw filepath;
		}
		return fs.createWriteStream(filepath);
	}

	/**
	 * 
	 * ### `Store#writeFiles(nodes:Object<String>):Promise<Array<String>>`
	 * 
	 * @description Creates multiple files with one operation.
	 * @parameter `nodes:Object<String>` - map `{ <filename>:<filecontents> }` of files to create.
	 * @returns `Promise<Array<String>>` - asynchronously, the list of files created.
	 * @throws error when some file cannot be created.
	 * 
	 */
	writeFiles(nodes) {
		return Promise.all(
			Object.keys(nodes).map(filename => {
				const fileparams = nodes[filename]
				if(typeof fileparams === "string") {
					return this.writeFile(filename, fileparams);
				} else {
					return this.writeFile(filename, ...fileparams)
				}
			})
		);
	}

	/**
	 * 
	 * ### `Store#deleteFiles(nodes:Array<String>):Promise<Array<String>>`
	 * 
	 * @description Deletes multiple files with one operation.
	 * @parameter `nodes:Array<String>` - list of files to delete.
	 * @returns `Promise<Array<String>>` - asynchronously, the list of files deleted.
	 * @throws error when some file cannot be deleted.
	 * 
	 */
	deleteFiles(nodes) {
		return Promise.all(
			[].concat(nodes).map(name => {
				return this.deleteFile(name, nodes[name]);
			})
		);
	}

	/**
	 * 
	 * ### `Store#createFolders(nodes:Array<String>):Promise<Array<String>>`
	 * 
	 * @description Creates multiple folders with one operation.
	 * @parameter `nodes:Array<String>` - list of folders to create.
	 * @returns `Promise<Array<String>>` - asynchronously, the list of folders created.
	 * @throws error when some folder cannot be created.
	 * 
	 */
	createFolders(nodes) {
		return Promise.all(
			[].concat(nodes).map(node => this.createFolder(node))
		);
	}

	/**
	 * 
	 * ### `Store#deleteFolders(nodes:Array<String>):Promise<Array<String>>`
	 * 
	 * @description Deletes multiple folders with one operation.
	 * @parameter `nodes:Array<String>` - list of folders to delete.
	 * @returns `Promise<Array<String>>` - asynchronously, the list of folders deleted.
	 * @throws error when some folder cannot be deleted.
	 * 
	 */
	deleteFolders(nodes) {
		return Promise.all(
			[].concat(nodes).map(node => this.deleteFolder(node))
		);
	}

	/**
	 * 
	 * ### `Store#ensureFile(node:String):Promise<String>`
	 * 
	 * @description Ensures that a file exists or creates it.
	 * @parameter `node:String` - file to be ensured.
	 * @returns `Promise<String>` - asynchronously, the file ensured.
	 * @throws error when the file cannot be ensured.
	 * 
	 */
	ensureFile(node) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			return fs.ensureFile(filepath).then(ok).catch(fail);
		});
	}

	/**
	 * 
	 * ### `Store#ensureFiles(nodes:Array<String>):Promise<Array<String>>`
	 * 
	 * @description Ensures that some files exist or creates them.
	 * @parameter `node:Array<String>` - files to be ensured.
	 * @returns `Promise<Array<String>>` - asynchronously, the files ensured.
	 * @throws error when the files cannot be ensured.
	 * 
	 */
	ensureFiles(nodes) {
		return Promise.all(
			[].concat(nodes).map(node => this.ensureFile(node))
		);
	}

	/**
	 * 
	 * ### `Store#ensureFolder(node:String):Promise<String>`
	 * 
	 * @description Ensures that a folder exists or creates it.
	 * @parameter `node:String` - folder to be ensured.
	 * @returns `Promise<String>` - asynchronously, the folder ensured.
	 * @throws error when the folder cannot be ensured.
	 * 
	 */
	ensureFolder(node) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			return fs.ensureDir(filepath).then(ok).catch(fail);
		});
	}
	/**
	 * 
	 * ### `Store#ensureFolders(nodes:Array<String>):Promise<Array<String>>`
	 * 
	 * @description Ensures that some folders exist or creates them.
	 * @parameter `node:String` - folders to be ensured.
	 * @returns `Promise<String>` - asynchronously, the folders ensured.
	 * @throws error when the folders cannot be ensured.
	 * 
	 */
	ensureFolders(nodes) {
		return Promise.all(
			[].concat(nodes).map(node => this.ensureFolder(node))
		);
	}

	/**
	 * 
	 * ### `Store#deleteRecursively(node:String):Promise<String>`
	 * 
	 * @description Deletes a node (file or folder) and all its subnodes.
	 * @parameter `node:String` - node to delete recursively.
	 * @returns `Promise<String>` - asynchronously, the node deleted.
	 * @throws error when the node cannot be deleted recursively.
	 * 
	 */
	deleteRecursively(node, options = {}) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			return rimraf(filepath, {glob: false, ...options}, function() {
				return ok(filepath);
			})
		});
	}

	/**
	 * 
	 * ### `Store#findPatterns(patterns:String|Array<String>):Promise<Array<String>>`
	 * 
	 * @description Finds nodes by [glob patterns](https://www.npmjs.com/package/glob#glob-primer).
	 * @parameter `patterns:String|Array<String>` - [glob patterns](https://www.npmjs.com/package/glob#glob-primer) to match.
	 * @returns `Promise<Array<String>>` - asynchronously, the nodes matched.
	 * @throws error when the search produces some error.
	 * 
	 */
	findPatterns(patterns, options = {}) {
		return new Promise((ok, fail) => {
			const filePatterns = [];
			const userPatterns = [].concat(patterns);
			for(let index = 0; index < userPatterns.length; index++) {
				const safePattern = this.getPath(userPatterns[index]);
				if(safePattern instanceof Error) {
					return fail(safePattern);
				}
				filePatterns[index] = safePattern;
			}
			const searchOptions = {
				gitignore:true,
				...options
			};
			return globby(filePatterns, searchOptions).then(files => {
				return files.map(file => {
					return file.replace(this.basedir, "").replace(/^\//g, "");
				})
			}).then(ok).catch(fail);
		});
	}

}

module.exports = Store;