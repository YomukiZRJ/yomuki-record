const TIANDITU_KEY = "3d493a007db2b9a4cc7e62d137b8e2e5";
const TIANDITU_URL = "https://t{s}.tianditu.gov.cn/";
const SUBDOMAINS = "01234567";
import { UrlTemplateImageryProvider, WebMercatorTilingScheme, CesiumTerrainProvider } from "cesium";
export function createTdtImageryProvider() {
	// 影像服务
	const imgMap = new UrlTemplateImageryProvider({
		url: TIANDITU_URL + "DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + TIANDITU_KEY,
		subdomains: SUBDOMAINS,
		tilingScheme: new WebMercatorTilingScheme(),
		maximumLevel: 18,
	});
	// 国界服务
	const iboMap = new UrlTemplateImageryProvider({
		url: TIANDITU_URL + "DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=" + TIANDITU_KEY,
		subdomains: SUBDOMAINS,
		tilingScheme: new WebMercatorTilingScheme(),
		maximumLevel: 10,
	});
	return {
		imgMap,
		iboMap,
	};
}

export function createTdtTerrainProvider() {
	const terrainUrls = [];
	for (var i = 0; i < SUBDOMAINS.length; i++) {
		var url = TIANDITU_URL.replace("{s}", SUBDOMAINS[i]) + "DataServer?T=elv_c&tk=" + TIANDITU_KEY;
		terrainUrls.push(url);
	}
	const provider = new CesiumTerrainProvider({
		urls: terrainUrls,
	});
	return provider;
}
