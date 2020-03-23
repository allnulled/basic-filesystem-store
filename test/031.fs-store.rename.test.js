const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#rename(source, destination)", function() {

	it("renames nodes", async function() {
		try {
			fs.writeFileSync(__dirname + "/storage/1.txt");
			expect(fs.existsSync(__dirname + "/storage/1.txt")).to.equal(true);
			expect(fs.existsSync(__dirname + "/storage/2.txt")).to.equal(false);
			await store.rename("/1.txt", "/2.txt");
			expect(fs.existsSync(__dirname + "/storage/1.txt")).to.equal(false);
			expect(fs.existsSync(__dirname + "/storage/2.txt")).to.equal(true);
			fs.unlinkSync(__dirname + "/storage/2.txt");
		} catch(error) {
			return fail(error);
		}
	});

});