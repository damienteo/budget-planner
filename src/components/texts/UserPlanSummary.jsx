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
} from '../functions';

class UserSummary extends Component {
	render() {	
			
		const {  years, monthlyIncome, goal, monthlyBudget } = this.props;	

		return(
			<React.Fragment>
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
				</React.Fragment>
		)
	}
}

export default UserSummary;