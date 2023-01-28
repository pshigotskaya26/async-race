export const setIdSelectedCarInLocal = (id: number) => {
	localStorage.setItem('idSelectedCar', `${id}`);
}