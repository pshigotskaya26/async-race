import BaseControls from "../../components/baseControls/index";
import NameBlock from "../../components/nameBlock/index";
import PageBlock from "../../components/pageBlock/index";
import CarList from "../../components/carList/index";
import PageButtons from "../../components/pageButtons/index";

import { setPageInLocal } from '../../utils/setPageInLocal';
import { setIdSelectedCarInLocal } from '../../utils/setIdSelectedCarInLocal';
import { setStatusToPageButtons } from '../../utils/setStatusToPageButtons';
import { getMaxPageValue } from "../../utils/getMaxPageValue";
import { getGarageCars } from "../../utils/getGarageCars";
import { getNumbOfPage } from "../../utils/getNumbOfPage";
import { getIdSelectedCarFromLocal } from '../../utils/getIdSelectedCarFromLocal';
import { generateArrayRandomCars } from '../../utils/generateArrayRandomCars';
import { startEngine } from '../../utils/startEngine';
import { stopEngine } from "../../utils/stopEngine";
import { driveCar } from '../../utils/driveCar';
import { getTimeFromStartEngine } from '../../utils/getTimeFromStartEngine';
import { getDistanceHtml } from '../../utils/getDistanceHtml';
import { toggleDisableStartStop } from '../../utils/toggleDisableStartStop';
import { animateCar } from '../../utils/animateCar';
import { startCar } from "../../utils/startCar";
import { stopCar } from "../../utils/stopCar";

import { generateCar } from "../../utils/generateCar";
import { createCar } from "../../utils/createCar";
import { deleteCar } from '../../utils/deleteCar';
import { updateCar } from '../../utils/updateCar';
import { deleteWinner } from "../../utils/deleteWinner";

import { arrBaseParam } from "../../index";
import { ITotalCars } from "../../types/ITotalCars";
import { IWinnerItemAnimate } from "../../types/IWinnerItemAnimate";

class GaragePage {
	private container: HTMLElement;
	private baseControlsNode: HTMLElement;
	private nameBlockNode: HTMLElement;
	private pageBlockNode: HTMLElement;
	private carListNode: HTMLElement;
	private pageButtonsNode: HTMLElement;

	private totalCars: ITotalCars;
	private maxPageValue: number;
	private page: number;
	private carsOnPage: ITotalCars;

	private baseControlsObj: BaseControls;
	private nameBlockObj: NameBlock;
	private pageBlockObj: PageBlock;
	private cartListObj: CarList;
	private pageButtonsObj: PageButtons;

	constructor(id: string) {
		this.container = document.createElement("div");
		this.container.classList.add("garage");
		this.container.id = id;
	
		this.totalCars = {};
		this.maxPageValue = 1;
		this.page = 1;
		this.carsOnPage = {};

		this.baseControlsNode = document.createElement('div');
		this.baseControlsNode.classList.add("garage__base-controls");

		this.nameBlockNode = document.createElement('div');
		this.nameBlockNode.classList.add("garage__name-block");

		this.carListNode = document.createElement("div");
		this.carListNode.classList.add("garage__car-list");

		this.pageBlockNode = document.createElement("div");
		this.pageBlockNode.classList.add("garage__page-block");

		this.pageButtonsNode = document.createElement("div");
		this.pageButtonsNode.classList.add("garage__page-buttons");
	
		this.baseControlsObj = new BaseControls();
		this.nameBlockObj = new NameBlock();
		this.pageBlockObj = new PageBlock();
		this.cartListObj = new CarList();
		this.pageButtonsObj = new PageButtons();
	}

	private async createContentPage() {
		localStorage.removeItem('arrOfAnimationLocal');

		let garageContainer: HTMLDivElement | null = document.createElement("div");
		garageContainer.classList.add("garage__container");

		this.totalCars = await getGarageCars(arrBaseParam);
		this.maxPageValue = await getMaxPageValue(arrBaseParam);
		this.page = await getNumbOfPage(arrBaseParam);
		this.carsOnPage = await getGarageCars(arrBaseParam, this.page);
		this.baseControlsNode.append(this.baseControlsObj.render());
		this.nameBlockNode.append(this.nameBlockObj.render(this.totalCars));
		this.pageBlockNode.append(this.pageBlockObj.render(this.page));
		this.carListNode.append(await this.cartListObj.render(this.carsOnPage));
		this.pageButtonsNode.append(this.pageButtonsObj.render());

		garageContainer.append(this.baseControlsNode);
		garageContainer.append(this.nameBlockNode);
		garageContainer.append(this.pageBlockNode);
		garageContainer.append(await this.carListNode);
		garageContainer.append(this.pageButtonsNode);

		let garageWinnerBlock: HTMLDivElement | null = document.createElement("div");
		garageWinnerBlock.classList.add("garage__winnerBlock");
		garageWinnerBlock.classList.add("disable");

		garageContainer.append(garageWinnerBlock);

		return garageContainer;
	}

	private handleEvents() {
		
		const garageNode: HTMLElement | null = this.container.querySelector(".garage__container");
		if (garageNode) {
			garageNode.addEventListener('click', async (event: Event) => {

				//if we click on create button
				if (event.target instanceof HTMLElement && event.target.classList.contains("button-create")) {
					const inputNameNode: HTMLInputElement | null = garageNode.querySelector(".input-text_create");
					const inputColorNode: HTMLInputElement | null = garageNode.querySelector(".input-color_create");

					if (inputNameNode && inputColorNode && inputNameNode.value.trim() !== '') {
						const generateCarObj = generateCar(inputNameNode, inputColorNode);
						await createCar(generateCarObj);
						inputNameNode.value = '';
						setPageInLocal(this.page);
						this.updateAll();
					}
				}

				//if we click on button NEXT
				if (event.target instanceof HTMLElement && event.target.classList.contains("button-next")) {
					let currentPage = this.page;

					if (currentPage < this.maxPageValue) {
						this.page += 1;
						setPageInLocal(this.page);
						this.updateAll();
					}
				}

				//if we click on button PREV
				if (event.target instanceof HTMLElement && event.target.classList.contains("button-prev")) {
					let currentPage = this.page;

					if (currentPage > 1 && currentPage <= this.maxPageValue) {
						this.page -= 1;
						setPageInLocal(this.page);
						this.updateAll();
					}
				}

				//if we click on button DELETE
				if (event.target instanceof HTMLElement && event.target.classList.contains("button-remove")) {
					let id = event.target.getAttribute("data-car-remove");
					await deleteCar(Number(id));
					await deleteWinner(Number(id));
					setPageInLocal(this.page);
					this.updateAll();
					setStatusToPageButtons(arrBaseParam, this.container);
				}

				//if we click on button SELECT
				if (event.target instanceof HTMLElement && event.target.classList.contains("button-select")) {
					const blockCreate: HTMLElement | null = garageNode.querySelector(".base-controls__create-car");
					const blockUpdate: HTMLElement | null = garageNode.querySelector(".base-controls__update-car");
					blockCreate?.classList.add("disable");
					blockUpdate?.classList.remove("disable");

					let idSelectedCar = event.target.getAttribute("data-car-select");
					setIdSelectedCarInLocal(Number(idSelectedCar));
					setPageInLocal(this.page);
					this.updateAll();
				}

				//if we click on button UPDATE
				if (event.target instanceof HTMLElement && event.target.classList.contains("button-update")) {
					const inputNameNode : HTMLInputElement | null = garageNode.querySelector(".input-text_update");
					const inputColorNode : HTMLInputElement | null = garageNode.querySelector(".input-color_update");

					let idSelectedCar = getIdSelectedCarFromLocal();

					if (inputNameNode && inputColorNode && inputNameNode.value.trim() !== '') {
						const generateCarObj = generateCar(inputNameNode, inputColorNode);

						if (idSelectedCar) {
							await updateCar(idSelectedCar, generateCarObj);
						}

						inputNameNode.value = '';
						setPageInLocal(this.page);
						this.updateAll();

						const blockCreate: HTMLElement | null = garageNode.querySelector(".base-controls__create-car");
						const blockUpdate: HTMLElement | null = garageNode.querySelector(".base-controls__update-car");
						
						blockCreate?.classList.remove("disable");
						blockUpdate?.classList.add("disable");
					}
				}

				//if we click on button GENERATE CARS
				if (event.target instanceof HTMLElement && event.target.classList.contains("button-generate")) {
					const arrayRandomCars = generateArrayRandomCars();
					
					if (arrayRandomCars.length === 100) {
						arrayRandomCars.forEach(async (item) => await createCar(item));
					}
					setPageInLocal(this.page);
					await this.updateAll();
				}

				//if we click on button START button
				if (event.target instanceof HTMLElement && event.target.classList.contains("button-start")) {
					await startCar(event.target);
				}

				//if we click on button STOP button
				if (event.target instanceof HTMLElement && event.target.classList.contains("button-stop")) {
					await stopCar(event.target);
					localStorage.setItem('arrOfAnimationLocal', JSON.stringify([]));
				}

				//if we click on button Race button
				if (event.target instanceof HTMLElement && event.target.classList.contains("button-race")) {
					toggleDisableStartStop(event.target);
					const arrOfButtonsStart = garageNode.querySelectorAll<HTMLElement>('.button-start');
					//create promises
					let arrayOfPromises: Promise<void>[] = [];
					for (let i = 0; i < arrOfButtonsStart.length; i++) {
						let promise: Promise<void> = new Promise((resolve, reject) => {
							resolve(startCar(arrOfButtonsStart[i], 'race'));
						});
						arrayOfPromises.push(promise)
					}
					await Promise.all(arrayOfPromises);	
				}

				//if we click on button Reset button
				if (event.target instanceof HTMLElement && event.target.classList.contains("button-reset")) {
					toggleDisableStartStop(event.target);
					const arrOfButtonsStop = garageNode.querySelectorAll<HTMLElement>('.button-stop');
					if (arrOfButtonsStop) {
						arrOfButtonsStop.forEach(item => toggleDisableStartStop(item));
					}
					const buttonRaceNode: HTMLElement | null = garageNode.querySelector(".button-race");
					if (buttonRaceNode) {
						toggleDisableStartStop(buttonRaceNode);
					}
					await this.updateAll();
					const winnerBlockNode: HTMLElement | null = document.querySelector('.garage__winnerBlock');
					winnerBlockNode?.classList.add('disable');

					let arrayOfWinnersAnimation: IWinnerItemAnimate[] = [];
					localStorage.setItem('arrayOfWinnersAnimation',JSON.stringify(arrayOfWinnersAnimation));
					await this.updateAll();
				}
			});
		}
	}

	private async updateAll() {
		this.totalCars = await getGarageCars(arrBaseParam);
		this.maxPageValue = await getMaxPageValue(arrBaseParam);
		this.page = await getNumbOfPage(arrBaseParam);
		setPageInLocal(this.page);
		this.carsOnPage = await getGarageCars(arrBaseParam, this.page);
		this.updateCountCarsOnPage();
		this.updateCarList();
		this.updateNumbOfPage();
		this.updatePageButtons();
	}

	private updateCountCarsOnPage() {
		this.nameBlockNode.innerHTML = '';
		this.nameBlockNode.append(this.nameBlockObj.render(this.totalCars));
	}

	private updateCarList () {
		this.carListNode.innerHTML = '';
		this.carListNode.append(this.cartListObj.render(this.carsOnPage));
	}

	private updateNumbOfPage() {
		this.pageBlockNode.innerHTML = '';
		this.pageBlockNode.append(this.pageBlockObj.render(this.page));
	}

	private updatePageButtons() {
		this.pageButtonsNode.innerHTML = '';
		this.pageButtonsNode.append(this.pageButtonsObj.render());
		setStatusToPageButtons(arrBaseParam, this.container);
	}

	async render() {
		const content = await this.createContentPage();
		this.container.append(content);
		setPageInLocal(this.page);
		setStatusToPageButtons(arrBaseParam, this.container);
		this.handleEvents();
		return this.container;
	}
}

export default GaragePage;