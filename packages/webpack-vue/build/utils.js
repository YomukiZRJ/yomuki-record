const path = require("path");
function rootPath(str) {
	return path.resolve(__dirname, `../${str}`);
}

exports.rootPath = rootPath;
