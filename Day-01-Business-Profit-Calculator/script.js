// Get references to the revenue and cost input fields.

const revenueInput = document.getElementById("revenue");
const costInput = document.getElementById("cost");

// Convert the current input values to numbers for calculation.

const revenue = Number(revenueInput.value);
const cost = Number(costInput.value);

// function to calculate profit based on revenue and cost.

function calculate(revenue, cost) {
    const profit = revenue - cost;
    return profit;
}

// Compute the profit immediately on page load with initial values.

const result = calculate(revenue, cost);

// Get the output element where profit is displayed.

const profitDisplay = document.getElementById("profit");
profitDisplay.textContent = `₹${result}`;

// Reference the button that triggers profit calculation.

const calculateButton = document.getElementById("calculate");

calculateButton.addEventListener("click", function() {
    // Read and convert input values each time the button is clicked.

    const revenue = Number(revenueInput.value);
    const cost = Number(costInput.value);

    // Perform the calculation and update the displayed profit.
    
    const result = calculate(revenue, cost);
    profitDisplay.textContent = `₹${result}`;
});
