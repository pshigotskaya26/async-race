import { toggleDisableStartStop } from "./toggleDisableStartStop";
import { startEngine } from "./startEngine";
import { getTimeFromStartEngine } from "./getTimeFromStartEngine";
import { getDistanceHtml } from "./getDistanceHtml";
import { animateCar } from "./animateCar";
import { driveCar } from "./driveCar";

export const startCar = async (tag: HTMLElement, race?: string) => {
	toggleDisableStartStop(tag);
	const stopNode = <HTMLElement>tag.nextElementSibling;
	toggleDisableStartStop(stopNode);

	const id = tag.getAttribute("data-car-start");
	const valueStartEngine = await startEngine(Number(id));
	const time = getTimeFromStartEngine(valueStartEngine);
	const distanceHtml = getDistanceHtml(tag);
	const carImageBlock: HTMLElement | null = document.getElementById(`car-image-${id}`);

	if (carImageBlock && distanceHtml) {
		animateCar(Number(id), carImageBlock, time, distanceHtml, 'started', race);
		let resultDrive = await driveCar(Number(id));
	}
};