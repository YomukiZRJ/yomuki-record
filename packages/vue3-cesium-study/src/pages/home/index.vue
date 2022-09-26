<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-07-07 09:59:44
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-26 16:10:19
-->
<template>
	<div id="map" ref="mapEl"></div>
</template>

<script setup>
import { Viewer, createWorldTerrain, Camera, Rectangle, Cartesian3, GeoJsonDataSource, Color } from "cesium";
import { onMounted, ref } from "vue";
import { getTiandituLayers } from "@/libs/cesiumHelper";
const geojson = require("@/assets/geojson/pinghu.json");
const mapEl = ref(null);
/**
 * @description: 初始化Cesium
 */
function initCesium() {
	// Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(90, -20, 110, 90); // 默认中国上空
	const pinghuLog = 121.01606, // 平湖经度
		pinghuLat = 30.67585; // 平湖纬度
	Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(pinghuLog - 8, pinghuLat - 8, pinghuLog + 8, pinghuLat + 8); //
}
function initMap() {
	window.mapView = new Viewer("map", {
		infoBox: false, // 关闭infobox
		geocoder: false, // 右上工具 - 查找位置
		homeButton: true, //  右上工具 - 返回初始镜头
		sceneModePicker: true, // 右上工具 - 选择视角模式 2D/3D
		baseLayerPicker: false, // 右上工具 - 图形选择器。选择地图服务和地形服务
		navigationHelpButton: false, // 右上工具 - 帮助导航
		animation: false, // 左下工具 - 动画工具。控制视图播放速度
		timeline: false, // 正下工具 - 时间线。指示当前时间，提供时间跳转。
		fullscreenButton: true, // 右下工具 - 全屏按钮
		terrainProvider: createWorldTerrain(),
	});
	window.mapView._cesiumWidget._creditContainer.style.display = "none"; //去除cesium版权信息
	const { img3dMapLayer, cia3dMapLayer } = getTiandituLayers();
	window.mapView.imageryLayers.addImageryProvider(img3dMapLayer); //添加到cesium图层上
	window.mapView.imageryLayers.addImageryProvider(cia3dMapLayer);
}
function useSetView() {
	// @see http://cesium.xin/cesium/cn/Documentation1.95/Camera.html
	window.mapView.camera.setView({
		destination: Cartesian3.fromDegrees(121.01606, 30.67585, 15000.0),
	});
}
function useFlyto() {
	window.mapView.camera.flyTo({
		destination: Cartesian3.fromDegrees(121.01606, 30.67585, 15000.0),
		complete: () => {
			console.log("fly ok");
		},
	});
}
function useGeojsonDataInMap() {
	// @see http://cesium.xin/cesium/cn/Documentation1.95/GeoJsonDataSource.html
	GeoJsonDataSource.load(geojson, {
		// @see http://cesium.xin/cesium/cn/Documentation1.95/Color.html
		stroke: Color.PALETURQUOISE,
		strokeWidth: 8,
		fill: Color.fromCssColorString("rgba(36,129,252,.2)"),
	}).then((dataSource) => {
		// @see http://cesium.xin/cesium/cn/Documentation1.95/DataSourceCollection.html
		window.mapView.dataSources.add(dataSource);
	});
}
// function initCamera() {}
initCesium();
onMounted(() => {
	initMap();
	useSetView();
	useGeojsonDataInMap();
});
</script>

<style lang="less">
#map {
	width: 100%;
	height: 100%;
}
</style>
