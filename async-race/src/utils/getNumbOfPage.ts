import { IBaseParam } from "../types/IBaseParam";
import { getMaxPageValue } from "./getMaxPageValue";

export const getNumbOfPage = async(queryParams: IBaseParam[]) => {
	let pageFromLocal = localStorage.getItem('page');

	if (pageFromLocal && pageFromLocal !== '') {
		let maxPageValue = await getMaxPageValue(queryParams);

		if (Number(pageFromLocal) >= maxPageValue) {
			return maxPageValue;
		}
		else {
			return Number(pageFromLocal);
		}
	}
	else {
		return 1;
	}
}