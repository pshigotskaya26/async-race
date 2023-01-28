import { IWinnerItemAnimate } from './types/IWinnerItemAnimate';
import { IObjOfAnimateArray } from './types/IObjFromAnimate';
import "./index.scss"
import App from "./pages/app/index";
import { clearLocalStorage } from "./utils/clearLocalStorage";

clearLocalStorage();

let arrayOfWinnersAnimation: IWinnerItemAnimate[] = [];

localStorage.setItem('arrayOfWinnersAnimation',JSON.stringify(arrayOfWinnersAnimation));

export const baseUrlServer = 'http://127.0.0.1:3000';

export const path = {
	garage: '/garage',
	winners: '/winners',
	engine: '/engine',
}

export const arrBaseParam = [{ key: '_page', value: 1 }, { key: '_limit', value: 7 }];
export const arrBaseParamWinners = [{ key: '_page', value: 1 }, { key: '_limit', value: 10 }];

export const arrOfCarBrands = [
	"Audi", "BMW", "Ford", "Honda", "Hyundai",
	"Kia", "Lada", "Mazda", "Mercedes-Benz",
	"Mitsubishi", "Nissan", "Renault", "Skoda",
	"Toyota", "Volkswagen"
];

export const arrOfCarModels = [
	"Sedan", "Universal", "Liftback", "Hatchback", "Crossover"
];

export const arrOfColorLetters = ("0123456789ABCDEF").split('');
export let arrOfAnimation: IObjOfAnimateArray[] = [];

const app = new App();
app.run();