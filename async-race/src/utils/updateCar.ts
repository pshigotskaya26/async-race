import { baseUrlServer } from './../index';
import { path } from '../index';
import { ICarItem } from '../types/ICarItem';

export const updateCar = async (id: number, carObj: ICarItem) => {
	const response = await fetch(`${baseUrlServer}${path.garage}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(carObj)
	});

	const result = await response.json();
	return result;
}