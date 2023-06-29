import { coffees } from "./coffeelist.js";

let roastToggles = document.querySelectorAll(".selection");
let roastSelection = document.querySelector(".selection.active");
let tbody = document.querySelector("#coffees");
const addCoffee = document.querySelector("#add-coffee");
const searchInput = document.querySelector("#search");
const pageWrapper = document.querySelector(".page-wrapper");
const modalBg = document.querySelector(".modal-bg");
const submitCoffee = document.querySelector("#submit-coffee");
const priceInput = document.querySelector("#price");
const coffeeForm = document.querySelector("#coffee-form");

function renderCoffee(coffee) {
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
  let coffeePrice = coffee.price ? coffee.price : 5;
  // if coffee price ends with .00, remove it
  if (coffeePrice.toString().endsWith(".00")) {
    coffeePrice = coffeePrice.slice(0, -3);
  }
  const coffeeDesc = coffee.description
    ? coffee.description
    : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.";
  let html = `
        <div class="coffee-card fade-out">
            <div class="column shrink">
                <div class="img-wrapper">
                    <img src="${coffeeImage}" alt="Coffee image">
                </div>
            </div>
            <div class="column justify-center">
                <div class="row no-gap align-bottom">
                    <div class="column shrink no-wrap">
                        <h3 class="coffee-name">${coffee.name}</h3>
                    </div>
                    <div class="column dotted"></div>
                    <div class="column shrink">
                        <h3 class="coffee-price">$${coffeePrice}</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="column">
                        <p class="coffee-roast">${coffee.roast}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column">
                        <p class="coffee-description">${coffeeDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

  return html;
}

function renderCoffees(coffees) {
  let html = "";
  for (let i = coffees.length - 1; i >= 0; i--) {
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
  requestAnimationFrame(function () {
    const coffeeCards = document.querySelectorAll(".coffee-card");
    filterRenderedCoffees();
    coffeeCards.forEach(function (card) {
      card.classList.remove("fade-out");
    });
  });
}

function updateRoastSelection(e) {
  roastSelection.classList.remove("active");
  roastSelection = e.target;
  roastSelection.classList.add("active");
  const coffeeCards = document.querySelectorAll(".coffee-card");
  // fade out all coffee cards, THEN update coffees, THEN fade in all coffee cards
  coffeeCards.forEach(function (card) {
    card.classList.add("fade-out");
  });
  setTimeout(function () {
    updateCoffees();
  }, 200);
}

function filterRenderedCoffees(e) {
  const coffeeCards = document.querySelectorAll(".coffee-card");
  const searchValue = searchInput.value.toLowerCase();
  coffeeCards.forEach(function (card) {
    const coffeeName = card
      .querySelector(".coffee-name")
      .innerText.toLowerCase();
    if (coffeeName.includes(searchValue)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

updateCoffees(coffees);

roastToggles.forEach(function (toggle) {
  toggle.addEventListener("click", updateRoastSelection);
});

searchInput.addEventListener("input", filterRenderedCoffees);

addCoffee.addEventListener("click", function (e) {
  e.preventDefault();
  pageWrapper.classList.toggle("modal-open");
});
modalBg.addEventListener("click", function (e) {
  e.preventDefault();
  pageWrapper.classList.toggle("modal-open");
});
submitCoffee.addEventListener("click", function (e) {
  // prevent form from submitting, but still validate
  e.preventDefault();
  // get form data
  let coffeeFormData = new FormData(coffeeForm);
  // create coffee object from form data
  let coffee = {};
  coffee.name = coffeeFormData.get("name");
  if (!coffee.name) {
    alert("Please enter a coffee name");
    return;
  }
  coffee.roast = coffeeFormData.get("roast");
  if (!coffee.roast) {
    alert("Please select a roast");
    return;
  }
  coffee.price = coffeeFormData.get("price").replace("$", "");
  if (!coffee.price) {
    alert("Please enter a price");
    return;
  }
  coffee.description = coffeeFormData.get("description");
  coffees.push(coffee);
  updateCoffees();
  coffeeForm.reset();

  pageWrapper.classList.toggle("modal-open");
});

var currencyMask = IMask(priceInput, {
  mask: [
    { mask: "" },
    {
      mask: "$num",
      lazy: false,
      blocks: {
        num: {
          mask: Number,
          scale: 2,
          thousandsSeparator: ",",
          padFractionalZeros: true,
          radix: ".",
          mapToRadix: ["."],
        },
      },
    },
  ],
});
