import { getGarageCar } from './../../utils/getGarageCar';
import "./index.scss";
import { ICarItem } from '../../types/ICarItem';
import { IWinnerItem } from "../../types/IWinnerItem";
import { renderCarImage } from "../../utils/renderCarImage";

class WinnerItem {

	async render(winnerItem: IWinnerItem, index: number) {
		const garageCar: ICarItem = await getGarageCar(Number(winnerItem.id));
		console.log('garageCar: ', garageCar.id);
		console.log("winnerItem: ", winnerItem);
		const winnerItemNode = document.createElement("div");
		winnerItemNode.classList.add("winner-item");
		winnerItemNode.setAttribute('data-winner-id', `${winnerItem.id}`);

		winnerItemNode.innerHTML = `
			<div class="winner-item__number">${index + 1}</div>
			<div class="winner-item__car">${renderCarImage(garageCar.color)}</div>
			<div class="winner-item__name">${garageCar.name}</div>
			<div class="winner-item__wins">${winnerItem.wins}</div>
			<div class="winner-item__time">${winnerItem.time}</div>
		`;

		return winnerItemNode;
	}
}

export default WinnerItem;