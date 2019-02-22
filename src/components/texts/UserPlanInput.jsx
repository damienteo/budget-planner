import React, { Component } from 'react';

import {
	TextField,
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
				<TextField
					key="years"
					type="number"
					name="years"
					value={ years }
					onChange={this.handlePlanChange}
					label="Planning for the following number of years:"
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
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
					margin="normal"
				/>
				<TextField
					key="monthlyIncome"
					type="number"
					name="monthlyIncome"
					value={ monthlyIncome }
					onChange={this.handlePlanChange}
					label="And the following monthly income:"
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>
			</React.Fragment>
		)
	}
}

export default UserPlan;