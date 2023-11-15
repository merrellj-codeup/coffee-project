import { coffees } from "../data/coffees.js";
import { convertToCurrency, debounce } from "./utils.js";

const renderCoffeeElement = (coffee) => {
	const coffeeElement = document.createElement("div");
	coffeeElement.classList.add("coffee-card", "col-12", "col-lg-6", "d-flex", "gap-2");
	let coffeeImage;
	switch (coffee.roast.toLowerCase()) {
		case "light":
			coffeeImage = "images/light-roast.jpeg";
			break;
		case "medium":
			coffeeImage = "images/medium-roast.jpeg";
			break;
		case "dark":
			coffeeImage = "images/dark-roast.webp";
			break;
		default:
			coffeeImage = "https://via.placeholder.com/84x70?";
	}
	let coffeePrice = coffee.price ? convertToCurrency(coffee.price) : convertToCurrency(5);
	const coffeeDesc = coffee.description ? coffee.description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.";

	coffeeElement.innerHTML = `
        <div class="d-flex flex-column flex-shrink-1">
            <div class="img-wrapper">
                <img src="${coffeeImage}" alt="Coffee image">
            </div>
        </div>
        <div class="d-flex flex-grow-1 flex-column justify-content-center">
            <div class="d-flex align-items-end">
                <div class="d-flex flex-column flex-shrink-1 text-nowrap">
                    <h3 class="coffee-name">${coffee.name}</h3>
                </div>
                <div class="d-flex flex-column flex-grow-1 dotted"></div>
                <div class="d-flex flex-column flex-shrink-1 text-nowrap">
                    <h3 class="coffee-price">${coffeePrice}</h3>
                </div>
            </div>
            <div class="d-flex">
                <div class="d-flex flex-column">
                    <p class="coffee-roast">${coffee.roast}</p>
                </div>
            </div>
            <div class="d-flex">
                <div class="d-flex flex-column">
                    <p class="coffee-description">${coffeeDesc}</p>
                </div>
            </div>
        </div>
    `;

	return coffeeElement;
};

const updateCoffees = (coffees) => {
	const coffeeContainer = document.querySelector("#coffees");
	coffeeContainer.classList.add("loading");
	setTimeout(() => {
		coffeeContainer.innerHTML = "";
		coffeeContainer.classList.remove("loading");
		let filteredCoffees = coffees;
		const roastFilter = document.querySelector("input[name=roast]:checked").value;
		filteredCoffees = filteredCoffees.filter((coffee) => {
			if (roastFilter === "all") {
				return true;
			}
			return coffee.roast.toLowerCase() === roastFilter.toLowerCase();
		});
		const searchFilter = document.querySelector("#search").value;
		filteredCoffees = filteredCoffees.filter((coffee) => {
			if (searchFilter === "") {
				return true;
			}
			return coffee.name.toLowerCase().includes(searchFilter.toLowerCase());
		});
		const coffeesFragment = document.createDocumentFragment();
		for (let coffee of filteredCoffees) {
			coffeesFragment.appendChild(renderCoffeeElement(coffee));
		}
		coffeeContainer.appendChild(coffeesFragment);
	}, 300);
};

const addCoffee = (e) => {};

const renderModalElement = () => {
	const modalElement = document.createElement("div");
	modalElement.classList.add("modal-container");
	modalElement.innerHTML = `
        <div class="modal-bg"></div>
        <div class="modal">
            <div class="row">
                <div class="column text-center align-center gap-20">
                    <h1>Add New Coffee</h1>
                    <div class="title-underline">
                        <div class="title-underline-line line-1"></div>
                        <div class="title-underline-line line-2"></div>
                        <div class="title-underline-line line-3"></div>
                        <div class="title-underline-line line-4"></div>
                        <div class="coffee-bean-icons">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191.68 252" fill="currentColor" class="bean-icon">
                                <g>
                                    <path d="M62.27,5.99c2.65-1.38,5.91-.62,7.67,1.79,12.71,17.64,27.55,45.81,16.8,97.66-13.11,63.17-6.89,106.4,14,137.26h0c1.25,1.81,1.39,4.16,.36,6.11-1.02,1.95-3.04,3.17-5.23,3.18C42.95,252,0,195.16,0,125.05,0,70.45,25.98,23.97,62.27,6h0Z"/>
                                    <path d="M106.06,7.79c-.62-2.08-.09-4.33,1.41-5.9,1.49-1.57,3.71-2.23,5.82-1.71,44.8,10.81,78.4,62.61,78.4,124.88,0,46.7-19.04,87.47-47.38,109.48h0c-2.38,1.9-5.8,1.76-8.01-.34-26.94-24.98-37.63-62.55-28-125.44,6.38-40.77,5.54-74.54-2.24-100.96h0Z"/>
                                </g>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191.68 252" fill="currentColor" class="bean-icon">
                                <g>
                                    <path d="M62.27,5.99c2.65-1.38,5.91-.62,7.67,1.79,12.71,17.64,27.55,45.81,16.8,97.66-13.11,63.17-6.89,106.4,14,137.26h0c1.25,1.81,1.39,4.16,.36,6.11-1.02,1.95-3.04,3.17-5.23,3.18C42.95,252,0,195.16,0,125.05,0,70.45,25.98,23.97,62.27,6h0Z"/>
                                    <path d="M106.06,7.79c-.62-2.08-.09-4.33,1.41-5.9,1.49-1.57,3.71-2.23,5.82-1.71,44.8,10.81,78.4,62.61,78.4,124.88,0,46.7-19.04,87.47-47.38,109.48h0c-2.38,1.9-5.8,1.76-8.01-.34-26.94-24.98-37.63-62.55-28-125.44,6.38-40.77,5.54-74.54-2.24-100.96h0Z"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <p class="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, atque cum cupiditate debitis delectus deleniti dignissimos magni maxime modi molestiae.</p>
                </div>
            </div>
            <div class="row">
                <form class="column gap-10" id="coffee-form">
                    <label class="input-wrapper">
                        <span>Name</span>
                        <input type="text" id="name" placeholder="Name" name="name" required>
                    </label>
                    <div class="radio-group" required>
                        <h3>Roast</h3>
                        <label class="radio">
                            <input type="radio" name="roast" value="light">
                            <span>Light</span>
                        </label>
                        <label class="radio">
                            <input type="radio" name="roast" value="medium">
                            <span>Medium</span>
                        </label>
                        <label class="radio">
                            <input type="radio" name="roast" value="dark">
                            <span>Dark</span>
                        </label>
                    </div>
                    <label class="input-wrapper" required>
                        <span>Price</span>
                        <input type="formattedNumber" id="price" placeholder="Price" name="price">
                    </label>
                    <label class="input-wrapper">
                        <span>Description</span>
                        <textarea id="price" name="description" placeholder="Add a description"></textarea>
                    </label>
                    <button type="submit" class="btn" id="submit-coffee">Submit</button>
                </form>
            </div>
        </div>
    `;
	const modalBg = modalElement.querySelector(".modal-bg");
	modalBg.addEventListener("click", () => {
		modalElement.classList.add("hide");
		modalElement.addEventListener("transitionend", () => {
			modalElement.remove();
		});
	});
	document.querySelector(".page-wrapper").appendChild(modalElement);
};

const registerFilterEvents = () => {
	const roastRadios = document.querySelectorAll("input[name=roast]");
	for (let roastRadio of roastRadios) {
		roastRadio.addEventListener("change", (e) => {
			updateCoffees(coffees);
		});
	}

	const searchFilter = document.querySelector("#search");
	searchFilter.addEventListener(
		"input",
		debounce((e) => {
			updateCoffees(coffees);
		}, 300)
	);
};

const handleModalBtnClick = (e) => {
	const hasModal = document.querySelector(".modal-container");
	if (hasModal) {
		return;
	}
	renderModalElement();
};

// MAIN
(() => {
	const coffeeModalBtn = document.querySelector("#add-coffee");
	updateCoffees(coffees);
	registerFilterEvents();
	coffeeModalBtn.addEventListener("click", handleModalBtnClick);
})();
