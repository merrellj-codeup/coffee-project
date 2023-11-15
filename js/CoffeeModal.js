export class CoffeeModal {
	constructor(coffeeList) {
		this.coffeeList = coffeeList;
		this.render();
	}
	render() {
		const modalElement = document.createElement("div");
		modalElement.classList.add("modal-container");
		modalElement.innerHTML = `
        <div class="modal-bg"></div>
        <div class="modal">
            <div class="row">
                <div class="col d-flex flex-column text-center align-items-center gap-4">
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
                <form class="col d-flex flex-column gap-3" id="coffee-form">
                    <label class="form-group">
                        <h3>Name</h3>
                        <input type="text" id="name" placeholder="Name" name="name" class="form-control" required>
                    </label>
                    <div class="filters">
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
                    <label class="form-group" required>
                        <h3>Price</h3>
                        <input type="text" id="price" placeholder="Price" name="price" class="form-control">
                    </label>
                    <label class="input-wrapper">
                        <h3>Description</h3>
                        <textarea id="price" name="description" placeholder="Add a description" class="form-control"></textarea>
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
		const coffeeForm = modalElement.querySelector("#coffee-form");
		coffeeForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const coffee = {
				name: e.target.name.value,
				roast: e.target.roast.value,
				price: e.target.price.value,
				description: e.target.description.value,
			};
			this.coffeeList.add(coffee);
			modalElement.classList.add("hide");
			modalElement.addEventListener("transitionend", (e) => {
				if (e.propertyName === "opacity") {
					modalElement.remove();
				}
			});
		});
		document.querySelector(".page-wrapper").appendChild(modalElement);
	}
}
