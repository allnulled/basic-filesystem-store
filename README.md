# filesystem-store

Basic filesystem store interface and implementation.

## Install

`$ npm i -s filesystem-store`

## Why?

To have a universal (promise-based) interface to interact with the filesystem.

## Overview

The current API supports this set of methods:

- **Sync:**

    - `store.getPath(node:String)`
    - `store.createReadStream(node:String)`
    - `store.createWriteStream(node:String)`

- **Async:**

    - `store.initialize()`
    - `store.createFolder(node:String)`
    - `store.createFolders(nodes:Array<String>)`
    - `store.deleteFile(node:String)`
    - `store.deleteFiles(nodes:Array<String>)`
    - `store.deleteFolder(node:String)`
    - `store.deleteRecursively(nodes:Array<String>)`
    - `store.describe(node:String)`
    - `store.ensureFile(node:String)`
    - `store.ensureFiles(nodes:Array<String>)`
    - `store.ensureFolder(node:String)`
    - `store.ensureFolders(nodes:Array<String>)`
    - `store.has(node:String)`
    - `store.hasFile(node:String)`
    - `store.hasFolder(node:String)`
    - `store.readFile(node:String, contents:String)`
    - `store.readFolder(node:String)`
    - `store.rename(nodeSrc:String, nodeDst:String)`
    - `store.writeFile(node:String, contents:String, options:String|Object)`
    - `store.writeFiles(nodes:Object<String, String|Object>)`
    - `store.findPatterns(patterns:Array<String>)`

## API reference



### `Store.create(...args):Store`



**Description**:  Creates a new store instance. Read about the constructor of the class for more info.




### `Store.DEFAULT_OPTIONS:Object`



**Description**:  Default values of options. Any property here can be overwritten from the constructor's options.


**Property**:  `basedir:String` - directory used as store.
   - defaults to `process.cwd() + "/_files_"`




### `Store.constructor(options={}:Object):Store`



**Description**:  Method that generates a new store.


**Parameter**:  `options={}:Object` - options that can overwrite properties and methods of the created store.


**Returns**:  `Store` - a new store.




### `Store#initialize():Promise`



**Description**:  Ensures the existence of `basedir` folder.


**Asynchronous**.


**Returns**:  `Promise`




### `Store#getPath(node:String):String`



**Description**:  Returns the full path from an identifier of the node in the store.


**Parameter**:  `node:String` - node identifier, or subpath. Must be inside the folder.


**Returns**:  `String | Error` 


**Throws**:  `new Error("PathOutOfScopeError")` - error indicating that the path is out of the scope of the store. This error is not thrown, but returned.




### `Store#describe(node:String):Promise<Object>`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#has(node:String):Promise<Boolean>`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#hasFile(node:String):Promise<Boolean>`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#hasFolder(node:String):Promise<Boolean>`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#readFile(node:String, options="utf8":String|Object):Promise<String>`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#readFolder(node:String):Promise<String>`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#writeFile(node:String, contents:String|Buffer, options="utf8":String|Object):Promise<String>`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#createFolder(node:String, options={}:String|Object):Promise<String>`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#updateFile(node:String, contents:String, options="utf8":String|Object):Promise<String>`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#deleteFile(node:String):Promise<String>`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#deleteFolder(node:String, options={}:String|Object):Promise<String>`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#rename(oldNode:String, newNode:String):Promise<String>`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#createReadStream(node:String):ReadStream`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#createWriteStream(node:String):WriteStream`



**Description**:  


**Parameter**:  


**Returns**:  


**Throws**:  




### `Store#writeFiles(nodes:Object<String>):Promise<Array<String>>`



**Description**:  Creates multiple files with one operation.


**Parameter**:  `nodes:Object<String>` - map `{ <filename>:<filecontents> }` of files to create.


**Returns**:  `Promise<Array<String>>` - asynchronously, the list of files created.


**Throws**:  error when some file cannot be created.




### `Store#deleteFiles(nodes:Array<String>):Promise<Array<String>>`



**Description**:  Deletes multiple files with one operation.


**Parameter**:  `nodes:Array<String>` - list of files to delete.


**Returns**:  `Promise<Array<String>>` - asynchronously, the list of files deleted.


**Throws**:  error when some file cannot be deleted.




### `Store#createFolders(nodes:Array<String>):Promise<Array<String>>`



**Description**:  Creates multiple folders with one operation.


**Parameter**:  `nodes:Array<String>` - list of folders to create.


**Returns**:  `Promise<Array<String>>` - asynchronously, the list of folders created.


**Throws**:  error when some folder cannot be created.




### `Store#deleteFolders(nodes:Array<String>):Promise<Array<String>>`



**Description**:  Deletes multiple folders with one operation.


**Parameter**:  `nodes:Array<String>` - list of folders to delete.


**Returns**:  `Promise<Array<String>>` - asynchronously, the list of folders deleted.


**Throws**:  error when some folder cannot be deleted.




### `Store#ensureFile(node:String):Promise<String>`



**Description**:  Ensures that a file exists or creates it.


**Parameter**:  `node:String` - file to be ensured.


**Returns**:  `Promise<String>` - asynchronously, the file ensured.


**Throws**:  error when the file cannot be ensured.




### `Store#ensureFiles(nodes:Array<String>):Promise<Array<String>>`



**Description**:  Ensures that some files exist or creates them.


**Parameter**:  `node:Array<String>` - files to be ensured.


**Returns**:  `Promise<Array<String>>` - asynchronously, the files ensured.


**Throws**:  error when the files cannot be ensured.




### `Store#ensureFolder(node:String):Promise<String>`



**Description**:  Ensures that a folder exists or creates it.


**Parameter**:  `node:String` - folder to be ensured.


**Returns**:  `Promise<String>` - asynchronously, the folder ensured.


**Throws**:  error when the folder cannot be ensured.




### `Store#ensureFolders(nodes:Array<String>):Promise<Array<String>>`



**Description**:  Ensures that some folders exist or creates them.


**Parameter**:  `node:String` - folders to be ensured.


**Returns**:  `Promise<String>` - asynchronously, the folders ensured.


**Throws**:  error when the folders cannot be ensured.




### `Store#deleteRecursively(node:String):Promise<String>`



**Description**:  Deletes a node (file or folder) and all its subnodes.


**Parameter**:  `node:String` - node to delete recursively.


**Returns**:  `Promise<String>` - asynchronously, the node deleted.


**Throws**:  error when the node cannot be deleted recursively.




### `Store#findPatterns(patterns:String|Array<String>):Promise<Array<String>>`



**Description**:  Finds nodes by [glob patterns](https://www.npmjs.com/package/glob#glob-primer).


**Parameter**:  `patterns:String|Array<String>` - [glob patterns](https://www.npmjs.com/package/glob#glob-primer) to match.


**Returns**:  `Promise<Array<String>>` - asynchronously, the nodes matched.


**Throws**:  error when the search produces some error.





## License

This project is licensed under [WTFPL](http://www.wtfpl.net/), which means 'do what you want with it'.

## Issues and suggestions

For issues and suggestions, please, [here](https://github.com/allnulled/filesystem-store/issues).

