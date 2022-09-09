/*
 * @Desc: echarts主体
 * @Author: 曾茹菁
 * @Date: 2022-06-23 13:22:52
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-07-18 13:02:46
 */
// const px12 = SCALE_INT(12);
function getRem(px) {
	return `${0.0625 * px}rem`;
}
const px12 = 12,
	px14 = 14,
	px2 = 2,
	px16 = 16,
	px1 = 1,
	px10 = 10,
	px8 = 8;
const echartsTheme = {
	color: ["#07C3FF", "#FFB821", "#FF6A98", "#F2877F", "#958EED", "#FFA5D6", "#fc8452", "#9a60b4", "#ea7ccc"],
	backgroundColor: "rgba(0, 0, 0, 0)",
	textStyle: {},
	title: {
		textStyle: {
			color: "#D9E7FF",
		},
		subtextStyle: {
			color: "#6E7079",
		},
	},
	bar: {
		itemStyle: {
			barBorderWidth: "0",
			barBorderColor: "#ccc",
		},
		barMaxWidth: px16,
	},
	pie: {
		itemStyle: {
			borderWidth: "0",
			borderColor: "#ccc",
		},
		label: {
			fontSize: px14,
		},
	},
	// 类目轴
	categoryAxis: {
		// 轴线
		axisLine: {
			show: true,
			lineStyle: {
				color: "#D9E7FF",
				width: px2,
			},
		},
		// 刻度线
		axisTick: {
			show: false,
		},
		axisLabel: {
			show: true,
			color: "#D9E7FF",
			fontSize: px12,
		},
		splitLine: {
			show: false,
		},
	},
	// 数值轴
	valueAxis: {
		// 轴线
		axisLine: {
			show: false,
		},
		// 刻度线
		axisTick: {
			show: false,
		},
		axisLabel: {
			show: true,
			color: "rgba(217,231,255,0.85)",
			fontSize: px12,
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: ["#D9E7FF"],
				opacity: "0.3",
				width: px2,
			},
		},
		nameTextStyle: {
			color: "rgba(217,231,255,0.85)",
			fontSize: px12,
		},
	},
	toolbox: {
		iconStyle: {
			borderColor: "#999",
		},
		emphasis: {
			iconStyle: {
				borderColor: "#666",
			},
		},
	},
	// 图例
	legend: {
		itemGap: px8,
		itemWidth: px8,
		itemHeight: px8,
		textStyle: {
			color: "#fff",
			fontSize: px14,
		},
		lineStyle: {
			width: px2,
		},
	},
	// 提示框
	tooltip: {
		axisPointer: {
			lineStyle: {
				color: "#ccc",
				width: px1,
			},
			crossStyle: {
				color: "#ccc",
				width: px1,
			},
		},
		textStyle: {
			color: "#D9E7FF",
			fontSize: px12,
		},

		backgroundColor: "rgba(3, 41, 55, 0.8)",
		borderColor: "#4ba9f5",
		padding: [px10, px10],
		borderWidth: px1,
		extraCssText: `border-radius:${px8}px;`,
	},
	dataZoom: {
		handleSize: "undefined%",
		textStyle: {},
	},
	markPoint: {
		label: {
			color: "#eeeeee",
		},
		emphasis: {
			label: {
				color: "#eeeeee",
			},
		},
	},
};
export default echartsTheme;

// export function echartsThemeResize() {
//   const px16 = SCALE_INT(16),
//     px2 = SCALE_INT(2),
//     px8 = SCALE_INT(8);
//   echartsTheme.bar.barMaxWidth = px16;
//   echartsTheme.categoryAxis.axisLine.lineStyle.width = px2;
//   echartsTheme.valueAxis.splitLine.lineStyle.width = px2;
//   echartsTheme.legend.itemGap = px8;
//   echartsTheme.legend.itemWidth = px8;
//   echartsTheme.legend.itemHeight = px8;
//   echartsTheme.legend.lineStyle.width = px8;
//   echartsTheme.tooltip.extraCssText = `border-radius:${px8}px;`;
// }
