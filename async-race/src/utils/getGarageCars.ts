import { path } from "../index";
import { baseUrlServer } from "../index";
import { IBaseParam } from "../types/IBaseParam";
import { ICarItem } from "../types/ICarItem";
import { generateQueryString } from "./generateQueryString";

export const getGarageCars = async(queryParams: IBaseParam[], numbOfPage?: number) => {
	if (numbOfPage) {
		queryParams[0].value = numbOfPage;
	}
	const response = await fetch(`${baseUrlServer}${path.garage}${generateQueryString(queryParams)}`);
	const items: ICarItem[] = await response.json();

	const countOfCars = Number(await response.headers.get('X-Total-Count'));
	return { items, countOfCars };
}