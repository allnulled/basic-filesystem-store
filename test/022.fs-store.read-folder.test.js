const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#readFolder(folder)", function() {

	it("read one folder", async function() {
		try {
			fs.writeFileSync(__dirname + "/storage/1.txt", "1", "utf8");
			fs.writeFileSync(__dirname + "/storage/2.txt", "2", "utf8");
			fs.writeFileSync(__dirname + "/storage/3.txt", "3", "utf8");
			const files = await store.readFolder("");
			expect(files).to.deep.equal(["1.txt","2.txt","3.txt"]);
			fs.unlinkSync(__dirname + "/storage/1.txt");
			fs.unlinkSync(__dirname + "/storage/2.txt");
			fs.unlinkSync(__dirname + "/storage/3.txt");
		} catch(error) {
			return fail(error);
		}
	});

});