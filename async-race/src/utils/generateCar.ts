export const generateCar = (tagInputName: HTMLInputElement, tagInputColor: HTMLInputElement) => {
		const nameValue = tagInputName.value.trim();
		const colorValue = tagInputColor?.value;

		console.log('colorValue: ',colorValue);
		return {name: nameValue, color: colorValue};
}