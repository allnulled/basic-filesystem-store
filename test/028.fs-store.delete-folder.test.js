const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#deleteFolder(folder)", function() {

	it("deletes one folder", async function() {
		try {
			expect(fs.existsSync(__dirname + "/storage/1")).to.equal(false);
			fs.mkdirSync(__dirname + "/storage/1");
			expect(fs.existsSync(__dirname + "/storage/1")).to.equal(true);
			await store.deleteFolder("/1");
			expect(fs.existsSync(__dirname + "/storage/1")).to.equal(false);
		} catch(error) {
			return fail(error);
		}
	});

});