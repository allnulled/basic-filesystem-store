const {
	expect
} = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#createReadStream(node)", function() {

	it("can create readable streams", function(done) {
		try {
			fs.writeFileSync(__dirname + "/storage/1.txt", "1", "utf8");
			const readStream = store.createReadStream("/1.txt");
			readStream.on("data", function(data) {
				expect(data.toString()).to.equal("1");
				fs.unlinkSync(__dirname + "/storage/1.txt");
				return done();
			});
		} catch (error) {
			return fail(error);
		}
	});

});