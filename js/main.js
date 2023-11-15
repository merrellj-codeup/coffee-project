import { coffees } from "../data/coffees.js";
import { updateCoffees, registerFilterEvents, handleModalBtnClick } from "./coffee-functions.js";

// MAIN
(() => {
	const coffeeModalBtn = document.querySelector("#add-coffee");
	updateCoffees(coffees);
	registerFilterEvents(coffees);
	coffeeModalBtn.addEventListener("click", handleModalBtnClick);
})();
