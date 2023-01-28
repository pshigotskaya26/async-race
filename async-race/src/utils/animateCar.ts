import { IObjOfAnimateArray } from "../types/IObjFromAnimate";
import { IWinnerItemAnimate } from "../types/IWinnerItemAnimate";
import { arrOfAnimation } from "../index";
import { getWinnerFromRace } from "./getWinnerFromRace";

import { hasCarInAnimateArray } from "./hasCarInAnimateArray";
import { createObjAnimateArray } from "./createObjOfAnimateArray";
import { changeObjOfAnimateArray } from "./changeObjOfAnimateArray";

export const animateCar = (idCar: number, car: HTMLElement, time: number, distance: number, status: string, race?: string) => {
	let currentPosition = car.offsetLeft;
	const countOfFrames = (time * 60) / 1000;
	const step = distance / countOfFrames;
	let idRequestAnimationFrame: number;

	const start = async (timestamp?: number) => {
		currentPosition += step;
		car.style.transform = `translateX(${currentPosition}px)`;
		
		if (currentPosition < distance) {
			idRequestAnimationFrame = window.requestAnimationFrame(start);

			if (hasCarInAnimateArray(idCar, arrOfAnimation)) {
				changeObjOfAnimateArray(idCar, arrOfAnimation, idRequestAnimationFrame);
				localStorage.setItem('arrOfAnimationLocal', JSON.stringify(arrOfAnimation));
			}
			else {
				createObjAnimateArray(idCar, arrOfAnimation, idRequestAnimationFrame);
				localStorage.setItem('arrOfAnimationLocal', JSON.stringify(arrOfAnimation));
			}
		}
		else {
			if (race) {
				await getWinnerFromRace(idCar, time);

				/*

				let arrayOfWinnersAnimationFromLocal = localStorage.getItem('arrayOfWinnersAnimation');

				if (arrayOfWinnersAnimationFromLocal) {
					let arrWinnersAnimate: IWinnerItemAnimate[] = JSON.parse(arrayOfWinnersAnimationFromLocal);

					if (arrWinnersAnimate.length === 0) {
						console.log('WINNER: ', `car: ${idCar}, time: ${time}`);

						arrWinnersAnimate.push({ id: idCar, time: time });
						localStorage.setItem('arrayOfWinnersAnimation',JSON.stringify(arrWinnersAnimate));

						alert(`WINNER: `);
					}
					
				}

				*/
			}
		}
	};
	start();
};