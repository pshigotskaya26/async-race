import "./index.scss";

class BaseControls {

	render() {
		const baseControlsContainerNode = document.createElement("div");
		baseControlsContainerNode.classList.add('base-controls__container');
		baseControlsContainerNode.innerHTML = `
		<div class="base-controls__create-car">
			<input class="input input-text_create" type="text" id="input-create_name" name="input-create_name">
			<input class="input-color input-color_create" type="color" id="input-create_color" name="nput-create_color" value="#4fc4ff">
			<button class="button button-create">Create</button>
		</div>

		<div class="base-controls__update-car disable">
			<input class="input input-text_update" type="text" id="input-update_name" name="input-update_name">
			<input class="input-color input-color_update" type="color" id="input-update_color" name="input-update_color" value="#4fc4ff">
			<button class="button button-update">Update</button>
		</div>

		<div class="base-controls__general-settings">
			<button class="button button-race">Race</button>
			<button class="button button-reset disable">Reset</button>
			<button class="button button-generate">Generate cars</button>
		</div>
		`;
		return baseControlsContainerNode;
	}
}

export default BaseControls;