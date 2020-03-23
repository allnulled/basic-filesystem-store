const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#ensureFolders(folders)", function() {

	it("ensures multiple folders", async function() {
		try {
			expect(fs.existsSync(__dirname + "/storage/folder111")).to.equal(false);
			expect(fs.existsSync(__dirname + "/storage/folder222")).to.equal(false);
			expect(fs.existsSync(__dirname + "/storage/folder333")).to.equal(false);
			await store.ensureFolders(["folder111","folder222","folder333"]);
			expect(fs.existsSync(__dirname + "/storage/folder111")).to.equal(true);
			expect(fs.existsSync(__dirname + "/storage/folder222")).to.equal(true);
			expect(fs.existsSync(__dirname + "/storage/folder333")).to.equal(true);
			rimraf.sync(__dirname + "/storage/folder111");
			rimraf.sync(__dirname + "/storage/folder222");
			rimraf.sync(__dirname + "/storage/folder333");
		} catch(error) {
			return fail(error);
		}
	});

});