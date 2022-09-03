/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-09-02 22:26:31
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-02 22:47:23
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
function pathResolve() {
	return resolve(__dirname, `./${dir}`);
}
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: [
			{
				find: "@/",
				replacement: pathResolve("src") + "/",
			},
		],
	},
});
