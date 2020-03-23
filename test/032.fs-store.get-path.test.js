const { expect } = require("chai");
const fs = require("fs");
const path = require("path");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#getPath(node)", function() {

	it("sanitizes paths", async function() {
		try {
			expect(store.getPath("/my/path")).to.equal(path.resolve(__dirname + "/storage/my/path"));
		} catch (error) {
			return fail(error);
		}
	});

    it("prevents outter paths in every method", async function() {
        const methodsTested = [];
        const methods = [
			"describe",
			"has",
			"hasFile",
			"hasFolder",
			"readFile",
			"readFolder",
			"ensureFile",
			"ensureFolder",
			"writeFile",
			"createFolder",
			"deleteFile",
			"deleteFiles",
			"deleteFolder",
			"rename",
			"createReadStream",
			"createWriteStream",
			"writeFile",
			"findPatterns",
			"deleteRecursively",
			// "writeFiles",
		];
		for(const method of methods) {
			try {
				await store[method]("/../../whatever.json");
			} catch(error) {
				expect(error.message).to.equal("PathOutOfScopeError");
				methodsTested.push(method);
			}
		}
		expect(methodsTested).to.deep.equal(methods);
    });

});