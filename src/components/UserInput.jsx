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

const styles = {
  expansionSummary: {
    // fontWeight: 600,
    fontSize: 16
  },
};

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
    backgroundColor: 'rgba(	0, 77, 64,.14)',
    border: '1px solid rgba(0, 77, 64,.125)',
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
		    expanded: null,
		};

	}

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

	handleChange = panel => (event, expanded) => {
	    this.setState({
	    	expanded: expanded ? panel : false,
	    });
	 };

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
		         	defaultExpanded
		        >
		        	<ExpansionPanelSummary expandIcon={<ExpandMoreRoundedIcon />} >
		            	<Typography style = {styles.expansionSummary} >Plan Summary</Typography>
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
		         	expanded={expanded === 'panel1'} 
		         	onChange={this.handleChange('panel1')}
		        >
		        	<ExpansionPanelSummary expandIcon={<ExpandMoreRoundedIcon />} >
		            	<Typography style = {styles.expansionSummary} >Edit Plan</Typography>
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
		         	expanded={expanded === 'panel2'} 
		         	onChange={this.handleChange('panel2')}
		        >
		        	<ExpansionPanelSummary expandIcon={<ExpandMoreRoundedIcon />} >
		            	<Typography style = {styles.expansionSummary} >Add Expense</Typography>
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