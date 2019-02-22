export const roundTo2Decimals = (number) => {
	return Math.round((number + 0.00001) * 100) / 100;
}

export const savingsPerMonth = (goal, years) => {
	let savingsTarget = goal.goal/(years.years*12);
	savingsTarget = roundTo2Decimals(savingsTarget);
	return savingsTarget;
}

export const totalMonths = (years) => {
	return years.years*12;
}

export const budgetPerMonth = (income, goal, years) =>{
	let savingsTarget = savingsPerMonth(goal, years);
	savingsTarget = roundTo2Decimals(savingsTarget);
	return income.monthlyIncome - savingsTarget;	
}
