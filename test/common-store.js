const Store = require(__dirname + "/../src/index.js");

module.exports = Store.create({ basedir: __dirname + "/storage" });