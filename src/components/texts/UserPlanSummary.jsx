import React, { Component } from 'react';

import {
	Typography,
	Grid,
}
from '@material-ui/core';

import { 
	savingsPerMonth, 
	totalMonths, 
} from '../functions';

const styles = {
	budget: {
		backgroundColor: '#004d40',
	    fontSize: 16,
	    color: 'white',
	    margin: 10,
	    padding: 5,
	    borderRadius: 5,
	},
}

class UserSummary extends Component {
	render() {	
			
		const {  
			years, 
			monthlyIncome, 
			goal, 
			monthlyBudget,
			currentRemainingBudget 
		} = this.props;	

		return(
			<React.Fragment>
				<Grid container>
					<Grid item xs={12}>
						<Typography style={{display: 'block'}}> 
							You have: 
								<strong> ${ currentRemainingBudget } </strong> 
							left to spend this month.
						</Typography>
						<Typography style={{display: 'block'}}> 
							Goal: 
								<strong> ${ goal } </strong> 
							in
								<strong> { years } </strong>
							year(s)
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography> 
							Monthly Income: 
								<strong> ${  monthlyIncome }</strong> 
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography> 
							You need to save: 
								<strong> ${ savingsPerMonth({goal}, {years})} </strong> 
							/month for
								<strong> { totalMonths({years})} </strong> 
							months.
						</Typography>
					</Grid>
					<Grid item>
						<Typography style = {styles.budget}> 
							Budget: less than
								<strong> ${ monthlyBudget } </strong> 
							/month*
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="caption"> 
							*Spending less lets you spend more later.
						</Typography>
					</Grid>
				</Grid>
			</React.Fragment>
		)
	}
}

export default UserSummary;