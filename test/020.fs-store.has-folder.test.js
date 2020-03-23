const { expect } = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#hasFolder(node)", function() {

	it("check the existence of a node", async function() {
		try {
			await store.createFolder("ok")
			const result = await store.hasFolder("ok");
			expect(result).to.equal(true);
			rimraf.sync(__dirname + "/storage/ok");
		} catch(error) {
			return fail(error);
		}
	});

	it("returns false when the node does not exist", async function() {
		const result = await store.hasFolder("no");
		expect(result).to.equal(false);
	});

	it("returns false when the node is not a folder", async function() {
		await store.writeFile("ok", "ok")
		const result = await store.hasFolder("ok");
		expect(result).to.equal(false);
		rimraf.sync(__dirname + "/storage/ok");
	});

});