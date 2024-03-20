let categories = {
	"Food & Drinks": "Food & Drinks",
	Groceries: "Groceries",
	Transportation: "Transportation",
	Household: "Household",
	Shopping: "Shopping",
	Vehicules: "Vehicules",
	"Life Events": "Life Events",
	Entertainment: "Entertainment",
	"Communication & Technology": "Communication & Technology",
	"Financial Expenses": "Financial Expenses",
	Investments: "Investments",
	Income: "Income",
	Others: "Others",
};

categories = Object.fromEntries(
	Object.entries(categories).sort(([, a], [, b]) => a.localeCompare(b))
);

export default categories;
