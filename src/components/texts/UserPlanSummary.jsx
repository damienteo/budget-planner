import React, { Component } from 'react';

import {
	Typography,
	Grid,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
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
	    margin: 30,
	    padding: 10,
	    borderRadius: 5,
	},
	positive: {
		color: '#006700',
	},
	negative: {
		color: '#b30000',
	},
	button: {
		margin: 10,
	}
}

class UserSummary extends Component {

	constructor(props) {
		super(props);
		this.state = {
		    open: false,
		};
	}

	handleClickOpen = () => {
	    this.setState({
	       open: true,
	    });
	 };

	 handleClose = () => {
	    this.setState({ open: false });
	 };

	render() {	
			
		const {  
			years, 
			monthlyIncome, 
			goal, 
			monthlyBudget,
			currentRemainingBudget,
			excessBudget
		} = this.props;	

		return(
			<React.Fragment>
				<Grid 
					container
				>
					{ currentRemainingBudget >= 0 &&
						<Typography 
							style={{display: 'block'}}
							gutterBottom
						>	
							<strong>
								You have: 
									<span style = {styles.positive}> ${ currentRemainingBudget } </span> 
								left to spend this month. 
							</strong>
						</Typography>
						||
						<Typography 
							style={{display: 'block'}}
							gutterBottom
						>
							<strong>
								You have overspent by: 
									<span style = {styles.negative}> ${ Math.abs(currentRemainingBudget) } </span> 
								this month.
							</strong>
						</Typography>
					}
					{  excessBudget >= 0 &&
						<Typography 
							style={{display: 'block'}}
							gutterBottom
						> 
							You are ahead of budget by: 
								<strong style = {styles.positive}> ${ excessBudget } </strong> 
							so far for the year.
						</Typography>
						||
						<Typography 
							style={{display: 'block'}}
							gutterBottom
						> 
							You are behind budget by: 
								<strong style = {styles.negative}> ${ Math.abs(excessBudget) } </strong> 
							so far for the year.
						</Typography>
					}
					<Grid 
						container
		            >	
						<Button 
							variant="outlined" 
							color="primary" 
							onClick={this.handleClickOpen}
							size="small"
							style = {styles.button}
						>
				        	See plan
				        </Button>
			        </Grid>
					<Dialog
						open={this.state.open}
						onClose={this.handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">Your current Plan</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								<Typography style={{display: 'block'}}> 
									Goal: 
										<strong> ${ goal } </strong> 
											in
										<strong> { years } </strong>
									year(s)
								</Typography>
								<Typography> 
									Monthly Income: 
										<strong> ${  monthlyIncome }</strong> 
								</Typography>
								<Typography> 
									You need to save: 
										<strong> ${ savingsPerMonth({goal}, {years})} </strong> 
											/month for
										<strong> { totalMonths({years})} </strong> 
									months.
								</Typography>
								<Typography style = {styles.budget}> 
									Budget:
										<strong> ${ monthlyBudget } </strong> 
									/month
								</Typography>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Close
							</Button>
						</DialogActions>
					</Dialog>
				</Grid>
			</React.Fragment>
		)
	}
}

export default UserSummary;