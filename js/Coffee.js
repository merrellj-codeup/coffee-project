export class Coffee {
	constructor(coffee, coffeeList) {
		this.name = coffee.name;
		this.roast = coffee.roast;
		this.price = this.parsePrice(coffee.price);
		this.description = this.parseDescription(coffee.description);
		this.image = this.assignImage(coffee.roast);
		this.coffeeList = coffeeList;
		this.element = this.createCoffeeElement();
	}
	parsePrice(price) {
		return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
	}
	parseDescription(description) {
		return description ? description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.";
	}
	assignImage(roast) {
		switch (roast.toLowerCase()) {
			case "light":
				return "images/light-roast.jpeg";
			case "medium":
				return "images/medium-roast.jpeg";
			case "dark":
				return "images/dark-roast.webp";
			default:
				return "https://via.placeholder.com/84x70?";
		}
	}
	createCoffeeElement() {
		const coffeeElement = document.createElement("div");
		coffeeElement.classList.add("coffee-card", "col-12", "col-lg-6", "d-flex", "gap-2");
		coffeeElement.innerHTML = `
            <div class="d-flex flex-column flex-shrink-1">
                <div class="img-wrapper">
                    <img src="${this.image}" alt="Coffee image">
                </div>
            </div>
            <div class="d-flex flex-grow-1 flex-column justify-content-center">
                <div class="d-flex align-items-end">
                    <div class="d-flex flex-column flex-shrink-1 text-nowrap">
                        <h3 class="coffee-name">${this.name}</h3>
                    </div>
                    <div class="d-flex flex-column flex-grow-1 dotted"></div>
                    <div class="d-flex flex-column flex-shrink-1 text-nowrap">
                        <h3 class="coffee-price">${this.price}</h3>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="d-flex flex-column">
                        <p class="coffee-roast">${this.roast}</p>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="d-flex flex-column">
                        <p class="coffee-description">${this.description}</p>
                    </div>
                </div>
            </div>
        `;
		coffeeElement.roast = this.roast;
		coffeeElement.name = this.name;
		// const editBtn = coffeeElement.querySelector("[data-edit]");
		// editBtn.addEventListener("click", (e) => {
		// 	this.name = "New Name";
		// 	this.price = "New Price";
		// 	this.element.querySelector(".coffee-name").textContent = this.name;
		// 	this.element.querySelector(".coffee-price").textContent = this.price;
		// });

		return coffeeElement;
	}
}
