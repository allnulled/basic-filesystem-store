const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#deleteFiles(files)", function() {

	it("deletes multiple files", async function() {
		try {
			fs.writeFileSync(__dirname + "/storage/1.txt", "1", "utf8");
			fs.writeFileSync(__dirname + "/storage/2.txt", "2", "utf8");
			fs.writeFileSync(__dirname + "/storage/3.txt", "3", "utf8");
			expect(fs.existsSync(__dirname + "/storage/1.txt")).to.equal(true);
			await store.deleteFiles(["/1.txt","/2.txt","/3.txt"]);
			expect(fs.existsSync(__dirname + "/storage/1.txt")).to.equal(false);
			expect(fs.existsSync(__dirname + "/storage/2.txt")).to.equal(false);
			expect(fs.existsSync(__dirname + "/storage/3.txt")).to.equal(false);
		} catch(error) {
			return fail(error);
		}
	});

});