import "./index.scss";
import { ICarItem } from "../../types/ICarItem";
import { renderCarImage } from "../../utils/renderCarImage";

class CarItem {

	render(carItem: ICarItem) {
		const carItemNode = document.createElement("div");
		carItemNode.classList.add("car-item");
		carItemNode.setAttribute('data-car-id', `${carItem.id}`);

		carItemNode.innerHTML = `
			<div class="car-item__controls">
				<div class="car-item__buttons">
					<button class="button button-select" data-car-select="${carItem.id}">Select</button>
					<button class="button button-remove" data-car-remove="${carItem.id}">Remove</button>
				</div>
				<p class="car-item__name">${carItem.name}</p>
			</div>
			<div class="car-road">
				<div class="car-road__buttons">
					<button class="button button-start" data-car-start="${carItem.id}">A</button>
					<button class="button button-stop disable" data-car-stop="${carItem.id}">B</button>
				</div>
				<div id="car-road-${carItem.id}" class="car-road__way">
					<div id="car-image-${carItem.id}" class="car-road__image">${renderCarImage(carItem.color)}</div>
					<div class="car-road__flag"></div>
				</div>
			</div>
		`;
		return carItemNode;
	}
}

export default CarItem;