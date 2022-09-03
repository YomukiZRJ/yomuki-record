/*
 * @Desc:使用echarts
 * @Author: 曾茹菁
 * @Date: 2022-09-02 22:49:17
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-02 22:54:01
 */
import echarts from "@/plugins/echarts";
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
export default ({ immediately = true, renderer = "svg", theme = "customed" }) => {
	let tempOption = null;
	const chartRef = ref(null),
		chartObj = shallowRef(null);
	/**
	 * @description: 载入echarts
	 */
	function init(themeName = theme) {
		if (chartRef.value) {
			chartObj.value = echarts.init(chartRef.value, themeName, { renderer: renderer });
		}
	}
	/**
	 * @description: 销毁echarts
	 */
	function dispose() {
		if (chartObj.value) chartObj.value?.dispose();
	}
	function setOption(option) {
		tempOption = option;
		chartObj.value?.setOption(option, true);
	}
	onMounted(() => {
		if (immediately) {
			init();
		}
	});
	onBeforeUnmount(() => {
		dispose();
	});
	return {
		init,
		chartRef,
		setOption,
		chartObj,
	};
};
