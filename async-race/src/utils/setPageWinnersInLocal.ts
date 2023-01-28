export const setPageWinnersInLocal = (pageWinners: number) => {
	localStorage.setItem('pageWinners', `${pageWinners}`);
	console.log('занесен pageWin в локал');
}