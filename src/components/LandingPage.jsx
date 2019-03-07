import React from 'react';
import {
	Typography,
	Grid,
	Paper
} from '@material-ui/core';
import Animation from './charts/Animation';
import ChartDemo from './charts/ChartDemo';
import { UserForm } from './validations'

const styles = {
	text: {
		fontSize: 20,
		fontWeight: 400,
	},
	budget: {
		backgroundColor: '#004d40',
		fontSize: 15,
		color: 'white',
		margin: 30,
		padding: 10,
		borderRadius: 5,
		width: 170,
	},
	paper: {
		width: 330,
		height: 200,
		padding: 25,
	}
}

class LandingPage extends React.Component {

	constructor() {
		super();
		this.handleUserRegistration = this.handleUserRegistration.bind(this);
	}

	handleUserRegistration(username, password) {
		this.props.handleUserRegistration(username, password);
	}

	render() {

		return (
			<React.Fragment>
				<Grid
					container
					justify="center"
					alignItems="center"
					style={{ marginTop: `110px` }}
				>
					<Grid
						item
						md={10}
						xs={11}
					>
						<Paper>
							<Grid
								container
								spacing={40}
								justify="center"
								alignItems="center"
							>
								<Grid item md={5} xs={12}>
									<Typography
										gutterBottom
										style={styles.text}
									>
										Budget Planner is about <strong>visualising your financial future</strong>.
							        </Typography>
									<Typography
										gutterBottom
										style={styles.text}
									>
										While we make goals to save, we find it hard to keep track of how much we need to save.
							        </Typography>
								</Grid>
								<Grid item md={5} xs={12}>
									<Animation />
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
				<Grid
					container
					justify="center"
					alignItems="center"
					style={{ marginTop: `70px` }}
				>
					<Grid
						item
						md={10}
						xs={11}
					>
						<Paper>
							<Grid
								container
								spacing={40}
								justify="center"
								alignItems="center"
							>
								<Grid item md={5} xs={12}>
									<Typography
										gutterBottom
										style={styles.text}
									>
										Budget Planner will automatically calculate how much you need to save, and how much you should spend per month to meet your savings goal.
							        </Typography>
								</Grid>
								<Grid item md={5} xs={11} >
									<div style={styles.paper}>
										<Typography gutterBottom>
											Goal:
												<strong> $500000 </strong>
											in
												<strong> 20 </strong>
											year(s)
										</Typography>
										<Typography gutterBottom>
											Monthly Income:
												<strong> $6000 </strong>
										</Typography>
										<Typography gutterBottom>
											You need to save:
												<strong> $2083.33 </strong>
											/month for
												<strong> 240 </strong>
											months.
										</Typography>
										<Typography style={styles.budget}>
											Budget:
												<strong> $3917 </strong>
											/month
										</Typography>
									</div>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
				<Grid
					container
					justify="center"
					alignItems="center"
					style={{ marginTop: `70px` }}
				>
					<Grid
						item
						md={10}
						xs={11}
					>
						<Paper>
							<Grid
								container
								spacing={40}
								justify="center"
								alignItems="center"
							>
								<Grid item md={5} xs={12}>
									<Typography
										gutterBottom
										style={styles.text}
									>
										It will also show your progress in terms of controlling your spending.
							        </Typography>
								</Grid>
								<Grid item md={5} xs={12}>
									<ChartDemo />
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid
						container
						spacing={40}
						justify="center"
						alignItems="center"
						style={{ margin: `70px` }}
					>
						<UserForm
							handleUser={this.handleUserRegistration}
							message='Confirm Registration'
							button='Register'
							register={true}
						/>
					</Grid>
				</Grid>
			</React.Fragment>
		)
	}
}

export default LandingPage;

