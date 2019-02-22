import React, { Component } from 'react';

import {
	Typography,
	TextField,
	MenuItem,
	withStyles
}
from '@material-ui/core';

import { 
	UserPlanSummary,
	UserPlanInput, 
} from './texts/'

// import { 
// 	roundTo2Decimals, 
// 	savingsPerMonth, 
// 	totalMonths, 
// 	budgetPerMonth,
// } from './functions';

const styles = {
  menu: {
    width: 200,
  },
};

const months = [
  {
    value: 0,
    label: 'Jan',
  },
  {
    value: 1,
    label: 'Feb',
  },
  {
    value: 2,
    label: 'Mar',
  },
  {
    value: 3,
    label: 'Apr',
  },
    {
    value: 4,
    label: 'May',
  },
  {
    value: 5,
    label: 'Jun',
  },
  {
    value: 6,
    label: 'Jul',
  },
  {
    value: 7,
    label: 'Aug',
  },
    {
    value: 8,
    label: 'Sep',
  },
  {
    value: 9,
    label: 'Oct',
  },
  {
    value: 10,
    label: 'Nov',
  },
  {
    value: 11,
    label: 'Dec',
  },
];

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
					variant="outlined"
				/>
				<TextField
				 	key="newMonth"
					type="number"
					name="newMonth"
					select
					label="Month:"
					value={ newMonth }
					onChange={this.handleMonthChange}
					style = {styles.menu}
					SelectProps={{
						MenuProps: {
							// className: classes.menu,
						},
					}}
					// helperText="Month:"
					margin="normal"
					variant="outlined"
				>
					{months.map(option => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			</React.Fragment>
        )
    }
}

export default UserInput;