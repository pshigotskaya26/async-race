import { path } from "../index";
import { baseUrlServer } from "../index";
import { IBaseParam } from "../types/IBaseParam";
import { generateQueryString } from "./generateQueryString";


export const getWinners = async(queryParams: IBaseParam[], numbOfPage?: number) => {
	if (numbOfPage) {
		queryParams[0].value = numbOfPage;
	}
	const response = await fetch(`${baseUrlServer}${path.winners}${generateQueryString(queryParams)}`);
	const items = await response.json();

	const countOfWinners = Number(await response.headers.get('X-Total-Count'));
	//console.log('data getGarageCars: ', items, countOfCars);
	return { items, countOfWinners };
}