const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#ensureFolder(folder)", function() {

	it("ensures one folder", async function() {
		try {
			expect(fs.existsSync(__dirname + "/storage/folder-111")).to.equal(false);
			await store.ensureFolder("folder-111");
			expect(fs.existsSync(__dirname + "/storage/folder-111")).to.equal(true);
			rimraf.sync(__dirname + "/storage/folder-111");
		} catch(error) {
			return fail(error);
		}
	});

});