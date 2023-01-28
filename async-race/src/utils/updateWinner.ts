import { baseUrlServer } from './../index';
import { path } from '../index';
import { IWinnerItem } from '../types/IWinnerItem';

export const updateWinner = async (id: number, winnerObj: IWinnerItem) => {
	const response = await fetch(`${baseUrlServer}${path.winners}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(winnerObj)
	});

	const result = await response.json();
	return result;
}