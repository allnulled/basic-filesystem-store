const {
	expect
} = require("chai");
const fs = require("fs");
const store = require(__dirname + "/common-store.js");
const fail = require(__dirname + "/common-fail.js");
const rimraf = require("rimraf");

describe("Store#createWriteStream(node)", function() {

	it("can create writable streams", function(done) {
		try {
			fs.writeFileSync(__dirname + "/storage/1.txt", "1", "utf8");
			const writeStream = store.createWriteStream("/1.txt");
			writeStream.on("finish", function() {
				expect(fs.readFileSync(__dirname + "/storage/1.txt").toString()).to.equal("1234");
				fs.unlinkSync(__dirname + "/storage/1.txt");
				return done();
			});
			writeStream.write("1");
			writeStream.write("2");
			writeStream.write("3");
			writeStream.end("4");
		} catch (error) {
			return fail(error);
		}
	});

});