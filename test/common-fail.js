const { expect } = require("chai");

module.exports = error => {
    console.log("Showing error from test:", error);
    expect(true).to.equal(false);
}