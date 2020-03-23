const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#writeFile(file, contents, options)", function() {

	it("writes one file", async function() {
		try {
			expect(fs.existsSync(__dirname + "/storage/1.txt")).to.equal(false);
			expect(fs.existsSync(__dirname + "/storage/2.txt")).to.equal(false);
			expect(fs.existsSync(__dirname + "/storage/3.txt")).to.equal(false);
			await store.writeFile("/1.txt", "one", "utf8");
			await store.writeFile("/2.txt", "two", "utf8");
			await store.writeFile("/3.txt", "three", "utf8");
			expect(fs.existsSync(__dirname + "/storage/1.txt")).to.equal(true);
			expect(fs.existsSync(__dirname + "/storage/2.txt")).to.equal(true);
			expect(fs.existsSync(__dirname + "/storage/3.txt")).to.equal(true);
			rimraf.sync(__dirname + "/storage/1.txt");
			rimraf.sync(__dirname + "/storage/2.txt");
			rimraf.sync(__dirname + "/storage/3.txt");
		} catch(error) {
			return fail(error);
		}
	});

});