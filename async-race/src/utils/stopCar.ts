import { toggleDisableStartStop } from "./toggleDisableStartStop";
import { stopEngine } from "./stopEngine";

export const stopCar = async (tag: HTMLElement) => {
	toggleDisableStartStop(tag);
	const startNode = <HTMLElement>tag.previousElementSibling;
	toggleDisableStartStop(startNode);

	const id = tag.getAttribute("data-car-stop");
	const valueStopEngine = await stopEngine(Number(id));

	const carImageBlock: HTMLElement | null = document.getElementById(`car-image-${id}`);

	if (carImageBlock) {
		carImageBlock.style.transform = `translateX(0px)`;
	}
};