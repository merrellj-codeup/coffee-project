import {coffees} from './coffeelist.js';

let roastToggles = document.querySelectorAll(".selection");
let roastSelection = document.querySelector(".selection.active");
let tbody = document.querySelector('#coffees');

function renderCoffee(coffee) {
    let html = `
        <div class="coffee-card">
            <div class="column shrink">
                <div class="img-wrapper">
                    <img src="https://via.placeholder.com/84x70?" alt="Coffee 1">
                </div>
            </div>
            <div class="column justify-center">
                <div class="row no-gap align-bottom">
                    <div class="column shrink no-wrap">
                        <h3 class="coffee-name">${coffee.name}</h3>
                    </div>
                    <div class="column dotted"></div>
                    <div class="column shrink">
                        <h3 class="coffee-price">$5</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="column">
                        <p class="coffee-roast">${coffee.roast}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column">
                        <p class="coffee-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees() {
    let selectedRoast = roastSelection.innerText.toLowerCase();
    let filteredCoffees = [];
    if (selectedRoast === "all") {
        filteredCoffees = coffees;
    } else {
        coffees.forEach(function (coffee) {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        });
    }
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

function updateRoastSelection(e) {
    roastSelection.classList.remove("active");
    roastSelection = e.target;
    roastSelection.classList.add("active");
    updateCoffees();
}

updateCoffees(coffees);

roastToggles.forEach(function(toggle) {
    toggle.addEventListener('click', updateRoastSelection);
});