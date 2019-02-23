import React, { Component } from 'react';

import {
	withStyles,
	Typography
}
from '@material-ui/core';

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMore';

import { 
	UserPlanSummary,
	UserPlanInput,
	UserExpenseInput 
} from './texts/'

// import { 
// 	roundTo2Decimals, 
// 	savingsPerMonth, 
// 	totalMonths, 
// 	budgetPerMonth,
// } from './functions';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    margin: 'auto',
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,.03)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
}))(MuiExpansionPanelDetails);

class UserInput extends Component {

	constructor(props) {

		super(props);

		this.handlePlanChange = this.handlePlanChange.bind(this);
		this.handleExpenseChange = this.handleExpenseChange.bind(this);
		this.handleMonthChange = this.handleMonthChange.bind(this);
		this.setExpense = this.setExpense.bind(this);

		this.state = {
			expanded: '',
		};
	}

	handleChange = panel => (event, expanded) => {
		this.setState({
		 	expanded: expanded ? panel : false,
		});
	};

	handlePlanChange(event) {
		const {name, value} = event.target
		this.props.onPlanChange(name, value);
	}

	handleExpenseChange(event) {
		this.props.onExpenseChange(event);
	}

	handleMonthChange(event) {
		this.props.onMonthChange(event);
	}

	setExpense() {
		this.props.setExpense();
	}

    render() {

    	const { expanded } = this.state;

        const {  
        	years, 
        	monthlyIncome, 
        	goal, 
        	monthlyBudget,
        	newExpense,
        	newMonth 
        } = this.props;
        // console.log(monthlyIncome)

        return (
        	<React.Fragment>
	        	<ExpansionPanel
		         	square
		         	expanded={expanded === 'panel1'}
		         	onChange={this.handleChange('panel1')}
		        >
		        	<ExpansionPanelSummary expandIcon={<ExpandMoreRoundedIcon />} >
		            	<Typography>Plan Summary:</Typography>
		          	</ExpansionPanelSummary>
		         	<ExpansionPanelDetails>
			        	<UserPlanSummary
			        		years={ years }
			        		monthlyIncome={ monthlyIncome }
			        		goal={ goal }
			        		monthlyBudget={ monthlyBudget }
			        	/>
			        </ExpansionPanelDetails>
        		</ExpansionPanel>
        		<ExpansionPanel
		         	square
		         	expanded={expanded === 'panel2'}
		         	onChange={this.handleChange('panel2')}
		        >
		        	<ExpansionPanelSummary expandIcon={<ExpandMoreRoundedIcon />} >
		            	<Typography>Edit Plan:</Typography>
		          	</ExpansionPanelSummary>
		         	<ExpansionPanelDetails>
			        	<UserPlanInput
			        		years={ years }
			        		monthlyIncome={ monthlyIncome }
			        		goal={ goal }	
			        		handlePlanChange={this.handlePlanChange}
			        	/>
			        </ExpansionPanelDetails>
        		</ExpansionPanel>
        		<ExpansionPanel
		         	square
		         	expanded={expanded === 'panel3'}
		         	onChange={this.handleChange('panel3')}
		        >
		        	<ExpansionPanelSummary expandIcon={<ExpandMoreRoundedIcon />} >
		            	<Typography>Add Expense:</Typography>
		          	</ExpansionPanelSummary>
		         	<ExpansionPanelDetails>
			        	<UserExpenseInput
			        		newExpense = { newExpense }
			        		newMonth = { newMonth }
			        		handleExpenseChange={ this.handleExpenseChange }
			        		handleMonthChange={ this.handleMonthChange }
			        		setExpense={ this.setExpense }
			        	/>
			        </ExpansionPanelDetails>
        		</ExpansionPanel>
			</React.Fragment>
        )
    }
}

export default UserInput;