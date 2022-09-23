import { ImageryLayer, WebMapServiceImageryProvider } from "cesium";
const TIANDITU_KEY = "3d493a007db2b9a4cc7e62d137b8e2e5";
const TIANDITU_OPTION = {
	layers: "tdtBasicLayer", // 要包含的层，用逗号分隔。
	subdomains: "01234567", // 天地图的子域
	style: "default",
	format: "tiles",
	tileMatrixSetID: "GoogleMapsCompatible",
	parameters: {},
};
const TIANDITU_LAYER_OPTION = {
	show: true,
	alpha: 1,
};
/**
 * @description: 获取天地图URL
 * @param {string} type
 * @param {string} layer
 * @return {string}
 */
function getTiandituUrl(type, layer) {
	return `http://t{s}.tianditu.gov.cn/${type}/wmts?service=WMTS&request=GetTile&version=1.0.0&LAYER=${layer}&STYLE=default&TILEMATRIXSET=w&format=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=${TIANDITU_KEY}`;
}

export function createTiandituImageryProvider(type, layer) {
	return new WebMapServiceImageryProvider({
		url: getTiandituUrl(type, layer),
		...TIANDITU_OPTION,
	});
}
/**
 * @description: 获取天地图图层
 * @param {string} type
 * @param {string} layer
 * @return {ImageryLayer}
 */
export function createTiandituLayer(type, layer) {
	return ImageryLayer(
		new WebMapServiceImageryProvider({
			url: getTiandituUrl(type, layer),
			...TIANDITU_OPTION,
		}),
		TIANDITU_LAYER_OPTION
	);
}
export function getTiandituLayers() {
	// 矢量底图
	const vecMapLayer = createTiandituImageryProvider("vec_w", "vec");
	// 矢量标注
	const cvaMapLayer = createTiandituImageryProvider("cva_w", "cva");
	// 影像底图
	const imgMapLayer = createTiandituImageryProvider("img_w", "img");
	// 影像标注
	const ciaMapLayer = createTiandituImageryProvider("cia_w", "cia");
	// 地形渲染
	const terMapLayer = createTiandituImageryProvider("ter_w", "ter");
	// 地形标注
	const ctaMapLayer = createTiandituImageryProvider("cta_w", "cta");
	return {
		vecMapLayer,
		cvaMapLayer,
		imgMapLayer,
		ciaMapLayer,
		terMapLayer,
		ctaMapLayer,
	};
}
