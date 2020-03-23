const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#has(node)", function() {

	it("check the existence of a node", async function() {
		try {
			await store.writeFile("ok.txt", "ok")
			const result = await store.has("ok.txt");
			expect(result).to.equal(true);
			rimraf.sync(__dirname + "/storage/ok.txt");
		} catch(error) {
			return fail(error);
		}
	});

	it("returns false when the node does not exist", async function() {
		try {
			const result = await store.has("no.txt");
			expect(result).to.equal(false);
		} catch(error) {
			return fail(error);
		}
	});

});