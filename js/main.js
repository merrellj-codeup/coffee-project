import { coffees } from "../data/coffees.js";
import { CoffeeList } from "./CoffeeList.js";
import { CoffeeModal } from "./CoffeeModal.js";
import { debounce } from "./utils.js";

// import { registerCoffeesToLocalStorage, updateCoffees, registerFilterEvents, handleModalBtnClick } from "./coffee-functions.js";

const registerFilterEvents = (coffeeList) => {
	const roastRadios = document.querySelectorAll("input[name=roast]");
	for (let roastRadio of roastRadios) {
		roastRadio.addEventListener("change", (e) => {
			coffeeList.update();
		});
	}

	const searchFilter = document.querySelector("#search");
	searchFilter.addEventListener(
		"input",
		debounce((e) => {
			coffeeList.update();
		}, 300)
	);
};

export const handleModalBtnClick = (coffeeList) => {
	const hasModal = document.querySelector(".modal-container");
	if (hasModal) {
		return;
	}
	new CoffeeModal(coffeeList);
};

// MAIN
(() => {
	const coffeeList = new CoffeeList(coffees);
	console.log(coffeeList);
	registerFilterEvents(coffeeList);
	const addCoffeeBtn = document.querySelector("#add-coffee");
	addCoffeeBtn.addEventListener("click", (e) => {
		handleModalBtnClick(coffeeList);
	});
})();
