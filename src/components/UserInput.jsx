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
		this.handleUserChange = this.handleUserChange.bind(this);
	}

	handleUserChange(event) {
		const {name, value} = event.target
		this.props.onUserChange(name, value);
	}

    render() {

        const {  years, monthlyIncome, goal, monthlyBudget } = this.props;
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
					onChange={this.handleUserChange}
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
					onChange={this.handleUserChange}
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
					onChange={this.handleUserChange}
				/>

		    </Paper>
        )
    }
}

export default UserInput;