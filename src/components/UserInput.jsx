import React, { Component } from 'react';
import {
	Paper,
	Typography,
	withStyles,
}
from '@material-ui/core';

class UserInput extends Component {

	constructor(props) {
		super(props);
		this.handleUserChange = this.handleUserChange.bind(this);
	}

	handleUserChange(event) {
		const {name, value} = event.target
		this.props.onUserChange(name, value);
	}

	roundTo2Decimals(number){
		return Math.round((number + 0.00001) * 100) / 100;
	}

	savingsPerMonth(goal, years) {
		let savingsTarget = goal.goal/(years.years*12);
		savingsTarget = this.roundTo2Decimals(savingsTarget);
		return savingsTarget;
	}

	totalMonths(years) {
		return years.years*12;
	}

	budgetPerMonth(income, goal, years) {
		let savingsTarget = this.savingsPerMonth(goal, years);
		savingsTarget = this.roundTo2Decimals(savingsTarget);
		return income.monthlyIncome - savingsTarget;	
	}

    render() {

        const {  years, monthlyIncome, goal } = this.props;

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
							${ this.savingsPerMonth({goal}, {years})}
						</strong> 
					per month for
						<strong>
							{ this.totalMonths({years})}
						</strong> 
					months.
				</Typography>
				<Typography> 
					You can spend only: 
						<strong>
							${ this.budgetPerMonth({monthlyIncome}, {goal}, {years})}
						</strong> 
					per month.
				</Typography>
				<input
					key="years"
					type="number"
					name="years"
					value={ years }
					onChange={this.handleUserChange}
				/>
				<input
					key="goal"
					type="number"
					name="goal"
					value={ goal }
					onChange={this.handleUserChange}
				/>
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