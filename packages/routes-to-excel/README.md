# 如何用 node 快速将路由信息导出为 excel

近日在工作交接的时，领导说需要把目前所有项目的路由信息整理出来，方便他们快速定位页面文件。正好最近在学习 node，这不正好对上了，嘿嘿！

## 创建 routes.js

先将路由文件中的 routes 提出来存到 routes.js 中，然后将组件引入语句改为字符串：

- 简单的路由，直接替换下。

```javascript
{
  path: "/template-list",
  name: "templateList",
  - component: () => import("@/page/template/list/index.vue"),
  + component: "src/page/template/list/index.vue",
},
```

- 头部引入的路由，把**import**替换为**const**,**from**替换为 **=** 。我真是个聪明的小机灵鬼 🧚‍♀️

```javascript
- import index from "@/page/home/index.vue";
+ const index = "src/page/home/index.vue";
{
  path: "/",
  name: "index",
  component: index,
  meta: {
    title: "XXXX"
  }
},
```

然后就可得到如下文件：

```javascript
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
			},
		],
	},
];
```

## 获取 routes.js

routes 是处理完了，那么如何在 node 中获取到这个文件里的内容呢？首先想到的是存储为 json 文件直接读，但是考虑到有参数存在这个法子就不行了。突然灵机一动，想到之前看源码时读到的`` await import(`xxxxx${xxx}`) ``。嘿嘿，就你了！💡

```javascript
import { resolve } from "node:path";
import { cwd } from "node:process";
const directory = cwd();
const routeFile = resolve(directory, "routes.js");

async function run() {
	const { routes } = await import(`${routeFile}`);
	console.log(routes);
}
run().catch((err) => {
	console.log(err);
});
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bd0febbea3f4ffca0460b68c5f1c8dc~tplv-k3u1fbpfcp-zoom-1.image)
完美！

## 处理 routes 数据

数据拿到手了，现在就要转成方便存进 excel 的格式啦~

```javascript
function handleRoutesData(routes, route = null) {
	const res = routes.reduce((a, item) => {
		// 如果当前路由不是/开头的，就用父路由拼接下
		if (route && item.path[0] !== "/") {
			item.path = `${route.path}/${item.path}`;
		}
		// 插入当前路由
		a.push({
			title: item?.meta?.title || "",
			url: item.path,
			route: item.component,
		});
		// 如果有子路由 递归下
		if (item.children) {
			return a.concat(handleRoutesData(item.children, item));
		}
		return a;
	}, []);
	return res;
}
const routesData = handleRoutesData(routes);
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/219de84f26714f05b62111977177203a~tplv-k3u1fbpfcp-zoom-1.image)
完美！✨✨

## 导出 excel

数据有啦，现在就能开始导出了！
因为之前没接触过 excel 生成的相关插件，所以我这里选择了可以极快上手使用的[node-xlsx](https://github.com/mgcrea/node-xlsx)，它是基于[SheetJS](https://github.com/SheetJS/sheetjs)的。

### 安装一下

```javascript
pnpm i node-xlsx
```

### 引入一下

```javascript
import xlsx from "node-xlsx";
```

### 导出数据生成

这个插件导入的数据是一个二维数组，像这样的：

```javascript
const data = [
	[1, 2, 3],
	[true, false, null, "sheetjs"],
	["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
	["baz", null, "qux"],
];
```

所以，我稍微改了一下处理 routes 的函数

```javascript
// 插入当前路由
// a.push({
// 	title: item?.meta?.title || "",
// 	url: item.path,
// 	route: item.component,
// });
a.push([item?.meta?.title || "", item.path, item.component]);
```

就得到了一个二维数组
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7034a59e7b6044feb8f94526d9847d9f~tplv-k3u1fbpfcp-zoom-1.image)
然后再把头部标题塞进去就行啦！

```javascript
const routesData = handleRoutesData(routes);
routesData.unshift(["页面", "url路径", "页面文件路径"]);
```

### 导出操作

```javascript
import { writeFileSync } from "node:fs";

var buffer = xlsx.build([{ name: "routesSheet", data: routesData }]);
writeFileSync(resolve(directory, "routes.xlsx"), buffer);
```

jiangjiangjiang~大功告成！node 运行下，目录下就会生成 routes.xlsx
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3707dddd423448b8093107008f2f079~tplv-k3u1fbpfcp-zoom-1.image)
打开看看是不是我想要的样子：
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b8efe0c8f8f46fa99bdaca237e8d2be~tplv-k3u1fbpfcp-zoom-1.image)
emmmmmm，应该再稍稍优化下。加个列宽。([!clos 说明](https://docs.sheetjs.com/docs/csf/sheet))

```javascript
const sheetOptions = { "!cols": [{ wch: 20 }, { wch: 50 }, { wch: 200 }] };
var buffer = xlsx.build([{ name: "routesSheet", data: routesData }], { sheetOptions });
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca693048211f459ba8ba25d31b0e05be~tplv-k3u1fbpfcp-zoom-1.image)
这下子就舒服多啦！

### 多文件导出

新的问题又出现了，因为有多个项目，所以会整理出多个 routes.js。所以，再稍稍优化下：

- 创建一个 routes 文件夹，将所有项目出现的整理出来的 routes 放这里，并且在 routes 文件中导出 excel 文件名。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a320b123f3c40f39a42b8a2df25379e~tplv-k3u1fbpfcp-zoom-1.image)

- 创建一个 excel 文件夹，用于存放 excel
- 改造下代码

```javascript
const routeDirectory = resolve(directory, "routes"); // 路由目录
const excelDirectory = resolve(directory, "excel"); // excel目录
async function run() {
	// 获取路由目录下所有文件
	const files = readdirSync(routeDirectory);
	for (const file of files) {
		const routeFile = resolve(routeDirectory, file);
		// 取得文件名
		const { routes, fileName } = await import(`${routeFile}`);
		const routesData = handleRoutesData(routes);
		routesData.unshift(["页面", "url路径", "页面文件路径"]);
		const sheetOptions = { "!cols": [{ wch: 20 }, { wch: 50 }, { wch: 200 }] };
		var buffer = xlsx.build([{ name: "routesSheet", data: routesData }], { sheetOptions });
		// 存放~
		writeFileSync(resolve(excelDirectory, `${fileName}.xlsx`), buffer);
	}
}
```

当文件量大的时候，可以加个 spinner

## 结尾

至此，一个大致能用的导出工具就搞定啦！摸鱼时间+1+1+1+1🐟🐟🐟🐟🐟  
[完整代码](https://github.com/YomukiZRJ/yomuki-record/tree/master/packages/routes-to-excel)
