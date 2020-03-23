const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#writeFiles(filesOptions)", function() {

	it("writes multiple files", async function() {
		try {
			expect(fs.existsSync(__dirname + "/storage/11.txt")).to.equal(false);
			expect(fs.existsSync(__dirname + "/storage/12.txt")).to.equal(false);
			expect(fs.existsSync(__dirname + "/storage/13.txt")).to.equal(false);
			await store.writeFiles({
				"/11.txt": "eleven",
				"/12.txt": ["twelve", {encode:"utf8"}],
				"/13.txt": "thirteen",
			});
			expect(fs.existsSync(__dirname + "/storage/11.txt")).to.equal(true);
			expect(fs.existsSync(__dirname + "/storage/12.txt")).to.equal(true);
			expect(fs.existsSync(__dirname + "/storage/13.txt")).to.equal(true);
			expect(fs.readFileSync(__dirname + "/storage/11.txt").toString()).to.equal("eleven");
			expect(fs.readFileSync(__dirname + "/storage/12.txt").toString()).to.equal("twelve");
			expect(fs.readFileSync(__dirname + "/storage/13.txt").toString()).to.equal("thirteen");
			rimraf.sync(__dirname + "/storage/11.txt");
			rimraf.sync(__dirname + "/storage/12.txt");
			rimraf.sync(__dirname + "/storage/13.txt");
		} catch(error) {
			return fail(error);
		}
	});

});