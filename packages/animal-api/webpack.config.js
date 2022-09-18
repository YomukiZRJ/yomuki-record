/*
 * @Desc:
 * @Author: yomuki
 * @Date: 2022-09-18 16:41:48
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-18 16:44:31
 */
const path = require("path");
module.exports = {
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "lib"),
		filename: "animal-api.js",
		library: "AnimalApi", // 公共库对外暴露命名空间
		libraryTarget: "var",
	},
};
