import "./index.scss";

class PageButtons {

	render() {
		const pageButtonsContainerNode = document.createElement("div");
		pageButtonsContainerNode.classList.add('page-buttons__container');
		pageButtonsContainerNode.innerHTML = `
			<button class="button button-prev disable">Prev</button>
			<button class="button button-next">Next</button>
		`;

		return pageButtonsContainerNode;
	}
}

export default PageButtons;