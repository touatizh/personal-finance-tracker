import dayjs from "dayjs";

export function calculatePastBalance(
	transactionsList,
	currentBalance,
	numDays
) {
	// Get today's date
	const today = dayjs();

	// Initialize an object to store daily balances
	const dailyBalances = [
		{ date: today.format("MM/DD"), balance: currentBalance },
	];

	// Iterate over the past 30 days
	for (let i = 0; i < numDays; i++) {
		let dailyCashflow = 0;
		const date = today.subtract(i, "day").startOf("day");

		// Filter transactions for the current date and calculate cashflow
		transactionsList.forEach((t) => {
			const transactionDate = dayjs(t.date_time).startOf("day");

			if (date.isSame(transactionDate)) {
				if (t.type == "EXP") {
					dailyCashflow -= parseFloat(t.amount);
				} else {
					dailyCashflow += parseFloat(t.amount);
				}
			}
		});

		const dailyBalance = parseFloat(currentBalance) - dailyCashflow;

		dailyBalances.push({
			date: date.subtract(1, "day").format("MM/DD"),
			balance: dailyBalance.toFixed(3),
		});
		currentBalance = dailyBalance.toFixed(3);
	}

	return dailyBalances;
}
