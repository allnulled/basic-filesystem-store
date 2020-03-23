const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#deleteFile(file)", function() {

	it("deletes one file", async function() {
		try {
			fs.writeFileSync(__dirname + "/storage/1.txt", "1", "utf8");
			expect(fs.existsSync(__dirname + "/storage/1.txt")).to.equal(true);
			await store.deleteFile("/1.txt")
			expect(fs.existsSync(__dirname + "/storage/1.txt")).to.equal(false);
		} catch(error) {
			return fail(error);
		}
	});

});