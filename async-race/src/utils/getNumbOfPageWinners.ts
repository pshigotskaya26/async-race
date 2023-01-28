import { IBaseParam } from "../types/IBaseParam";
import { getMaxPageWinnersValue } from "./getMaxPageWinnersValue";

export const getNumbOfPageWinners = async(queryParams: IBaseParam[]) => {
	let pageWinnersFromLocal = localStorage.getItem('pageWinners');

	if (pageWinnersFromLocal && pageWinnersFromLocal !== '') {
		let maxPageWinnersValue = await getMaxPageWinnersValue(queryParams);

		if (Number(pageWinnersFromLocal) >= maxPageWinnersValue) {
			return maxPageWinnersValue;
		}
		else {
			return Number(pageWinnersFromLocal);
		}
	}
	else {
		return 1;
	}
}