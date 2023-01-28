import NameBlockWinners from "../../components/nameBlockWinners/index";
import PageBlock from "../../components/pageBlock/index";
import WinnersList from "../../components/winnersList/index";
import PageButtons from "../../components/pageButtons/index";

import { getWinners } from "../../utils/getWinners";
import { getMaxPageWinnersValue } from "../../utils/getMaxPageWinnersValue";
import { getNumbOfPageWinners } from "../../utils/getNumbOfPageWinners";
import { setPageWinnersInLocal } from "../../utils/setPageWinnersInLocal";
import { setStatusToPageButtons } from "../../utils/setStatusToPageButtons";

import { ITotalWinners } from "../../types/ITotalWinners";
import { IWinnerItemAnimate } from "../../types/IWinnerItemAnimate";
import { arrBaseParamWinners } from "../../index";

class WinnersPage {
	private container: HTMLElement;
	private nameBlockWinnersNode: HTMLElement;
	private pageBlockWinnersNode: HTMLElement;
	private winnersListNode: HTMLElement;
	private pageButtonsNode: HTMLElement;

	private totalWinners: ITotalWinners;
	private maxPageWinnersValue: number;
	private pageWinners: number;
	private winnersOnPage: ITotalWinners;

	private nameBlockWinnersObj: NameBlockWinners;
	private pageBlockObj: PageBlock;
	private winnersListObj: WinnersList;
	private pageButtonsObj: PageButtons;

	constructor(id: string) {
		this.container = document.createElement("div");
		this.container.classList.add("winners");
		this.container.id = id;

		this.totalWinners = {};
		this.maxPageWinnersValue = 1;
		this.pageWinners = 1;
		this.winnersOnPage = {};

		this.nameBlockWinnersNode = document.createElement('div');
		this.nameBlockWinnersNode.classList.add("winners__name-block");

		this.winnersListNode = document.createElement("div");
		this.winnersListNode.classList.add("winners__winners-list");

		this.pageBlockWinnersNode = document.createElement("div");
		this.pageBlockWinnersNode.classList.add("winners__page-block");

		this.pageButtonsNode = document.createElement("div");
		this.pageButtonsNode.classList.add("winners__page-buttons");

		this.nameBlockWinnersObj = new NameBlockWinners();
		this.pageBlockObj = new PageBlock();
		this.winnersListObj = new WinnersList();
		this.pageButtonsObj = new PageButtons();
	}

	private async createContentPage() {
		let arrayOfWinnersAnimation: IWinnerItemAnimate[] = [];
		localStorage.setItem('arrayOfWinnersAnimation',JSON.stringify(arrayOfWinnersAnimation));

		let winnersContainer = document.createElement("div");
		winnersContainer.classList.add("winners__container");

		this.totalWinners = await getWinners(arrBaseParamWinners);
		this.maxPageWinnersValue = await getMaxPageWinnersValue(arrBaseParamWinners);

		this.pageWinners = await getNumbOfPageWinners(arrBaseParamWinners);
		this.winnersOnPage = await getWinners(arrBaseParamWinners, this.pageWinners);

		this.nameBlockWinnersNode.append(this.nameBlockWinnersObj.render(this.totalWinners));
		this.pageBlockWinnersNode.append(this.pageBlockObj.render(this.pageWinners));
		this.winnersListNode.append(await this.winnersListObj.render(this.winnersOnPage));
		this.pageButtonsNode.append(this.pageButtonsObj.render());

		winnersContainer.append(this.nameBlockWinnersNode);
		winnersContainer.append(this.pageBlockWinnersNode);
		winnersContainer.append(this.winnersListNode);
		winnersContainer.append(this.pageButtonsNode);

		return winnersContainer;
	}
	
	private handleEvents() {
		const winnersNode: HTMLElement | null = this.container.querySelector(".winners__container");

		if (winnersNode) {
			winnersNode.addEventListener('click', async (event: Event) => {
				
				//if we click on button NEXT
				if (event.target instanceof HTMLElement && event.target.classList.contains("button-next")) {
					let currentPage = this.pageWinners;

					if (currentPage < this.maxPageWinnersValue) {
						this.pageWinners += 1;
						setPageWinnersInLocal(this.pageWinners);
						this.updateAll();
					}
				}

				//if we click on button PREV
				if (event.target instanceof HTMLElement && event.target.classList.contains("button-prev")) {
					let currentPage = this.pageWinners;

					if (currentPage > 1 && currentPage <= this.maxPageWinnersValue) {
						this.pageWinners -= 1;
						setPageWinnersInLocal(this.pageWinners);
						this.updateAll();
					}
				}
			});
		}
	}

	private async updateAll() {
		this.totalWinners = await getWinners(arrBaseParamWinners);
		this.maxPageWinnersValue = await getMaxPageWinnersValue(arrBaseParamWinners);
		this.pageWinners = await getNumbOfPageWinners(arrBaseParamWinners);
		setPageWinnersInLocal(this.pageWinners);
		this.winnersOnPage = await getWinners(arrBaseParamWinners, this.pageWinners);
		this.updateCountWinnersOnPage();
		this.updateWinnersList();
		this.updateNumbOfPageWinners();
		this.updatePageButtons();
	}

	private updateCountWinnersOnPage() {
		this.nameBlockWinnersNode.innerHTML = '';
		this.nameBlockWinnersNode.append(this.nameBlockWinnersObj.render(this.totalWinners));
	}

	private async updateWinnersList () {
		this.winnersListNode.innerHTML = '';
		this.winnersListNode.append(await this.winnersListObj.render(this.winnersOnPage));
	}

	private updateNumbOfPageWinners() {
		this.pageBlockWinnersNode.innerHTML = '';
		this.pageBlockWinnersNode.append(this.pageBlockObj.render(this.pageWinners));
	}

	private updatePageButtons() {
		this.pageButtonsNode.innerHTML = '';
		this.pageButtonsNode.append(this.pageButtonsObj.render());
		setStatusToPageButtons(arrBaseParamWinners, this.container);
	}

	async render() {
		const content = await this.createContentPage();
		this.container.append(content);
		setPageWinnersInLocal(this.pageWinners);
		setStatusToPageButtons(arrBaseParamWinners, this.container);
		this.handleEvents();
		return this.container;
	}
}

export default WinnersPage;