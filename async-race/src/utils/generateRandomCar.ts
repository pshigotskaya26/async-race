import { getRandomCarName } from "./getRandomCarName";
import { getRandomCarColor } from "./getRandomCarColor";

export const generateRandomCar = () => {
	const name = getRandomCarName();
	const color = getRandomCarColor();
	return {name: name, color: color};
}