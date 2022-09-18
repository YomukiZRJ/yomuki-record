/*
 * @Desc:
 * @Author: yomuki
 * @Date: 2022-09-13 09:55:22
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-13 10:09:42
 */
import { performance } from "node:perf_hooks";
// const start = performance.now();
// console.log(start, performance.now());

console.log(performance.nodeTiming);
setTimeout(() => {
	console.log(performance.nodeTiming);
}, 1000);
console.log(performance.nodeTiming);
