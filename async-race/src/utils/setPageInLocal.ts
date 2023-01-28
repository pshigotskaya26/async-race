export const setPageInLocal = (page: number) => {
	localStorage.setItem('page', `${page}`);
}