const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#ensureFiles(files)", function() {

	it("ensures multiple files", async function() {
		try {
			expect(fs.existsSync(__dirname + "/storage/111.txt")).to.equal(false);
			expect(fs.existsSync(__dirname + "/storage/222.txt")).to.equal(false);
			expect(fs.existsSync(__dirname + "/storage/333.txt")).to.equal(false);
			await store.ensureFiles(["111.txt","222.txt","333.txt"]);
			expect(fs.existsSync(__dirname + "/storage/111.txt")).to.equal(true);
			expect(fs.existsSync(__dirname + "/storage/222.txt")).to.equal(true);
			expect(fs.existsSync(__dirname + "/storage/333.txt")).to.equal(true);
			rimraf.sync(__dirname + "/storage/111.txt");
			rimraf.sync(__dirname + "/storage/222.txt");
			rimraf.sync(__dirname + "/storage/333.txt");
		} catch(error) {
			return fail(error);
		}
	});

});