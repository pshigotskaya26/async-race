import { baseUrlServer } from './../index';
import { path } from '../index';
import { ICarItem } from '../types/ICarItem';

export const getGarageCar = async(id: number) => {
	const response = await fetch(`${baseUrlServer}${path.garage}/${id}`);
	const itemCar: ICarItem = await response.json();
	return itemCar;
}