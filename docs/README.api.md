
### `Store.create(...args):Store`



**Description**:  creates a new store instance. Read about the constructor of the class for more info.




### `Store.DEFAULT_OPTIONS:Object`



**Description**:  default values of options. Any property here can be overwritten from the constructor's options.


**Property**:  `basedir:String` - directory used as store.
   - defaults to `process.cwd() + "/_files_"`




### `Store.constructor(options={}:Object):Store`



**Description**:  method that generates a new store.


**Parameter**:  `options={}:Object` - options that can overwrite properties and methods of the created store.


**Returns**:  `Store` - a new store.




### `Store#initialize():Promise`



**Description**:  ensures the existence of `basedir` folder.


**Asynchronous**.


**Returns**:  `Promise`




### `Store#getPath(node:String):String`



**Description**:  returns the full path from an identifier of the node in the store.


**Parameter**:  `node:String` - node identifier, or subpath. Must be inside the folder.


**Returns**:  `String | Error` 


**Throws**:  `new Error("PathOutOfScopeError")` - error indicating that the path is out of the scope of the store. This error is not thrown, but returned.




### `Store#describe(node:String):Promise<Object>`



**Description**:  returns a [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) object.


**Parameter**:  `node:String`


**Returns**:  asynchronously, a [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) object




### `Store#has(node:String):Promise<Boolean>`



**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




### `Store#hasFile(node:String):Promise<Boolean>`



**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




### `Store#hasFolder(node:String):Promise<Boolean>`



**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




### `Store#readFile(node:String, options="utf8":String|Object):Promise<String>`



**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




### `Store#readFolder(node:String):Promise<String>`



**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




### `Store#writeFile(node:String, contents:String|Buffer, options="utf8":String|Object):Promise<String>`



**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




### `Store#createFolder(node:String, options={}:String|Object):Promise<String>`



**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




### `Store#updateFile(node:String, contents:String, options="utf8":String|Object):Promise<String>`



**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




### `Store#deleteFile(node:String):Promise<String>`



**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




### `Store#deleteFolder(node:String, options={}:String|Object):Promise<String>`



**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




### `Store#rename(oldNode:String, newNode:String):Promise<String>`



**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




### `Store#createReadStream(node:String):ReadStream`



**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




### `Store#createWriteStream(node:String):WriteStream`



**Description**:  @TODO


**Parameter**:  @TODO


**Returns**:  @TODO


**Throws**:  @TODO




### `Store#writeFiles(nodes:Object<String>):Promise<Array<String>>`



**Description**:  creates multiple files with one operation.


**Parameter**:  `nodes:Object<String>` - map `{ <filename>:<filecontents> }` of files to create.


**Returns**:  `Promise<Array<String>>` - asynchronously, the list of files created.


**Throws**:  error when some file cannot be created.




### `Store#deleteFiles(nodes:Array<String>):Promise<Array<String>>`



**Description**:  deletes multiple files with one operation.


**Parameter**:  `nodes:Array<String>` - list of files to delete.


**Returns**:  `Promise<Array<String>>` - asynchronously, the list of files deleted.


**Throws**:  error when some file cannot be deleted.




### `Store#createFolders(nodes:Array<String>):Promise<Array<String>>`



**Description**:  creates multiple folders with one operation.


**Parameter**:  `nodes:Array<String>` - list of folders to create.


**Returns**:  `Promise<Array<String>>` - asynchronously, the list of folders created.


**Throws**:  error when some folder cannot be created.




### `Store#deleteFolders(nodes:Array<String>):Promise<Array<String>>`



**Description**:  deletes multiple folders with one operation.


**Parameter**:  `nodes:Array<String>` - list of folders to delete.


**Returns**:  `Promise<Array<String>>` - asynchronously, the list of folders deleted.


**Throws**:  error when some folder cannot be deleted.




### `Store#ensureFile(node:String):Promise<String>`



**Description**:  ensures that a file exists or creates it.


**Parameter**:  `node:String` - file to be ensured.


**Returns**:  `Promise<String>` - asynchronously, the file ensured.


**Throws**:  error when the file cannot be ensured.




### `Store#ensureFiles(nodes:Array<String>):Promise<Array<String>>`



**Description**:  ensures that some files exist or creates them.


**Parameter**:  `node:Array<String>` - files to be ensured.


**Returns**:  `Promise<Array<String>>` - asynchronously, the files ensured.


**Throws**:  error when the files cannot be ensured.




### `Store#ensureFolder(node:String):Promise<String>`



**Description**:  ensures that a folder exists or creates it.


**Parameter**:  `node:String` - folder to be ensured.


**Returns**:  `Promise<String>` - asynchronously, the folder ensured.


**Throws**:  error when the folder cannot be ensured.




### `Store#ensureFolders(nodes:Array<String>):Promise<Array<String>>`



**Description**:  ensures that some folders exist or creates them.


**Parameter**:  `node:String` - folders to be ensured.


**Returns**:  `Promise<String>` - asynchronously, the folders ensured.


**Throws**:  error when the folders cannot be ensured.




### `Store#deleteRecursively(node:String):Promise<String>`



**Description**:  deletes a node (file or folder) and all its subnodes.


**Parameter**:  `node:String` - node to delete recursively.


**Returns**:  `Promise<String>` - asynchronously, the node deleted.


**Throws**:  error when the node cannot be deleted recursively.




### `Store#findPatterns(patterns:String|Array<String>):Promise<Array<String>>`



**Description**:  finds nodes by [glob patterns](https://www.npmjs.com/package/glob#glob-primer).


**Parameter**:  `patterns:String|Array<String>` - [glob patterns](https://www.npmjs.com/package/glob#glob-primer) to match.


**Returns**:  `Promise<Array<String>>` - asynchronously, the nodes matched.


**Throws**:  error when the search produces some error.



