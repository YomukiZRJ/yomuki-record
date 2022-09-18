/*
 * @Desc:
 * @Author: yomuki
 * @Date: 2022-09-18 15:54:40
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-18 16:03:01
 */
import AnimalApi from "../index.js";
describe("animal-api", () => {
	it("get dogs", () => {
		return AnimalApi.getDog().then((animal) => {
			expect(animal.imgSrc).not.toBeUndefined();
			expect(animal.text).toEqual("DOG");
		});
	});
});
