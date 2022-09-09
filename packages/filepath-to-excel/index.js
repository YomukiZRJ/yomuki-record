/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-09-04 21:04:07
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-04 21:38:18
 */
import { readdirSync, statSync } from "node:fs";
import { cwd } from "node:process";
import { resolve } from "node:path";
import prompts from "prompts";
const ignoreFolder = ["node_modules"];
const projectRoot = cwd();
function getDirectory(path) {
	const files = readdirSync(path);
	const directory = [];
	for (const file of files.filter((item) => !ignoreFolder.includes(item))) {
		const fileState = statSync(resolve(path, file));
		if (fileState.isDirectory()) {
			directory.push({
				title: file,
				value: file,
			});
		}
	}
	return directory;
}
function createQuestions(curPath, directory) {
	const questions = [
		{
			type: "multiselect",
			name: "selectDirectory",
			message: `请选择需要导出的文件夹（当前路径${curPath}}）：`,
			choices: [
				{
					title: "选择所有文件夹",
					value: "*",
				},
				{
					title: "导出所有文件夹及其内容",
					value: "**",
				},
				...directory,
			],
		},
	];
	return questions;
}
// 用class?其实应该不需要 我要获取要插入excel的数据列
// class Directory {}
async function run() {
	const directory = getDirectory(projectRoot);
	const questions = createQuestions(projectRoot, directory);
	let result = {};
	try {
		result = await prompts(questions, {
			onCancel: () => {
				throw new Error("❌Bye~");
			},
		});
	} catch (cancelled) {
		console.log(cancelled.message);
		return;
	}
	const { selectDirectory } = result;
	console.log(selectDirectory);
}
run().catch((err) => {
	console.log(err);
});
