import { IBaseParam } from "../types/IBaseParam";
import { getWinners } from "./getWinners";

export const getMaxPageWinnersValue = async(queryParams: IBaseParam[]) => {
	let limit = queryParams[1].value;
	let count = await getWinners(queryParams);
	return Math.ceil(count.countOfWinners / limit);
}