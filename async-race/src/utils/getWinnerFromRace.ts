import { updateWinner } from './updateWinner';
import { IWinnerItemAnimate } from "../types/IWinnerItemAnimate";
import { ITotalWinners } from "../types/ITotalWinners";
import { getGarageCar } from "./getGarageCar";
import { getWinners } from "./getWinners";
import { createWinner } from './createWinner';

import { arrBaseParamWinners } from "../index";

export const getWinnerFromRace = async (idCarAnimate: number, timeCarAnimate: number) => {
	let timeCarAnimateSeconds = timeCarAnimate / 1000;
	console.log('timeCarAnimateSeconds: ', timeCarAnimateSeconds);

	let arrayOfWinnersAnimationFromLocal = localStorage.getItem('arrayOfWinnersAnimation');

	if (arrayOfWinnersAnimationFromLocal) {
		let arrWinnersAnimate: IWinnerItemAnimate[] = JSON.parse(arrayOfWinnersAnimationFromLocal);

		if (arrWinnersAnimate.length === 0) {
			console.log('WINNER: ', `car: ${idCarAnimate}, time: ${timeCarAnimateSeconds}`);

			arrWinnersAnimate.push({ id: idCarAnimate, time: timeCarAnimate });
			localStorage.setItem('arrayOfWinnersAnimation',JSON.stringify(arrWinnersAnimate));

			let garageCar = await getGarageCar(idCarAnimate);

			const blockWinnerNode: HTMLInputElement | null = document.querySelector(".garage__winnerBlock");

			if (blockWinnerNode) {
				blockWinnerNode.classList.remove('disable');
				blockWinnerNode.innerHTML = `
				<p>WINNERS: </p>
				<div>Car: <span class="winnerBlock__name">${garageCar.name}</span>, Time: <span class="winnerBlock__time">${timeCarAnimateSeconds} seconds</span></div>
			`;
			}

			//add winner in table
			let objOfWiners: ITotalWinners = await getWinners(arrBaseParamWinners);
			let arrrayOfWinners = objOfWiners.items;

			if (arrrayOfWinners?.length) {
				let filteredArrWin = arrrayOfWinners.filter(itemWinner => itemWinner.id === idCarAnimate);

				if (filteredArrWin.length) {
					//update winner

					let winW: number = filteredArrWin[0].wins;
					winW += 1;

					let timeW: number = filteredArrWin[0].time;

					if (timeCarAnimateSeconds < timeW) {
						timeW = timeCarAnimateSeconds;
					}

					await updateWinner(idCarAnimate, {wins: winW, time: timeW});
				}
				else {
					//create winner
					await createWinner({id: idCarAnimate, wins: 1, time: timeCarAnimateSeconds});
				}
			}
			const resetButton: HTMLInputElement | null = document.querySelector(".button-reset");
			resetButton?.classList.remove('disable');

			const raceButton: HTMLInputElement | null = document.querySelector(".button-race");
			raceButton?.classList.add('disable');
		}
	}
}