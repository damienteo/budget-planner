import React, { Component } from 'react';

import {
	Paper,
	Typography,
	withStyles,
	TextField,
}
from '@material-ui/core';

import { 
	UserPlanSummary,
	UserPlanInput, 
} from './texts/'

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
            		monthlyBudget={ monthlyBudget }
            		handlePlanChange={this.handlePlanChange}
            	/>
				<TextField
					key="newExpense"
					type="number"
					name="newExpense"
					value={ newExpense}
					onChange={this.handleExpenseChange}
					label="Input new Expense:"
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
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