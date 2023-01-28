import { baseUrlServer } from "../index";
import { path } from "../index";

export const deleteCar = async(id: number) => {
	const response = await fetch(`${baseUrlServer}${path.garage}/${id}`, {
		method: 'DELETE'
	});

	const result = await response.json();
	return result;
}