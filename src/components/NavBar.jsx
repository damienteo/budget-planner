import React from 'react';
import { 
	AppBar,
	Toolbar,
	Typography,
	Button, 
} from '@material-ui/core';
import { Registration } from './validations'

const styles = {
	heading: {
		flex: 1,
		fontFamily: "'Rancho', 'Roboto'",
		fontSize: 40,
	},
	greeting: {
		fontFamily: "'Rancho', 'Roboto'",
		fontSize: 30,
	},
	button: {
		margin: 10,
	},
}

class NavBar extends React.Component {

	constructor(props) {
		super(props);
		this.handleUserRegistration = this.handleUserRegistration.bind(this);
		this.handleUserLogout = this.handleUserLogout.bind(this);
	}

	handleUserRegistration(username, password) {
		this.props.handleUserRegistration(username, password);
	}

	handleUserLogout() {
		this.props.handleUserLogout();
	}

	render() {

		const {username, loggedIn} = this.props;
		console.log("navbar render", loggedIn);

		return(
			<React.Fragment>
		      <AppBar position="static">
		        <Toolbar>
		          <Typography 
			          variant="h6" 
			          color="inherit"
			          style={styles.heading}
		          >
		            BudgetPlanner
		          </Typography>
		          	{
					loggedIn &&
						<React.Fragment>
							<Typography
								color="inherit"
								style = {styles.greeting}
							> 
								Hello { username }!
							</Typography>
							<Button 
								color="inherit"
								variant="outlined"
								style = {styles.button}
								onClick = {this.handleUserLogout}
							>
								Logout
							</Button>
						</React.Fragment>
					}
					{
					!loggedIn &&
						<React.Fragment>
							<Button 
								color="inherit"
								variant="outlined"
								style = {styles.button}
							>
								Login
							</Button>
							<Registration 
								handleUserRegistration={ this.handleUserRegistration }
							/>
						</React.Fragment>
					}
		        </Toolbar>
		      </AppBar>
		    </React.Fragment>
		)
	}
}

export default NavBar;