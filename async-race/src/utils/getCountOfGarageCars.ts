import { path } from "../index";
import { baseUrlServer } from "../index";

export const getCountOfGarageCars = async() => {
	const response = await fetch(`${baseUrlServer}${path.garage}`);

	//console.log('response count: ', await response.headers.get('X-Total-Count'))
	const data = await response.json();

	//console.log('data: ', data);
	const countOfCars = data.length;
	//console.log('countOfCars: ', countOfCars);
	return countOfCars;
}