import Header from "../../components/header/index";
import GaragePage from "../garage/index";
import WinnersPage from "../winners/index";
import { IUrlParams } from "../../types/IUrlParams";
import { getUrlParams } from "../../utils/getUrlParams";

class App {
	private container: HTMLElement;
	private wrap: HTMLElement;
	private header: Header;
	private static defaultPageID: string = 'current-page';
	private initialPage: GaragePage;

	constructor() {
		this.container = document.body;
		this.wrap = document.createElement("div");
		this.wrap.classList.add("wrap");
		this.container.append(this.wrap);
		this.header = new Header();
		this.initialPage = new GaragePage("garage-page");
	}

	private async renderNewPage({hashPage}: IUrlParams) {
		const currentPageHTML: HTMLDivElement | null = document.querySelector(`#${App.defaultPageID}`);

		if (currentPageHTML) {
			currentPageHTML.innerHTML = '';
		
			let page: GaragePage | WinnersPage | null = null;
	
			if (hashPage === '') {
				page = new GaragePage("garage-page");
			}
			else if (hashPage.includes("garage")) {
				page = new GaragePage("garage-page");
				this.header.setActiveButton('garage');
			}
			else if (hashPage.includes("winners")) {
				page = new WinnersPage("winners-page");
				this.header.setActiveButton('winners');
			}
	
			if (page) {
				const pageHTML = await page.render();
				currentPageHTML.append(pageHTML);
			}
		}
	}

	private enableRouteChange = () => {
		window.addEventListener("hashchange", async() => {
			await this.handleURLParams();
		});
    }

	private async handleURLParams() {
		let UrlParams: IUrlParams = getUrlParams(window.location.hash);
		await this.renderNewPage(UrlParams);
	}

	private async checkLocation() {
        const pageHTML = await this.initialPage.render();
        pageHTML.id = App.defaultPageID;

        this.wrap.append(pageHTML);

        let URLParams: IUrlParams = getUrlParams(window.location.hash);

        if (URLParams.hashPage) {
            await this.renderNewPage(URLParams);
        }
    }

	private handleEventOnApp() {
		this.container.addEventListener("click", (event: Event) => {
			if (event.target instanceof HTMLElement && event.target.classList.contains('garage-link')) {
				this.header.setActiveButton('garage');
			}
			if (event.target instanceof HTMLElement && event.target.classList.contains('winners-link')) {
				this.header.setActiveButton('winners');
			}
		});
	}

	run() {

		addEventListener("DOMContentLoaded", async () => {
            this.wrap.append(this.header.render());
			await this.checkLocation();
			await this.enableRouteChange();
        }, true)
		
	}
}
export default App;