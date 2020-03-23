const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#findPatterns(patterns)", function() {

	it("finds files by glob patterns", async function() {
		try {
			fs.writeFileSync(__dirname + "/storage/domain.aaa.1.txt", "", "utf8");
			fs.writeFileSync(__dirname + "/storage/domain.aaa.2.txt", "", "utf8");
			fs.writeFileSync(__dirname + "/storage/domain.bbb.1.txt", "", "utf8");
			fs.writeFileSync(__dirname + "/storage/domain.bbb.2.txt", "", "utf8");
			const files = await store.findPatterns([
				"domain.aaa.*",
				"domain.bbb.1.txt"
			]);
			expect(files).to.deep.equal([
				"domain.aaa.1.txt",
				"domain.aaa.2.txt",
				"domain.bbb.1.txt",
			]);
			fs.unlinkSync(__dirname + "/storage/domain.aaa.1.txt");
			fs.unlinkSync(__dirname + "/storage/domain.aaa.2.txt");
			fs.unlinkSync(__dirname + "/storage/domain.bbb.1.txt");
			fs.unlinkSync(__dirname + "/storage/domain.bbb.2.txt");
		} catch(error) {
			return fail(error);
		}
	});

});