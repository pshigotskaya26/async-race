import { IObjOfAnimateArray } from "../types/IObjFromAnimate";

export const changeObjOfAnimateArray = (idOfCar: number, arr: IObjOfAnimateArray[], idOfRAF: number) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].idCar === idOfCar) {
			arr[i].idRAF = idOfRAF;
		}
	}
};