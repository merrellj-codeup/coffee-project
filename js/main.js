import { coffees } from "../data/coffees.js";
import { registerCoffeesToLocalStorage, updateCoffees, registerFilterEvents, handleModalBtnClick } from "./coffee-functions.js";

// MAIN
(() => {
	registerCoffeesToLocalStorage(coffees);
	updateCoffees();
	registerFilterEvents();

	const coffeeModalBtn = document.querySelector("#add-coffee");
	coffeeModalBtn.addEventListener("click", handleModalBtnClick);
})();
