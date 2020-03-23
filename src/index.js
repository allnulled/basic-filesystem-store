const fs = require("fs-extra");
const globby = require("globby");
const rimraf = require("rimraf");
const path = require("path");
const _debug = require("debug");
const debug = _debug("filesystem-store");

class StoreInterface {

	/**
	 * 
	 * ----
	 * 
	 * ### Store.create(...args):Store
	 * 
	 * @static-method
	 * @synchronous
	 * @description creates a new store instance. Read about the constructor of the class for more info.
	 * 
	 */
	static create(...args) {
		return new this(...args);
	}

	/**
	 * 
	 * ----
	 * 
	 * ### Store.DEFAULT_OPTIONS:Object
	 * 
	 * @static-property
	 * @description default values of options. Any property here can be overwritten from the constructor's options.
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
	 * ----
	 * 
	 * ### Store.constructor(options={}:Object):Store
	 * 
	 * @constructor
	 * @description method that generates a new store.
	 * @parameter
	 * @parameter  - `options={}:Object` - options that can overwrite properties and methods of the created store.
	 * @returns `Store` - a new store.
	 * 
	 */
	constructor(options = {}) {
		Object.assign(this, this.constructor.DEFAULT_OPTIONS, options);
	}
	initialize() {
		throw new Error("MethodNotSupportedError");
	}
	getPath() {
		throw new Error("MethodNotSupportedError");
	}
	describe() {
		throw new Error("MethodNotSupportedError");
	}
	has() {
		throw new Error("MethodNotSupportedError");
	}
	hasFile() {
		throw new Error("MethodNotSupportedError");
	}
	hasFolder() {
		throw new Error("MethodNotSupportedError");
	}
	readFile() {
		throw new Error("MethodNotSupportedError");
	}
	readFolder() {
		throw new Error("MethodNotSupportedError");
	}
	writeFile() {
		throw new Error("MethodNotSupportedError");
	}
	createFolder() {
		throw new Error("MethodNotSupportedError");
	}
	updateFile() {
		throw new Error("MethodNotSupportedError");
	}
	deleteFile() {
		throw new Error("MethodNotSupportedError");
	}
	deleteFolder() {
		throw new Error("MethodNotSupportedError");
	}
	ensureFile() {
		throw new Error("MethodNotSupportedError");
	}
	ensureFolder() {
		throw new Error("MethodNotSupportedError");
	}
	rename() {
		throw new Error("MethodNotSupportedError");
	}
	createReadStream() {
		throw new Error("MethodNotSupportedError");
	}
	createWriteStream() {
		throw new Error("MethodNotSupportedError");
	}
	writeFiles() {
		throw new Error("MethodNotSupportedError");
	}
	deleteFiles() {
		throw new Error("MethodNotSupportedError");
	}
	createFolders() {
		throw new Error("MethodNotSupportedError");
	}
	deleteFolders() {
		throw new Error("MethodNotSupportedError");
	}
	ensureFiles() {
		throw new Error("MethodNotSupportedError");
	}
	ensureFolders() {
		throw new Error("MethodNotSupportedError");
	}
	deleteRecursively() {
		throw new Error("MethodNotSupportedError");
	}
	findPatterns() {
		throw new Error("MethodNotSupportedError");
	}

}

class Store extends StoreInterface {

	/**
	 * 
	 * ----
	 * 
	 * ### Store.ORIGINAL_INTERFACE
	 * 
	 * @static-property
	 * @description best class to inherit from if you want to develop your own store.
	 * 
	 */
	static get ORIGINAL_INTERFACE() {
		return StoreInterface;
	}

	/**
	 * 
	 * ----
	 * 
	 * ### Store#initialize():Promise
	 * 
	 * @method
	 * @asynchronous
	 * @description ensures the existence of `basedir` folder.
	 * @asynchronous
	 * @returns `Promise`
	 * @throws
	 * @throws  - when folder cannot be ensured.
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
	 * ----
	 * 
	 * ### Store#getPath(node:String):String
	 * 
	 * @method
	 * @synchronous
	 * @description returns the full path from an identifier of the node in the store.
	 * @parameter
	 * @parameter  - `node:String` - node identifier, or subpath. Must be inside the folder.
	 * @returns `filepath:String | Error` - full path of the file, or an object error. Must be checked once returned.
	 * @throws
	 * @throws  - when node is out of bounds.
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
	 * ----
	 * 
	 * ### Store#describe(node:String):Promise<Object>
	 * 
	 * @method
	 * @asynchronous
	 * @description returns a [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) object.
	 * @parameter
	 * @parameter  - `node:String` - node to describe.
	 * @returns `Promise<stats:Object>` a [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) object of the node.
	 * @throws
	 * @throws  - when no node is found.
	 * @throws  - when node is out of bounds.
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
	 * ----
	 * 
	 * ### Store#has(node:String):Promise<Boolean>
	 * 
	 * @method
	 * @asynchronous
	 * @description checks if a node exists in the store
	 * @parameter
	 * @parameter  - `node:String` - node suposed to exist.
	 * @returns `Promise<hasNode:Boolean>` - result of the check.
	 * @throws
	 * @throws  - when node is out of bounds.
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
	 * ----
	 * 
	 * ### Store#hasFile(node:String):Promise<Boolean>
	 * 
	 * @method
	 * @asynchronous
	 * @description checks if a node exists in the store as a file
	 * @parameter
	 * @parameter  - `node:String` - node suposed to be a file or not.
	 * @returns `Promise<hasFile:Boolean>` - result of the check.
	 * @throws
	 * @throws  - when node is out of bounds.
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
	 * ----
	 * 
	 * ### Store#hasFolder(node:String):Promise<Boolean>
	 * 
	 * @method
	 * @asynchronous
	 * @description check if a node exists in the store as a folder
	 * @parameter
	 * @parameter  - `node:String` - node suposed to be a folder or not.
	 * @returns `Promise<hasFolder:Boolean>` - result of the check.
	 * @throws
	 * @throws  - when node is out of bounds.
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
	 * ----
	 * 
	 * ### Store#readFile(node:String, options="utf8":String|Object):Promise<String>
	 * 
	 * @method
	 * @asynchronous
	 * @description reads a file and returns its contents.
	 * @parameter
	 * @parameter  - `node:String` - node to be read as file.
	 * @parameter  - `options:Object` - options of the file reading.
	 * @returns `Promise<contents:String>` - the contents of the file.
	 * @throws
	 * @throws  - when node is out of bounds.
	 * @throws  - when file cannot be read.
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
	 * ----
	 * 
	 * ### Store#readFolder(node:String):Promise<String>
	 * 
	 * @method
	 * @asynchronous
	 * @description reads a folder and returns its contents (files and folders).
	 * @parameter
	 * @parameter  - `node:String` - node to be read as folder.
	 * @returns `Promise<nodes:Array<String>>` - nodes inside the folder.
	 * @throws
	 * @throws  - when node is out of bounds.
	 * @throws  - when folder cannot be read.
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
	 * ----
	 * 
	 * ### Store#writeFile(node:String, contents:String|Buffer, options="utf8":String|Object):Promise<String>
	 * 
	 * @method
	 * @asynchronous
	 * @description writes contents to a file based in some options.
	 * @parameter
	 * @parameter  - `node:String` - node to be written as file.
	 * @parameter  - `contents:String|Buffer` - contents to be written.
	 * @parameter  - `options:String|Object` - options of the writing.
	 * @returns `Promise<filepath:String>` - node overwritten.
	 * @throws
	 * @throws  - when node is out of bounds.
	 * @throws  - when file cannot be written.
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
	 * ----
	 * 
	 * ### Store#createFolder(node:String, options={}:String|Object):Promise<String>
	 * 
	 * @method
	 * @asynchronous
	 * @description creates a folder.
	 * @parameter
	 * @parameter  - `node:String` - node to create as folder.
	 * @parameter  - `options:Object` - options of the creation.
	 * @returns `filepath:String` - node created.
	 * @throws
	 * @throws  - when node is out of bounds.
	 * @throws  - when folder cannot be created.
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
	 * ----
	 * 
	 * ### Store#updateFile(node:String, contents:String, options="utf8":String|Object):Promise<String>
	 * 
	 * @method
	 * @asynchronous
	 * @description if a file exists (1), it updates its content. Otherwise, it fails.
	 * @parameter
	 * @parameter  - `node:String` - node to be updated.
	 * @parameter  - `contents:String|Buffer` - contents to write.
	 * @parameter  - `options:String|Object` - options of the writing.
	 * @returns `Promise`
	 * @throws
	 * @throws  - when node is not a file.
	 * @throws  - when node is out of bounds.
	 * @throws  - when file cannot be written.
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
	 * ----
	 * 
	 * ### Store#deleteFile(node:String):Promise<String>
	 * 
	 * @method
	 * @asynchronous
	 * @description deletes a node as file.
	 * @parameter
	 * @parameter  - `node:String` - node to be deleted as file.
	 * @returns `filepath:String` - node deleted.
	 * @throws
	 * @throws  - when the node is out of bounds.
	 * @throws  - when the file cannot be deleted.
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
	 * ----
	 * 
	 * ### Store#deleteFolder(node:String, options={}:String|Object):Promise<String>
	 * 
	 * @method
	 * @asynchronous
	 * @description deletes a node as folder
	 * @parameter
	 * @parameter  - `node:String` - node to delete as folder
	 * @parameter  - `options:Object` - options of the deletion
	 * @returns `Promise<folder:String>` - folder to delete.
	 * @throws
	 * @throws  - when node is out of bounds.
	 * @throws  - when folder cannot be deleted.
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
	 * ----
	 * 
	 * ### Store#ensureFile(node:String):Promise<String>
	 * 
	 * @method
	 * @asynchronous
	 * @description ensures that a file exists or creates it.
	 * @parameter
	 * @parameter  - `node:String` - file to be ensured.
	 * @returns `Promise<String>` - the file ensured.
	 * @throws
	 * @throws  - when the node is out of bounds.
	 * @throws  - when the file cannot be ensured.
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
	 * ----
	 * 
	 * ### Store#ensureFolder(node:String):Promise<String>
	 * 
	 * @method
	 * @asynchronous
	 * @description ensures that a folder exists or creates it.
	 * @parameter
	 * @parameter  - `node:String` - folder to be ensured.
	 * @returns `Promise<String>` - the folder ensured.
	 * @throws
	 * @throws  - when the node is out of bounds.
	 * @throws  - when the folder cannot be ensured.
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
	 * ----
	 * 
	 * ### Store#rename(oldNode:String, newNode:String):Promise<String>
	 * 
	 * @method
	 * @asynchronous
	 * @description renames or moves a node.
	 * @parameter
	 * @parameter  - `oldNode:String` - node source.
	 * @parameter  - `newNode:String` - node destination.
	 * @returns `Promise<nodeDestination:String>` - node destination.
	 * @throws
	 * @throws  - when node cannot be renamed.
	 * @throws  - when a node is out of bounds.
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
	 * ----
	 * 
	 * ### Store#createReadStream(node:String):ReadStream
	 * 
	 * @method
	 * @asynchronous
	 * @description creates a node readable stream
	 * @parameter
	 * @parameter  - `node:String` - node to create the stream from.
	 * @returns `readable:Stream` - readable stream of the node.
	 * @throws
	 * @throws  - when node is out of bounds.
	 * @throws  - when stream cannot be created.
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
	 * ----
	 * 
	 * ### Store#createWriteStream(node:String):WriteStream
	 * 
	 * @method
	 * @asynchronous
	 * @description creates a node writable stream
	 * @parameter
	 * @parameter  - `node:String` - node to create the stream from.
	 * @returns `writable:Stream` - writable stream of the node.
	 * @throws
	 * @throws  - when node is out of bounds.
	 * @throws  - when stream cannot be created.
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
	 * ----
	 * 
	 * ### Store#writeFiles(nodes:Object<String>):Promise<Array<String>>
	 * 
	 * @method
	 * @asynchronous
	 * @description creates multiple files with one operation.
	 * @parameter
	 * @parameter  - `nodes:Object<String>` - map `{ <filename>:<filecontents> }` of files to create.
	 * @returns `Promise`
	 * @throws
	 * @throws  - when a node is out of bounds.
	 * @throws  - when some file cannot be created.
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
	 * ----
	 * 
	 * ### Store#deleteFiles(nodes:Array<String>):Promise<Array<String>>
	 * 
	 * @method
	 * @asynchronous
	 * @description deletes multiple files with one operation.
	 * @parameter
	 * @parameter  - `nodes:Array<String>` - list of files to delete.
	 * @returns `Promise`
	 * @throws
	 * @throws  - when a node is out of bounds.
	 * @throws  - when some file cannot be deleted.
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
	 * ----
	 * 
	 * ### Store#createFolders(nodes:Array<String>):Promise<Array<String>>
	 * 
	 * @method
	 * @asynchronous
	 * @description creates multiple folders with one operation.
	 * @parameter
	 * @parameter  - `nodes:Array<String>` - list of folders to create.
	 * @returns `Promise`
	 * @throws
	 * @throws  - when a node is out of bounds.
	 * @throws  - when some folder cannot be created.
	 * 
	 */
	createFolders(nodes) {
		return Promise.all(
			[].concat(nodes).map(node => this.createFolder(node))
		);
	}

	/**
	 * 
	 * ----
	 * 
	 * ### Store#deleteFolders(nodes:Array<String>):Promise<Array<String>>
	 * 
	 * @method
	 * @asynchronous
	 * @description deletes multiple folders with one operation.
	 * @parameter
	 * @parameter  - `nodes:Array<String>` - list of folders to delete.
	 * @returns `Promise`
	 * @throws
	 * @throws  - when a node is out of bounds.
	 * @throws  - when some folder cannot be deleted.
	 * 
	 */
	deleteFolders(nodes) {
		return Promise.all(
			[].concat(nodes).map(node => this.deleteFolder(node))
		);
	}

	/**
	 * 
	 * ----
	 * 
	 * ### Store#ensureFiles(nodes:Array<String>):Promise<Array<String>>
	 * 
	 * @method
	 * @asynchronous
	 * @description ensures that some files exist or creates them.
	 * @parameter
	 * @parameter  - `node:Array<String>` - files to be ensured.
	 * @returns `Promise<Array<String>>` - the files ensured.
	 * @throws
	 * @throws  - when a node is out of bounds.
	 * @throws  - when the files cannot be ensured.
	 * 
	 */
	ensureFiles(nodes) {
		return Promise.all(
			[].concat(nodes).map(node => this.ensureFile(node))
		);
	}
	/**
	 * 
	 * ----
	 * 
	 * ### Store#ensureFolders(nodes:Array<String>):Promise<Array<String>>
	 * 
	 * @method
	 * @asynchronous
	 * @description ensures that some folders exist or creates them.
	 * @parameter
	 * @parameter  - `node:String` - folders to be ensured.
	 * @returns `Promise<String>` - the folders ensured.
	 * @throws
	 * @throws  - when a node is out of bounds.
	 * @throws  - when the folders cannot be ensured.
	 * 
	 */
	ensureFolders(nodes) {
		return Promise.all(
			[].concat(nodes).map(node => this.ensureFolder(node))
		);
	}

	/**
	 * 
	 * ----
	 * 
	 * ### Store#deleteRecursively(node:String):Promise<String>
	 * 
	 * @method
	 * @asynchronous
	 * @description deletes a node (file or folder) and all its subnodes.
	 * @parameter
	 * @parameter  - `node:String` - node to delete recursively.
	 * @returns `Promise<String>` - the node to delete recursively.
	 * @throws
	 * @throws  - when the node is out of bounds.
	 * @throws  - when the node cannot be deleted recursively.
	 * 
	 */
	deleteRecursively(node, options = {}) {
		return new Promise((ok, fail) => {
			const filepath = this.getPath(node);
			if(filepath instanceof Error) {
				return fail(filepath);
			}
			return rimraf(filepath, {glob: false, ...options}, () => {
				return ok(filepath.replace(this.basedir, ""));
			})
		});
	}

	/**
	 * 
	 * ----
	 * 
	 * ### Store#findPatterns(patterns:String|Array<String>):Promise<Array<String>>
	 * 
	 * @method
	 * @asynchronous
	 * @description finds nodes by [glob patterns](https://www.npmjs.com/package/glob#glob-primer).
	 * @parameter
	 * @parameter  - `patterns:String|Array<String>` - [glob patterns](https://www.npmjs.com/package/glob#glob-primer) to match.
	 * @returns `Promise<Array<String>>` - the nodes matched.
	 * @throws
	 * @throws  - when a node is out of bounds.
	 * @throws  - when the search produces some error.
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