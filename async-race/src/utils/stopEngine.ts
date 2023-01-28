import { baseUrlServer } from "../index";
import { path } from "../index";
import { IEngine } from "../types/IEngine";

export const stopEngine = async (id: number) => {
	const response = await fetch(`${baseUrlServer}${path.engine}?id=${id}&status=stopped`, {
		method: 'PATCH'
	});

	const result: IEngine = await response.json();
	return result;
};