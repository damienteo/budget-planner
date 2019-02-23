import React, { Component } from 'react';

import {
	TextField,
	Grid,
	InputAdornment,
}
from '@material-ui/core';

class UserPlan extends Component {

	constructor(props) {
		super(props);
		this.handlePlanChange = this.handlePlanChange.bind(this);
	}

	handlePlanChange(event) {
		this.props.handlePlanChange(event);
	}

	render() {	
			
		const {  years, monthlyIncome, goal} = this.props;	

		return(
			<React.Fragment>
				<Grid container>
					<TextField
						key="years"
						type="number"
						name="years"
						value={ years }
						onChange={this.handlePlanChange}
						label="Planning timeframe:"
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
						margin="normal"
						InputProps={{
				            endAdornment: <InputAdornment position="end">Years</InputAdornment>,
				        }}
					/>
					<TextField
						key="goal"
						type="number"
						name="goal"
						value={ goal }
						onChange={this.handlePlanChange}
						label="With the following Goal:"
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
						margin="normal"
						InputProps={{
				            startAdornment: <InputAdornment position="start">$</InputAdornment>,
				        }}
					/>
					<TextField
						key="monthlyIncome"
						type="number"
						name="monthlyIncome"
						value={ monthlyIncome }
						onChange={this.handlePlanChange}
						label="And monthly income:"
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
						margin="normal"
						InputProps={{
				            startAdornment: <InputAdornment position="start">$</InputAdornment>,
				        }}
					/>
				</Grid>
			</React.Fragment>
		)
	}
}

export default UserPlan;