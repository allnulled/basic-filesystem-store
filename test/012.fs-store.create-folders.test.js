const {
	expect
} = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#createFolders(folders)", function() {

	it("creates multiple folders", async function() {
		try {
			expect(fs.existsSync(__dirname + "/storage/storage-1")).to.equal(false);
			expect(fs.existsSync(__dirname + "/storage/storage-2")).to.equal(false);
			expect(fs.existsSync(__dirname + "/storage/storage-3")).to.equal(false);
			await store.createFolders(["/storage-1", "/storage-2", "/storage-3"])
			expect(fs.existsSync(__dirname + "/storage/storage-1")).to.equal(true);
			expect(fs.existsSync(__dirname + "/storage/storage-2")).to.equal(true);
			expect(fs.existsSync(__dirname + "/storage/storage-3")).to.equal(true);
			rimraf.sync(__dirname + "/storage/storage-1");
			rimraf.sync(__dirname + "/storage/storage-2");
			rimraf.sync(__dirname + "/storage/storage-3");
		} catch (error) {
			return fail(error);
		}
	});

});