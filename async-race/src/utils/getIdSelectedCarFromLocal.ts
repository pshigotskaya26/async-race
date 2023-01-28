export const getIdSelectedCarFromLocal = () => {
	let idSelectedCarFromLocal = localStorage.getItem('idSelectedCar');

	if (idSelectedCarFromLocal) {
		return Number(idSelectedCarFromLocal)
	}
}