const {
	expect
} = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#initialize()", function() {

	it("initializes storage", async function() {
		try {
			rimraf.sync(__dirname + "/storage")
			expect(fs.existsSync(__dirname + "/storage")).to.equal(false);
			await store.initialize()
			expect(fs.existsSync(__dirname + "/storage")).to.equal(true);
		} catch (error) {
			return fail(error);
		}
	});

});