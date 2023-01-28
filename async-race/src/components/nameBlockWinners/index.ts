import "./index.scss";
import { ITotalWinners } from "../../types/ITotalWinners";

class NameBlockWinners {

	render(totalWinners: ITotalWinners): HTMLDivElement {
		const nameBlockWinnersContainer = document.createElement("div");
		nameBlockWinnersContainer.classList.add('name-block-winners__container');

		nameBlockWinnersContainer.innerHTML = `
			<div class="name-block-winners__name">Winners</div>
			<div class="name-block-winners__count">(<span class="name-block-winners__count-value">${totalWinners.countOfWinners}</span>)</div>
		`;

		return nameBlockWinnersContainer;
	}
}

export default NameBlockWinners;