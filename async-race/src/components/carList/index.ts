import { ITotalCars } from '../../types/ITotalCars';
import CarItem from '../carItem/index';
import "./index.scss";

class CarList {

	render(carsOnPage: ITotalCars) {
		const carListContainerNode = document.createElement("div");
		carListContainerNode.classList.add('car-list__container');

		carsOnPage.items?.forEach((item) => {
			let carItemObj = new CarItem().render(item);
			carListContainerNode.append(carItemObj);
		});

		return carListContainerNode;
	}
}

export default CarList;