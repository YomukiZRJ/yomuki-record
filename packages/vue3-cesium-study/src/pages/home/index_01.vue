<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-07-07 09:59:44
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-23 15:47:34
-->
<template>
	<div id="map" ref="mapEl"></div>
</template>

<script setup>
import { Viewer, Entity, Cartesian3, Color } from "cesium";
import { onMounted, ref } from "vue";
const mapEl = ref(null);
function initMap() {
	window.mapView = new Viewer("map", {
		infoBox: false, // 关闭infobox
		geocoder: true, // 右上工具 - 查找位置
		homeButton: true, //  右上工具 - 返回初始镜头
		sceneModePicker: true, // 右上工具 - 选择视角模式 2D/3D
		baseLayerPicker: true, // 右上工具 - 图形选择器。选择地图服务和地形服务
		navigationHelpButton: true, // 右上工具 - 帮助导航
		animation: true, // 左下工具 - 动画工具。控制视图播放速度
		timeline: true, // 正下工具 - 时间线。指示当前时间，提供时间跳转。
		fullscreenButton: true, // 右下工具 - 全屏按钮。
	});
	const entity = new Entity({
		// @see http://cesium.xin/cesium/cn/Documentation1.95/Entity.html
		name: "这是一个实体",
		// @see http://cesium.xin/cesium/cn/Documentation1.95/Cartesian3.html
		position: Cartesian3.fromDegrees(-107.0, 40.0, 300000.0), // 指定实体位置
		// 实体框
		box: {
			// @see http://cesium.xin/cesium/cn/Documentation1.95/BoxGraphics.html#.ConstructorOptions
			dimensions: new Cartesian3(400000.0, 300000.0, 500000.0), // 指定框的长度、宽度、高度
			// color @see http://cesium.xin/cesium/cn/Documentation1.95/Color.html
			material: Color.RED.withAlpha(0.8), // 填充框的材料
			outline: true, // 指定框是否为轮廓
			outlineColor: Color.GREEN, // 指定轮廓颜色
		},
	});
	window.mapView.entities.add(entity);
}
onMounted(() => {
	initMap();
});
</script>

<style lang="less">
#map {
	width: 100%;
	height: 100%;
}
</style>
