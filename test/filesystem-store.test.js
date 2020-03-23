const { expect } = require("chai");
const path = require("path");

describe("Store class", function() {
    this.timeout(5000);

    const fail = error => {
        console.log("Showing error from test:", error);
        expect(true).to.equal(false);
    }

    let Store, store;

    before(function() {
        Store = require(__dirname + "/../src/index.js");
        store = Store.create();
    })

    it("store.getPath(...)", function(done) {
        const file = "/my_folder";
        const filepath = store.getPath(file);
        const filepath2 = path.resolve(store.basedir, "my_folder");
        expect(filepath).to.equal(filepath2);
        return done();
    });

    it("store.createFolder(...)", function(done) {
        const file = "/my_folder";
        store.createFolder(file, {
            recursive: true
        }).then(createdFile => {
            expect(createdFile).to.equal(file);
            return done();
        }).catch(fail);
    });

    it("store.writeFile(...)", function(done) {
        const file = "/my_folder/file1.txt";
        const contents = "Hello!";
        store.writeFile(file, contents).then(result => {
            expect(result).to.equal(file);
            return done();
        }).catch(fail);
    });

    it("store.describe(...)", function(done) {
        const file = "/my_folder/file1.txt";
        store.describe(file).then(description => {
            expect(description.isFile()).to.equal(true);
            return done();
        }).catch(fail);
    });

    it("store.has(...)", function(done) {
        const file = "/my_folder/file1.txt";
        const folder = "/my_folder";
        const notFile = "/coco.txt";
        store.has(file).then(() => {
            store.has(folder).then(() => {
                store.has(notFile).then(fail).catch(error => {
                    return done();
                });
            }).catch(fail);
        }).catch(fail);
    });

    it("store.hasFile(...)", function(done) {
        const file = "/my_folder/file1.txt";
        const folder = "/my_folder";
        store.hasFile(file).then(() => {
            store.hasFile(folder).then(fail).catch(error => {
                return done();
            });
        });
    });

    it("store.hasFolder(...)", function(done) {
        const file = "/my_folder/file1.txt";
        const folder = "/my_folder";
        store.hasFolder(folder).then(() => {
            store.hasFolder(file).then(fail).catch(error => {
                return done();
            });
        }).catch(fail);
    });

    it("store.readFile(...)", function(done) {
        const file = "/my_folder/file1.txt";
        store.readFile(file).then(contents => {
            expect(contents).to.equal("Hello!");
            return done();
        }).catch(fail);
    });

    it("store.readFolder(...)", function(done) {
        const folder = "/my_folder";
        store.readFolder(folder).then(files => {
            expect(files.indexOf("file1.txt")).to.not.equal(-1);
            return done();
        }).catch(fail);
    });

    it("store.rename(...)", function(done) {
        const fileSrc = "/my_folder/file1.txt";
        const fileDst = "/my_folder/file2.txt";
        store.rename(fileSrc, fileDst).then(dst => {
            expect(dst).to.equal(fileDst);
            return done();
        }).catch(fail);
    });

    it("store.createWriteStream(...)", function(done) {
        const file = "/my_folder/file2.txt";
        const writeStream = store.createWriteStream(file);
        writeStream.on("finish", function() {
            return done();
        });
        writeStream.write("Hello world!");
        writeStream.end();
    });

    it("store.createReadStream(...)", function(done) {
        const file = "/my_folder/file2.txt";
        const readStream = store.createReadStream(file);
        const chunks = [];
        readStream.on("error", err => fail(err));
        readStream.on("data", chunk => chunks.push(chunk));
        readStream.on("close", () => {
            const output = Buffer.concat(chunks).toString();
            expect(output).to.equal("Hello world!");
            return done();
        });
    });

    it("store.deleteFile(...)", function(done) {
        const file = "/my_folder/../my_folder/file2.txt";
        store.deleteFile(file).then(result => {
            expect(result).to.equal("/my_folder/file2.txt");
            return done();
        }).catch(fail);
    });

    it("store.deleteFolder(...)", function(done) {
        const folder = "/my_folder";
        store.deleteFolder(folder).then(result => {
            expect(result).to.equal(folder);
            return done();
        }).catch(fail);
    });

    it("throws on every method when path is out of scope", async function() {
        const methodsTested = [];
        const methods = [
			"describe",
			"has",
			"hasFile",
			"hasFolder",
			"readFile",
			"readFolder",
			"writeFile",
			"createFolder",
			"deleteFile",
			"deleteFolder",
			"rename",
			"createReadStream",
			"createWriteStream"
		];
		for(const method of methods) {
			try {
				await store[method]("/../../package.json");
			} catch(error) {
				expect(error.message).to.equal("PathOutOfScopeError");
				methodsTested.push(method);
			}
		}
		expect(methodsTested).to.deep.equal(methods);
    });


});