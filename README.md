# universal-filesystem-store

Basic filesystem store interface and implementation.

## Install

`$ npm i -s universal-filesystem-store`

## Why?

To have a universal (promise-based) interface to interact with the filesystem.

To have a universal safe interface to interact with the filesystem.

## Overview

### Goal

The API is aimed to support the following features, and serve as a universal interface
based in promises to interact with a filesystem-like data exchanger:

  - operate under safe nodes (specially when `"/"` and `".."` come into play)
  - initialize stores
  - create paths
  - create streams
  - create folders and files
  - ensure folders and files
  - read folders and files
  - write folders and files
  - update folders and files
  - delete folders and files
  - rename folders and files
  - check the existence folders and files
  - find folders and files by patterns

### Current state

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



----

### Store.create(...args):Store



**Static Method**.


**Synchronous**.


**Description**:  creates a new store instance. Read about the constructor of the class for more info.




----

### Store.DEFAULT_OPTIONS:Object



**Static Property**.


**Description**:  default values of options. Any property here can be overwritten from the constructor's options.


**Property**:  `basedir:String` - directory used as store.
   - defaults to `process.cwd() + "/_files_"`




----

### Store.constructor(options={}:Object):Store



**Constructor**.


**Description**:  method that generates a new store.


**Parameter**:  `options={}:Object` - options that can overwrite properties and methods of the created store.


**Returns**:  `Store` - a new store.




----

### Store#initialize():Promise



**Method**.


**Asynchronous**: 





**Description**:  ensures the existence of `basedir` folder.


**Returns**:  `Promise`


**Throws**:  when folder cannot be ensured.




----

### Store#getPath(node:String):String



**Method**.


**Synchronous**.


**Description**:  returns the full path from an identifier of the node in the store.


**Parameter**:  `node:String` - node identifier, or subpath. Must be inside the folder.


**Returns**:  `filepath:String | Error` - full path of the file, or an object error. Must be checked once returned.


**Throws**:  when node is out of bounds.




----

### Store#describe(node:String):Promise<Object>



**Method**.


**Asynchronous**.


**Description**:  returns a [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) object.


**Parameter**:  `node:String` - node to describe.


**Returns**:  `Promise<stats:Object>` a [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) object of the node.


**Throws**:  when no node is found.


 when node is out of bounds.




----

### Store#has(node:String):Promise<Boolean>



**Method**.


**Asynchronous**.


**Description**:  checks if a node exists in the store


**Parameter**:  `node:String` - node suposed to exist.


**Returns**:  `Promise<hasNode:Boolean>` - result of the check.


**Throws**:  when node is out of bounds.




----

### Store#hasFile(node:String):Promise<Boolean>



**Method**.


**Asynchronous**.


**Description**:  checks if a node exists in the store as a file


**Parameter**:  `node:String` - node suposed to be a file or not.


**Returns**:  `Promise<hasFile:Boolean>` - result of the check.


**Throws**:  when node is out of bounds.




----

### Store#hasFolder(node:String):Promise<Boolean>



**Method**.


**Asynchronous**.


**Description**:  check if a node exists in the store as a folder


**Parameter**:  `node:String` - node suposed to be a folder or not.


**Returns**:  `Promise<hasFolder:Boolean>` - result of the check.


**Throws**:  when node is out of bounds.




----

### Store#readFile(node:String, options="utf8":String|Object):Promise<String>



**Method**.


**Asynchronous**.


**Description**:  reads a file and returns its contents.


**Parameter**:  `node:String` - node to be read as file.


 `options:Object` - options of the file reading.


**Returns**:  `Promise<contents:String>` - the contents of the file.


**Throws**:  when node is out of bounds.


 when file cannot be read.




----

### Store#readFolder(node:String):Promise<String>



**Method**.


**Asynchronous**.


**Description**:  reads a folder and returns its contents (files and folders).


**Parameter**:  `node:String` - node to be read as folder.


**Returns**:  `Promise<nodes:Array<String>>` - nodes inside the folder.


**Throws**:  when node is out of bounds.


 when folder cannot be read.




----

### Store#writeFile(node:String, contents:String|Buffer, options="utf8":String|Object):Promise<String>



**Method**.


**Asynchronous**.


**Description**:  writes contents to a file based in some options.


**Parameter**:  `node:String` - node to be written as file.


 `contents:String|Buffer` - contents to be written.


 `options:String|Object` - options of the writing.


**Returns**:  `Promise<filepath:String>` - node overwritten.


**Throws**:  when node is out of bounds.


 when file cannot be written.




----

### Store#createFolder(node:String, options={}:String|Object):Promise<String>



**Method**.


**Asynchronous**.


**Description**:  creates a folder.


**Parameter**:  `node:String` - node to create as folder.


 `options:Object` - options of the creation.


**Returns**:  `filepath:String` - node created.


**Throws**:  when node is out of bounds.


 when folder cannot be created.




----

### Store#updateFile(node:String, contents:String, options="utf8":String|Object):Promise<String>



**Method**.


**Asynchronous**.


**Description**:  if a file exists (1), it updates its content. Otherwise, it fails.


**Parameter**:  `node:String` - node to be updated.


 `contents:String|Buffer` - contents to write.


 `options:String|Object` - options of the writing.


**Returns**:  `Promise`


**Throws**:  when node is not a file.


 when node is out of bounds.


 when file cannot be written.




----

### Store#deleteFile(node:String):Promise<String>



**Method**.


**Asynchronous**.


**Description**:  deletes a node as file.


**Parameter**:  `node:String` - node to be deleted as file.


**Returns**:  `filepath:String` - node deleted.


**Throws**:  when the node is out of bounds.


 when the file cannot be deleted.




----

### Store#deleteFolder(node:String, options={}:String|Object):Promise<String>



**Method**.


**Asynchronous**.


**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




----

### Store#ensureFile(node:String):Promise<String>



**Method**.


**Asynchronous**.


**Description**:  ensures that a file exists or creates it.


**Parameter**:  `node:String` - file to be ensured.


**Returns**:  `Promise<String>` - the file ensured.


**Throws**:  when the node is out of bounds.


 when the file cannot be ensured.




----

### Store#ensureFolder(node:String):Promise<String>



**Method**.


**Asynchronous**.


**Description**:  ensures that a folder exists or creates it.


**Parameter**:  `node:String` - folder to be ensured.


**Returns**:  `Promise<String>` - the folder ensured.


**Throws**:  when the node is out of bounds.


 when the folder cannot be ensured.




----

### Store#rename(oldNode:String, newNode:String):Promise<String>



**Method**.


**Asynchronous**.


**Description**:  renames or moves a node.


**Parameter**:  `oldNode:String` - node source.


 `newNode:String` - node destination.


**Returns**:  `Promise<nodeDestination:String>` - node destination.


**Throws**:  when node cannot be renamed.


 when a node is out of bounds.




----

### Store#createReadStream(node:String):ReadStream



**Method**.


**Asynchronous**.


**Description**:  creates a node readable stream


**Parameter**:  `node:String` - node to create the stream from.


**Returns**:  `readable:Stream` - readable stream of the node.


**Throws**:  when node is out of bounds.


 when stream cannot be created.




----

### Store#createWriteStream(node:String):WriteStream



**Method**.


**Asynchronous**.


**Description**:  creates a node writable stream


**Parameter**:  `node:String` - node to create the stream from.


**Returns**:  `writable:Stream` - writable stream of the node.


**Throws**:  when node is out of bounds.


 when stream cannot be created.




----

### Store#writeFiles(nodes:Object<String>):Promise<Array<String>>



**Method**.


**Asynchronous**.


**Description**:  creates multiple files with one operation.


**Parameter**:  `nodes:Object<String>` - map `{ <filename>:<filecontents> }` of files to create.


**Returns**:  `Promise`


**Throws**:  when a node is out of bounds.


 when some file cannot be created.




----

### Store#deleteFiles(nodes:Array<String>):Promise<Array<String>>



**Method**.


**Asynchronous**.


**Description**:  deletes multiple files with one operation.


**Parameter**:  `nodes:Array<String>` - list of files to delete.


**Returns**:  `Promise`


**Throws**:  when a node is out of bounds.


 when some file cannot be deleted.




----

### Store#createFolders(nodes:Array<String>):Promise<Array<String>>



**Method**.


**Asynchronous**.


**Description**:  creates multiple folders with one operation.


**Parameter**:  `nodes:Array<String>` - list of folders to create.


**Returns**:  `Promise`


**Throws**:  when a node is out of bounds.


 when some folder cannot be created.




----

### Store#deleteFolders(nodes:Array<String>):Promise<Array<String>>



**Method**.


**Asynchronous**.


**Description**:  deletes multiple folders with one operation.


**Parameter**:  `nodes:Array<String>` - list of folders to delete.


**Returns**:  `Promise`


**Throws**:  when a node is out of bounds.


 when some folder cannot be deleted.




----

### Store#ensureFiles(nodes:Array<String>):Promise<Array<String>>



**Method**.


**Asynchronous**.


**Description**:  ensures that some files exist or creates them.


**Parameter**:  `node:Array<String>` - files to be ensured.


**Returns**:  `Promise<Array<String>>` - the files ensured.


**Throws**:  when a node is out of bounds.


 when the files cannot be ensured.




----

### Store#ensureFolders(nodes:Array<String>):Promise<Array<String>>



**Method**.


**Asynchronous**.


**Description**:  ensures that some folders exist or creates them.


**Parameter**:  `node:String` - folders to be ensured.


**Returns**:  `Promise<String>` - the folders ensured.


**Throws**:  when a node is out of bounds.


 when the folders cannot be ensured.




----

### Store#deleteRecursively(node:String):Promise<String>



**Method**.


**Asynchronous**.


**Description**:  deletes a node (file or folder) and all its subnodes.


**Parameter**:  `node:String` - node to delete recursively.


**Returns**:  `Promise<String>` - the node to delete recursively.


**Throws**:  when the node is out of bounds.


 when the node cannot be deleted recursively.




----

### Store#findPatterns(patterns:String|Array<String>):Promise<Array<String>>



**Method**.


**Asynchronous**.


**Description**:  finds nodes by [glob patterns](https://www.npmjs.com/package/glob#glob-primer).


**Parameter**:  `patterns:String|Array<String>` - [glob patterns](https://www.npmjs.com/package/glob#glob-primer) to match.


**Returns**:  `Promise<Array<String>>` - the nodes matched.


**Throws**:  when a node is out of bounds.


 when the search produces some error.





## License

This project is licensed under [WTFPL](http://www.wtfpl.net/), which means 'do what you want with it'.

## Issues and suggestions

For issues and suggestions, please, [here](https://github.com/allnulled/filesystem-store/issues).

