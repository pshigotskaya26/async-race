import "./index.scss";
import { getCountOfGarageCars } from "../../utils/getCountOfGarageCars";
import { ITotalCars } from "../../types/ITotalCars";

class NameBlock {

	render(totalCars: ITotalCars): HTMLDivElement {
		const nameBlockContainer = document.createElement("div");
		nameBlockContainer.classList.add('name-block__container');

		nameBlockContainer.innerHTML = `
			<div class="name-block__name">Garage</div>
			<div class="name-block__count">(<span class="name-block__count-value">${totalCars.countOfCars}</span>)</div>
		`;

		return nameBlockContainer;
	}
}

export default NameBlock;