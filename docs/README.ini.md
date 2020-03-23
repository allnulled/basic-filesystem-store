# filesystem-store

Basic filesystem store interface and implementation.

## Install

`$ npm i -s filesystem-store`

## Why?

To have a universal (promise-based) interface to interact with the filesystem.

## Overview

The current API supports this set of methods:

- **Sync:**

`store.getPath(node:String)`
`store.createReadStream(node:String)`
`store.createWriteStream(node:String)`

- **Async:**

`store.initialize()`
`store.createFolder(node:String)`
`store.createFolders(nodes:Array<String>)`
`store.deleteFile(node:String)`
`store.deleteFiles(nodes:Array<String>)`
`store.deleteFolder(node:String)`
`store.deleteRecursively(nodes:Array<String>)`
`store.describe(node:String)`
`store.ensureFile(node:String)`
`store.ensureFiles(nodes:Array<String>)`
`store.ensureFolder(node:String)`
`store.ensureFolders(nodes:Array<String>)`
`store.has(node:String)`
`store.hasFile(node:String)`
`store.hasFolder(node:String)`
`store.readFile(node:String, contents:String)`
`store.readFolder(node:String)`
`store.rename(nodeSrc:String, nodeDst:String)`
`store.writeFile(node:String, contents:String, options:String|Object)`
`store.writeFiles(nodes:Object<String, String|Object>)`
`store.findPatterns(patterns:Array<String>)`

## API reference

