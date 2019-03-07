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
	UserExpenseInput,
	UserSetPlan
} from './texts/'

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
		backgroundColor: 'rgba(0, 77, 64,.14)',
		border: '1px solid rgba(0, 77, 64,.125)',
		marginBottom: -1,
		minHeight: 50,
		'&$expanded': {
			minHeight: 10,
			// backgroundColor: 'rgba(0, 77, 64, 0.4)',
			// border: '1px solid rgba(0, 77, 64,.3)'
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
		this.handleSetPlan = this.handleSetPlan.bind(this);
		this.handleSetExpense = this.handleSetExpense.bind(this);

		this.state = {
			expanded: null,
		};

	}

	componentDidMount() {
		this.getUserPlan();
	}

	handlePlanChange(event) {
		const { name, value } = event.target
		this.props.onPlanChange(name, value);
	}

	handleExpenseChange(event) {
		this.props.onExpenseChange(event);
	}

	handleMonthChange(event) {
		this.props.onMonthChange(event);
	}

	handleSetExpense() {
		this.props.handleSetExpense()
	}

	handleChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false,
		});
	};

	handleSetPlan() {
		this.props.handleSetPlan();
	}

	getUserPlan() {
		this.props.getUserPlan();
	}

	render() {

		const { expanded } = this.state;

		const {
			years,
			monthlyIncome,
			goal,
			monthlyBudget,
			newExpense,
			newMonth,
			currentRemainingBudget,
			excessBudget,
			newUser
		} = this.props;

		return (
			<React.Fragment>
				<ExpansionPanel
					square
					defaultExpanded
				>
					<ExpansionPanelSummary expandIcon={<ExpandMoreRoundedIcon />} >
						<Typography style={styles.expansionSummary} >Budget Progress</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<UserPlanSummary
							years={years}
							monthlyIncome={monthlyIncome}
							goal={goal}
							monthlyBudget={monthlyBudget}
							currentRemainingBudget={currentRemainingBudget}
							excessBudget={excessBudget}
						/>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel
					square
					expanded={expanded === 'panel1'}
					onChange={this.handleChange('panel1')}
				>
					<ExpansionPanelSummary expandIcon={<ExpandMoreRoundedIcon />} >
						<Typography style={styles.expansionSummary} >Edit Plan</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<UserSetPlan
							years={years}
							monthlyIncome={monthlyIncome}
							goal={goal}
							newUser={newUser}
							handlePlanChange={this.handlePlanChange}
							handleSetPlan={this.handleSetPlan}
						/>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel
					square
					expanded={expanded === 'panel2'}
					onChange={this.handleChange('panel2')}
				>
					<ExpansionPanelSummary expandIcon={<ExpandMoreRoundedIcon />} >
						<Typography style={styles.expansionSummary} >Add Expense</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<UserExpenseInput
							newExpense={newExpense}
							newMonth={newMonth}
							handleExpenseChange={this.handleExpenseChange}
							handleMonthChange={this.handleMonthChange}
							handleSetExpense={this.handleSetExpense}
						/>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</React.Fragment>
		)
	}
}

export default UserInput;