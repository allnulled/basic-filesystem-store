const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#describe(node)", function() {

	it("returns stat object from node", async function() {
		try {
			fs.writeFileSync(__dirname + "/storage/1.txt", "1", "utf8");
			const stat = await store.describe("/1.txt");
			expect(typeof stat).to.equal("object");
			fs.unlinkSync(__dirname + "/storage/1.txt");
		} catch(error) {
			return fail(error);
		}
	});

});