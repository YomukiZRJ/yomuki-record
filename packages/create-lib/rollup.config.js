import TypescriptPlugin from "@rollup/plugin-typescript";
import CommonjsPlugin from "@rollup/plugin-commonjs";
import NodeResolvePlugin from "@rollup/plugin-node-resolve";
import DtsPlugin from "rollup-plugin-dts";
import { cleandir as CleandirPlugin } from "rollup-plugin-cleandir";
import { terser as TerserPlugin } from "rollup-plugin-terser";
const PLUGINS = [
	TypescriptPlugin(),
	CommonjsPlugin(),
	NodeResolvePlugin(),
	TerserPlugin({
		compress: { drop_console: false },
		format: { comments: false },
	}),
];
export default [
	{
		input: "src/index.ts",
		output: {
			file: "dist/index.js",
			format: "cjs",
		},
		plugins: [...PLUGINS, CleandirPlugin("dist")],
	},
	{
		input: "src/index.ts",
		output: {
			file: "dist/index.esm.js",
			format: "esm",
		},
		plugins: PLUGINS,
	},
	{
		input: "src/index.ts",
		output: { file: "dist/index.d.ts", format: "esm" },
		plugins: [DtsPlugin()],
	},
	// {
	// 	input: "src/index.umd.ts",
	// 	output: {
	// 		file: "dist/index.umd.js",
	// 		format: "umd",
	// 		name: "pakname",
	// 	},
	// },
];
