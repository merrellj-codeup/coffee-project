import { Coffee } from "./Coffee.js";

export class CoffeeList {
	constructor(coffees) {
		this.coffees = this.init(coffees);
		this.element = document.querySelector("#coffees");
		this.render();
	}
	init(coffees) {
		return coffees.map((coffee) => new Coffee(coffee, this));
	}
	render() {
		this.element.innerHTML = "";
		const filteredCoffees = this.filter(this.coffees);
		const coffeesFragment = document.createDocumentFragment();
		for (let coffee of filteredCoffees) {
			coffeesFragment.appendChild(coffee.element);
		}
		this.element.appendChild(coffeesFragment);
	}
	update() {
		this.render();
	}
	filter(coffees) {
		const roastFilter = document.querySelector("input[name=roast]:checked").value;
		const searchFilter = document.querySelector("#search").value;
		return coffees
			.filter((coffee) => {
				if (roastFilter === "all") {
					return true;
				}
				return coffee.roast.toLowerCase() === roastFilter.toLowerCase();
			})
			.filter((coffee) => {
				if (searchFilter === "") {
					return true;
				}
				return coffee.name.toLowerCase().includes(searchFilter.toLowerCase());
			});
	}
	add(coffee) {
		this.coffees.push(new Coffee(coffee, this));
		this.update();
	}
	remove(coffeeName) {
		this.coffees = this.coffees.filter((coffee) => coffeeName.toLowerCase() !== coffee.name.toLowerCase());
		this.update();
	}
}
