/*
 * @Desc:
 * @Author: yomuki
 * @Date: 2022-09-18 16:47:43
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-20 11:49:52
 */
const AnimalApi = require("./lib/animal-api");
console.log(AnimalApi.default);
AnimalApi.getDog().then((animal) => {
	console.log(animal);
});
