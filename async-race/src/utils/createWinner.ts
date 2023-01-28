import { baseUrlServer } from './../index';
import { path } from '../index';
import { IWinnerItem } from '../types/IWinnerItem';

export const createWinner = async (winnerObject: IWinnerItem) => {
	const response = await fetch(`${baseUrlServer}${path.winners}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(winnerObject)
	});

	const result = await response.json();
}