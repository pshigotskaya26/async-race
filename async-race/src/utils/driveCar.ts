import { baseUrlServer } from "../index";
import { path } from "../index";
import { IDrive } from "../types/IDrive";
import { IObjOfAnimateArray } from "../types/IObjFromAnimate";

export const driveCar = async (id: number) => {
	try {
		const response = await fetch(`${baseUrlServer}${path.engine}?id=${id}&status=drive`, {
			method: 'PATCH'
		});
		console.log('response.status: ', response.status);
		if (response.status === 500) {
			throw new Error();
		}
	}
	catch {
		let arrOfAnimationFromLocal = localStorage.getItem('arrOfAnimationLocal');

		if (arrOfAnimationFromLocal) {
			let arrAnimationFromLocal: IObjOfAnimateArray[] = JSON.parse(arrOfAnimationFromLocal);
			let idRAF: number = arrAnimationFromLocal.filter(item => item.idCar === Number(id))[0].idRAF;
			window.cancelAnimationFrame(idRAF);
		}
	}
}