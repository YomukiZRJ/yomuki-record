/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-09-02 22:45:25
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-02 22:45:39
 */
import * as echarts from "echarts/core";
import { BarChart, PieChart, LineChart, GaugeChart, PictorialBarChart, RadarChart } from "echarts/charts";
import { TooltipComponent, GridComponent, LegendComponent, TitleComponent } from "echarts/components";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import echartsTheme from "./echartsTheme";
// import eventBus from "@/libs/eventBus";
// let echartsThemeKey = 1;
// 注入自定义主题
echarts.registerTheme("customed", echartsTheme);
// 注册必须的组件
echarts.use([
	PictorialBarChart,
	RadarChart,
	BarChart,
	PieChart,
	TooltipComponent,
	GridComponent,
	LegendComponent,
	TitleComponent,
	CanvasRenderer,
	SVGRenderer,
	LineChart,
	GaugeChart,
]);
// eventBus.$on("resize", handleResize);
// function handleResize() {
//   echartsThemeResize();

//   console.log("echarts handleResize", echartsTheme);
//   setTimeout(() => {
//     echarts.registerTheme(`customed${echartsThemeKey}`, echartsTheme);
//     eventBus.$emit("resize-echarts", `customed${echartsThemeKey}`);
//     echartsThemeKey++;
//   }, 300);
// }
export default echarts;
