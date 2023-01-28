import { path } from "../index";
import { baseUrlServer } from "../index";
import { arrBaseParamWinners } from "../index";
import { ITotalWinners } from "../types/ITotalWinners";

import { getWinners } from "./getWinners";

export const deleteWinner = async (id: number) => {
	let totalWinners: ITotalWinners = await getWinners(arrBaseParamWinners);
	console.log('totalWinners: ', totalWinners);

	let filteredArrayOfTotalWinners = totalWinners.items?.filter(itemWinner => itemWinner.id === id);

	console.log('filteredArrayOfTotalWinners: ', filteredArrayOfTotalWinners);

	if (filteredArrayOfTotalWinners?.length) {
		const response = await fetch(`${baseUrlServer}${path.winners}/${id}`, {
			method: 'DELETE'
		});
	
		const result = await response.json();
		return result;
	}
	else {
		return;
	}
}