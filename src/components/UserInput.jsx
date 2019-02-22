import React, { Component } from 'react';

import {
	Paper,
	Typography,
	withStyles,
}
from '@material-ui/core';

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
		this.handleChartChange = this.handleChartChange.bind(this);
		this.handleUserAndChartChange = this.handleUserAndChartChange.bind(this);
	}

	handleUserChange(event) {
		const {name, value} = event.target
		this.props.onUserChange(name, value);
	}

	handleChartChange() {
		// console.log("update chart as well")
		this.props.onChartChange();
	}

	handleUserAndChartChange(event) {
		this.handleUserChange(event);
		this.handleChartChange();
	}

    render() {

        const {  years, monthlyIncome, goal, monthlyBudget } = this.props;
        // console.log(monthlyIncome)

        return (
            <Paper> 
		     	<Typography> Budgeting </Typography>
		     	<Typography> 
		      		You are planning for the next 
		      			<strong>
		      				{ years }
		      			</strong>
					year(s).
				</Typography>
				<Typography> 
					Your monthly income is 
						<strong>
							${  monthlyIncome }
						</strong> 
				</Typography>
				<Typography> 
					Your goal is to save: 
						<strong>
							${ goal }
						</strong> 
					in
						<strong>
							{ years }
						</strong>
					year(s).
				</Typography>
				<Typography> 
					You need to save: 
						<strong>
							${ savingsPerMonth({goal}, {years})}
						</strong> 
					per month for
						<strong>
							{ totalMonths({years})}
						</strong> 
					months.
				</Typography>
				<Typography> 
					You can spend only: 
						<strong>
							${ monthlyBudget }
						</strong> 
					per month.
				</Typography>
				<Typography> 
					<strong>
						Planning for the following number of years:
					</strong> 
				</Typography>
				<input
					key="years"
					type="number"
					name="years"
					value={ years }
					onChange={this.handleUserAndChartChange}
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
					onChange={this.handleUserAndChartChange}
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
					onChange={this.handleUserAndChartChange}
				/>

		    </Paper>
        )
    }
}

export default UserInput;