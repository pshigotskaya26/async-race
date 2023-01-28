import { arrOfColorLetters } from "../index";
import { getRandomElement } from "./getRandomElement";

export const getRandomCarColor = () => {
	let resultColor = '#';

	for (let i = 0; i < 6; i++) {
		resultColor += getRandomElement(arrOfColorLetters);
	}

	return resultColor;
};