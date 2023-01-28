import { arrOfCarBrands } from "../index";
import { arrOfCarModels } from "../index";
import { getRandomElement } from "./getRandomElement";

export const getRandomCarName = () => {
	const randomBrand = getRandomElement(arrOfCarBrands);
	const randomModel = getRandomElement(arrOfCarModels);

	return `${randomBrand} - ${randomModel}`;
};