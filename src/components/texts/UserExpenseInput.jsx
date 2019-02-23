import React, { Component } from 'react';

import {
	TextField,
	MenuItem,
	withStyles,
	Button,
	Grid,
	InputAdornment
}
from '@material-ui/core';

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

class UserExpenseInput extends Component {

	constructor(props) {
		super(props);
		this.setExpense = this.setExpense.bind(this);
		this.handleExpenseChange = this.handleExpenseChange.bind(this);
		this.handleMonthChange = this.handleMonthChange.bind(this);
	}

	handleExpenseChange(event) {
		this.props.handleExpenseChange(event);
	}

	handleMonthChange(event) {
		this.props.handleMonthChange(event);
	}

	setExpense() {
		this.props.setExpense();
	}

	render() {

		const {  
        	newExpense,
        	newMonth 
        } = this.props;

		return(
			<React.Fragment>
				<Grid container>
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
						InputProps={{
				            startAdornment: <InputAdornment position="start">$</InputAdornment>,
				        }}
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
							<MenuItem 
								key={option.value} 
								value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<Button 
						variant="outlined" 
						size="medium" 
						color="primary"
						onClick={ this.setExpense }
					>
			        	Confirm Expense
			        </Button>
			    </Grid>
	        </React.Fragment>
		)
    }
}

export default UserExpenseInput;