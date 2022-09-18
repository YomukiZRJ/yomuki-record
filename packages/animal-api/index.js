/*
 * @Desc:
 * @Author: yomuki
 * @Date: 2022-09-18 15:47:23
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-18 16:02:29
 */
import axios from "axios";

const getCat = () => {
	return axios.get("https://aws.random.cat/meow").then((res) => {
		const imgSrc = res.data.file;
		const text = "CAT";
		return { imgSrc, text };
	});
};
const getDog = () => {
	return axios.get("https://random.dog/woof.json").then((res) => {
		const imgSrc = res.data.url;
		const text = "DOG";
		return { imgSrc, text };
	});
};
export default {
	getCat,
	getDog,
};
