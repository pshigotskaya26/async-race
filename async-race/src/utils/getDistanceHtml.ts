export const getDistanceHtml = (tag: HTMLElement) => {
	const carItemNode: HTMLElement | null = tag.closest('.car-item');

	if (carItemNode) {
		const carRoadWayNode: HTMLElement | null = carItemNode.querySelector('.car-road__way');
		let distance = carRoadWayNode?.offsetWidth;
		if (distance) {
			return distance - 150;
		}
	}
}