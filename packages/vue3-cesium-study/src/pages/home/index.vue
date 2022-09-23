<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-07-07 09:59:44
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-23 16:39:58
-->
<template>
	<div id="map" ref="mapEl"></div>
</template>

<script setup>
import { Viewer, createWorldTerrain } from "cesium";
import { onMounted, ref } from "vue";
import { getTiandituLayers } from "@/libs/cesiumHelper";
const mapEl = ref(null);
function initMap() {
	window.mapView = new Viewer("map", {
		infoBox: false, // 关闭infobox
		geocoder: true, // 右上工具 - 查找位置
		homeButton: true, //  右上工具 - 返回初始镜头
		sceneModePicker: true, // 右上工具 - 选择视角模式 2D/3D
		baseLayerPicker: false, // 右上工具 - 图形选择器。选择地图服务和地形服务
		navigationHelpButton: true, // 右上工具 - 帮助导航
		animation: true, // 左下工具 - 动画工具。控制视图播放速度
		timeline: true, // 正下工具 - 时间线。指示当前时间，提供时间跳转。
		fullscreenButton: true, // 右下工具 - 全屏按钮
		terrainProvider: createWorldTerrain(),
	});
	const { ciaMapLayer } = getTiandituLayers();
	window.mapView.imageryLayers.addImageryProvider(ciaMapLayer); //添加到cesium图层上
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
