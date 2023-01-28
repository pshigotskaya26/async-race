import { IBaseParam } from "../types/IBaseParam";
import { getMaxPageValue } from "./getMaxPageValue";
import { getMaxPageWinnersValue } from "./getMaxPageWinnersValue";

export const setStatusToPageButtons = async(queryParams: IBaseParam[], tag: HTMLElement) => {
	const buttonNextNode = tag.querySelector(".button-next");
	const buttonPrevNode = tag.querySelector(".button-prev");
/*
	let pageCarFromLocal = localStorage.getItem('page');
	let pageWinnersFromLocal = localStorage.getItem('pageWinners');

	if (pageCarFromLocal && Number(pageCarFromLocal) === 0) {
		setPageInLocal(1);
	}
	if (pageWinnersFromLocal && Number(pageWinnersFromLocal) === 0) {
		setPageWinnersInLocal(1);
	}
*/
	let pageFromLocal;

	if (tag.classList.contains("garage")) {
		pageFromLocal = localStorage.getItem('page');
	}
	else if (tag.classList.contains("winners")) {
		pageFromLocal = localStorage.getItem('pageWinners');
	}

	if (pageFromLocal && pageFromLocal !== '') {

		let maxPageValue;

		if (tag.classList.contains("garage")) {
			maxPageValue = await getMaxPageValue(queryParams);
		}
		else if (tag.classList.contains("winners")) {
			maxPageValue = await getMaxPageWinnersValue(queryParams);
		}

		if (maxPageValue && Number(pageFromLocal) >= maxPageValue && Number(pageFromLocal) !== 1) {
			buttonPrevNode?.classList.remove("disable");
			buttonNextNode?.classList.add("disable");
		}
		if (maxPageValue && Number(pageFromLocal) > 1 && Number(pageFromLocal) < maxPageValue) {
			buttonNextNode?.classList.remove("disable");
			buttonPrevNode?.classList.remove("disable");
		}
		if (Number(pageFromLocal) === maxPageValue && Number(pageFromLocal) === 1) {
			buttonNextNode?.classList.add("disable");
			buttonPrevNode?.classList.add("disable");
		}
	}
	else {
		buttonNextNode?.classList.add("disable");
		buttonPrevNode?.classList.add("disable");
	}
}