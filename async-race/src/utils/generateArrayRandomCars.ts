import { generateRandomCar } from "./generateRandomCar";

export const generateArrayRandomCars = () => {
	const count = 100;
	let resultArr = [];

	for (let i = 0; i < count; i++) {
		resultArr.push(generateRandomCar());
	}

	return resultArr;
}