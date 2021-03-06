const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#deleteRecursively(node)", function() {

	it("deletes a node (recursively if required)", async function() {
		try {
			fs.mkdirSync(__dirname + "/storage/1");
			fs.mkdirSync(__dirname + "/storage/1/1");
			fs.mkdirSync(__dirname + "/storage/1/1/1");
			fs.mkdirSync(__dirname + "/storage/1/1/1/1");
			expect(fs.existsSync(__dirname + "/storage/1")).to.equal(true);
			await store.deleteRecursively("1");
			expect(fs.existsSync(__dirname + "/storage/1")).to.equal(false);
		} catch(error) {
			return fail(error);
		}
	});

});