/*
 * @Desc:
 * @Author: yomuki
 * @Date: 2022-09-18 16:47:43
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-18 16:50:34
 */
const AnimalApi = require("./lib/animal-api.js").default;
console.log(AnimalApi);
AnimalApi.getDog().then((animal) => {
	console.log(animal);
});
