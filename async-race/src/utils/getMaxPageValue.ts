import { IBaseParam } from "../types/IBaseParam";
import { getGarageCars } from "./getGarageCars";

export const getMaxPageValue = async(queryParams: IBaseParam[]) => {
	let limit = queryParams[1].value;
	let count = await getGarageCars(queryParams);
	return Math.ceil(count.countOfCars / limit);
}
