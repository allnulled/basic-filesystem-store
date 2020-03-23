const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#ensureFile(file)", function() {

	it("ensures one file", async function() {
		try {
			expect(fs.existsSync(__dirname + "/storage/111.txt")).to.equal(false);
			await store.ensureFile("111.txt");
			expect(fs.existsSync(__dirname + "/storage/111.txt")).to.equal(true);
			rimraf.sync(__dirname + "/storage/111.txt");
		} catch(error) {
			return fail(error);
		}
	});

});