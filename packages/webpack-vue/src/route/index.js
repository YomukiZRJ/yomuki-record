/*
 * @see https://router.vuejs.org/zh/
 */

import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			name: "Home",
			component: () => import("@/page/home"),
		},
	],
});
export default router;
