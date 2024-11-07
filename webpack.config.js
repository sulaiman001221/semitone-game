const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/jam_buddy_dom.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
