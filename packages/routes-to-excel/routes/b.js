/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-09-03 09:51:40
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-03 11:26:42
 */
const index = "src/page/home/index.vue";
export const routes = [
	{
		path: "/",
		name: "index",
		component: index,
		meta: {
			title: "首页",
		},
	},
	{
		path: "/template-list",
		name: "templateList",
		component: "src/page/template/list/index.vue",
		meta: {
			title: "模板列表",
		},
	},
	{
		path: "/template-detail-list",
		name: "templateDetailList",
		component: "src/page/template/DetailList/index.vue",
		meta: {
			title: "模板详情列表",
		},
	},
	{
		path: "/enterprise",
		name: "enterprise",
		component: "src/pages/enterprise/index.vue",
		meta: {
			title: "信息维护",
		},
		children: [
			{
				path: "account",
				name: "accountSettings",
				component: "src/pages/enterprise/accountSettings/index.vue",
				meta: {
					title: "账号设置",
				},
				children: [
					{
						path: "tesr",
						name: "accountSettingsTest",
						component: "src/pages/enterprise/accountSettings/test.vue",
						meta: {
							title: "账号测试",
						},
					},
				],
			},
		],
	},
];
export const fileName = "b项目的路由";
