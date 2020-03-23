const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#readFile(file, options)", function() {

	it("reads one file", async function() {
		try {
			fs.writeFileSync(__dirname + "/storage/1.txt", "1", "utf8");
			const contents = await store.readFile("/1.txt");
			const contents2 = fs.readFileSync(__dirname + "/storage/1.txt").toString();
			expect(contents).to.equal(contents2);
			fs.unlinkSync(__dirname + "/storage/1.txt");
		} catch(error) {
			return fail(error);
		}
	});

});