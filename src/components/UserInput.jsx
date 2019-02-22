import React, { Component } from 'react';

import {
	Paper,
	Typography,
	withStyles,
}
from '@material-ui/core';

import UserSummary from './texts/UserSummary'

import { 
	roundTo2Decimals, 
	savingsPerMonth, 
	totalMonths, 
	budgetPerMonth,
} from './functions';

class UserInput extends Component {

	constructor(props) {
		super(props);
		this.handlePlanChange = this.handlePlanChange.bind(this);
		this.handleExpenseChange = this.handleExpenseChange.bind(this);
		this.handleMonthChange = this.handleMonthChange.bind(this);
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
            <Paper> 
            	<UserSummary
            		years={ years }
            		monthlyIncome={ monthlyIncome }
            		goal={ goal }
            		monthlyBudget={ monthlyBudget }
            	/>
				<input
					key="years"
					type="number"
					name="years"
					value={ years }
					onChange={this.handlePlanChange}
				/>
				<Typography> 
					<strong>
						With the following Goal:
					</strong> 
				</Typography>
				<input
					key="goal"
					type="number"
					name="goal"
					value={ goal }
					onChange={this.handlePlanChange}
				/>
				<Typography> 
					<strong>
						And the following monthly income:
					</strong> 
				</Typography>
				<input
					key="monthlyIncome"
					type="number"
					name="monthlyIncome"
					value={ monthlyIncome }
					onChange={this.handlePlanChange}
				/>
				<Typography> 
					<strong>
						Expense:
					</strong> 
				</Typography>
				<input
					key="newExpense"
					type="number"
					name="newExpense"
					value={ newExpense}
					onChange={this.handleExpenseChange}
				/>
				<Typography> 
					<strong>
						Month:
					</strong> 
				</Typography>
				<input
					key="newMonth"
					type="number"
					name="newMonth"
					value={ newMonth}
					onChange={this.handleMonthChange}
				/>
		    </Paper>
        )
    }
}

export default UserInput;