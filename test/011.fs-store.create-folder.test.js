const {
	expect
} = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#createFolder(folder)", function() {

	it("creates one folder", async function() {
		try {
			expect(fs.existsSync(__dirname + "/storage/my-folder")).to.equal(false);
			await store.createFolder("/my-folder");
			expect(fs.existsSync(__dirname + "/storage/my-folder")).to.equal(true);
			rimraf.sync(__dirname + "/storage/my-folder");
		} catch (error) {
			return fail(error);
		}
	});

});