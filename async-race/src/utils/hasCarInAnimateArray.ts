import { IObjOfAnimateArray } from "../types/IObjFromAnimate";

export const hasCarInAnimateArray = (idOfCar: number, arr: IObjOfAnimateArray[]) => {
	let result = arr.filter(item => item.idCar === idOfCar);

	if (result.length) {
		return true;
	}
	else {
		return false;
	}
};