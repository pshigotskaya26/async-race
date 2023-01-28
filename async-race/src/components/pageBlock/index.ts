import "./index.scss";

class PageBlock {

	render(numbOfPage: number): HTMLElement {
		const pageBlockContainer = document.createElement("p");
		pageBlockContainer.classList.add('page-block__content');
		pageBlockContainer.innerHTML = `Page #${numbOfPage}`;
		return pageBlockContainer;
	}
}

export default PageBlock;