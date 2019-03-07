import React, { Component } from 'react';

import {
	TextField,
	InputAdornment,
}
	from '@material-ui/core';

const styles = {
	input: {
		width: 150,
		margin: 10,
	},
};

class UserPlan extends Component {

	constructor(props) {
		super(props);
		this.handlePlanChange = this.handlePlanChange.bind(this);
		this.handleSetPlan = this.handleSetPlan.bind(this);
	}

	handlePlanChange(event) {
		this.props.handlePlanChange(event);
	}

	handleSetPlan() {
		this.props.handleSetPlan();
	}

	render() {

		const { years, monthlyIncome, goal } = this.props;

		return (
			<React.Fragment>
				<TextField
					key="years"
					type="number"
					name="years"
					value={years}
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
					style={styles.input}
				/>
				<TextField
					key="goal"
					type="number"
					name="goal"
					value={goal}
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
					style={styles.input}
				/>
				<TextField
					key="monthlyIncome"
					type="number"
					name="monthlyIncome"
					value={monthlyIncome}
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
					style={styles.input}
				/>
			</React.Fragment>
		)
	}
}

export default UserPlan;