export const getRandomElement = (arr: string[]) => {
	const index = Math.floor(Math.random() * arr.length);
	return arr[index];
};