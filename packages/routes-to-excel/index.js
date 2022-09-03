/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-09-03 09:46:20
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-03 11:34:52
 */
import { resolve } from "node:path";
import { cwd } from "node:process";
import xlsx from "node-xlsx";
import { readdirSync, writeFileSync } from "node:fs";
const directory = cwd();
const routeDirectory = resolve(directory, "routes");
const excelDirectory = resolve(directory, "excel");

function handleRoutesData(routes, route = null) {
	const res = routes.reduce((a, item) => {
		// 如果当前路由不是/开头的，就用父路由拼接下
		if (route && item.path[0] !== "/") {
			item.path = `${route.path}/${item.path}`;
		}
		// 插入当前路由
		// a.push({
		// 	title: item?.meta?.title || "",
		// 	url: item.path,
		// 	route: item.component,
		// });
		a.push([item?.meta?.title || "", item.path, item.component]);
		// 如果有子路由 递归下
		if (item.children) {
			return a.concat(handleRoutesData(item.children, item));
		}
		return a;
	}, []);
	return res;
}
async function run() {
	const files = readdirSync(routeDirectory);
	for (const file of files) {
		const routeFile = resolve(routeDirectory, file);
		const { routes, fileName } = await import(`${routeFile}`);
		const routesData = handleRoutesData(routes);
		routesData.unshift(["页面", "url路径", "页面文件路径"]);
		const sheetOptions = { "!cols": [{ wch: 20 }, { wch: 50 }, { wch: 200 }] };
		var buffer = xlsx.build([{ name: "routesSheet", data: routesData }], { sheetOptions });
		writeFileSync(resolve(excelDirectory, `${fileName}.xlsx`), buffer);
	}
}
run().catch((err) => {
	console.log(err);
});
