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
			
		const {  years, monthlyIncome, goal, monthlyBudget } = this.props;	

		return(
			<React.Fragment>
				<Grid container>
					<Typography> 
						Your goal is to save: 
							<strong> ${ goal } </strong> 
						in
							<strong> { years } </strong>
						year(s).
					</Typography>
					<Typography> 
						Your monthly income is 
							<strong> ${  monthlyIncome }</strong> 
						.
					</Typography>
					<Typography> 
						You need to save: 
							<strong> ${ savingsPerMonth({goal}, {years})} </strong> 
						per month for
							<strong> { totalMonths({years})} </strong> 
						months.
					</Typography>
					<Typography style = {styles.budget}> 
						You can spend only
							<strong> ${ monthlyBudget } </strong> 
						per month.
					</Typography>
				</Grid>
			</React.Fragment>
		)
	}
}

export default UserSummary;