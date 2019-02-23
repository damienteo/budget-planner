import React, { Component } from 'react';

import {
	Typography,
	TextField,
	MenuItem,
	withStyles,
	Button
}
from '@material-ui/core';

import { 
	UserPlanSummary,
	UserPlanInput,
	UserExpenseInput 
} from './texts/'

// import { 
// 	roundTo2Decimals, 
// 	savingsPerMonth, 
// 	totalMonths, 
// 	budgetPerMonth,
// } from './functions';

class UserInput extends Component {

	constructor(props) {
		super(props);
		this.handlePlanChange = this.handlePlanChange.bind(this);
		this.handleExpenseChange = this.handleExpenseChange.bind(this);
		this.handleMonthChange = this.handleMonthChange.bind(this);
		this.setExpense = this.setExpense.bind(this);
	}

	handlePlanChange(event) {
		const {name, value} = event.target
		this.props.onPlanChange(name, value);
	}

	handleExpenseChange(event) {
		this.props.onExpenseChange(event);
	}

	handleMonthChange(event) {
		this.props.onMonthChange(event);
	}

	setExpense() {
		this.props.setExpense();
	}

    render() {

        const {  
        	years, 
        	monthlyIncome, 
        	goal, 
        	monthlyBudget,
        	newExpense,
        	newMonth 
        } = this.props;
        // console.log(monthlyIncome)

        return (
        	<React.Fragment>
	        	<UserPlanSummary
	        		years={ years }
	        		monthlyIncome={ monthlyIncome }
	        		goal={ goal }
	        		monthlyBudget={ monthlyBudget }
	        	/>
	        	<UserPlanInput
	        		years={ years }
	        		monthlyIncome={ monthlyIncome }
	        		goal={ goal }	
	        		handlePlanChange={this.handlePlanChange}
	        	/>
	        	<UserExpenseInput
	        		newExpense = { newExpense }
	        		newMonth = { newMonth }
	        		handleExpenseChange={ this.handleExpenseChange }
	        		handleMonthChange={ this.handleMonthChange }
	        		setExpense={ this.setExpense }
	        	/>
			</React.Fragment>
        )
    }
}

export default UserInput;