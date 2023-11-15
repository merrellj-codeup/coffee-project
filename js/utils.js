export const convertToCurrency = (number) => {
	return number.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
};

export const debounce = (func, delay) => {
	let debounceTimer;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => func.apply(context, args), delay);
	};
};
