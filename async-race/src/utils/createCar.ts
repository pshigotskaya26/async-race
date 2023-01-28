import { baseUrlServer } from './../index';
import { path } from '../index';
import { ICarItem } from '../types/ICarItem';

export const createCar = async (carObject: ICarItem) => {
	const response = await fetch(`${baseUrlServer}${path.garage}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(carObject)
	});

	const result = await response.json();
}