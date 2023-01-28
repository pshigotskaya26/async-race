import { IObjOfAnimateArray } from "../types/IObjFromAnimate";

export const createObjAnimateArray = (idOfCar: number, arr: IObjOfAnimateArray[], idOfRAF: number) => {
	arr.push({ "idCar": idOfCar, "idRAF": idOfRAF});
};