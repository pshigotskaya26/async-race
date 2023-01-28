import "./index.scss";

class Header {
	private headerNode: HTMLElement;

	constructor() {
		this.headerNode = document.createElement('header');
		this.headerNode.classList.add('header');
	}

	render() {
		const headerContainer = document.createElement('div');
		headerContainer.classList.add('header__container');

		headerContainer.innerHTML = `
			<nav class="header__navigation">
				<ul class="navigation">
					<li class="navigation__item">
						<a href="#garage" class="navigation-link garage-link navigation-link_activ">Garage</a>
					</li>
					<li class="navigation__item">
						<a href="#winners" class="navigation-link winners-link">Winners</a>
					</li>
				</ul>
			</nav>
			<h1 class="header__title">Play - RACE</h1>
		`;

		this.headerNode.append(headerContainer);
		return this.headerNode;
	}

	setActiveButton(nameButton: string) {
		const buttonGarage: HTMLElement | null = this.headerNode.querySelector('.garage-link');
		const buttonWinners: HTMLElement | null = this.headerNode.querySelector('.winners-link');

		if (nameButton === 'garage') {
			buttonGarage?.classList.add('navigation-link_activ');
			buttonWinners?.classList.remove('navigation-link_activ');
		}
		if (nameButton === 'winners') {
			buttonGarage?.classList.remove('navigation-link_activ');
			buttonWinners?.classList.add('navigation-link_activ');
		}
	}
}

export default Header;