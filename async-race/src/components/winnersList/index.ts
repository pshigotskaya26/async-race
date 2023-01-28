import { ITotalWinners } from "../../types/ITotalWinners";
import WinnerItem from "../winnerItem/index";

import { getGarageCar } from './../../utils/getGarageCar';
import { renderCarImage } from "../../utils/renderCarImage";
import "./index.scss";

class WinnersList {

	async render(winnersOnPage: ITotalWinners) {
		const winnersListContainerNode = document.createElement("div");
		winnersListContainerNode.classList.add("winners-list__container");

		const winnersListTitlesNode = document.createElement("div");
		winnersListTitlesNode.classList.add("winners-list__titles");

		const winnerListContentNode = document.createElement("div");
		winnerListContentNode.classList.add("winners-list__content");

		winnersListTitlesNode.innerHTML = `
			<div class="winners-titles__number">№</div>
			<div class="winners-titles__car">Car</div>
			<div class="winners-titles__name">Name</div>
			<div class="winners-titles__wins">Wins</div>
			<div class="winners-titles__time">Best time (seconds)</div>
		`;

		winnersListContainerNode.append(winnersListTitlesNode);
		winnersListContainerNode.append(winnerListContentNode);
		
		winnersOnPage.items?.forEach(async (item,  index) => {
			let winnerItemObj = await new WinnerItem().render(item, index);
			winnerListContentNode.append(winnerItemObj);
		});

		return winnersListContainerNode;
	}
}

export default WinnersList;