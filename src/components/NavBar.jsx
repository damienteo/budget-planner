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
	}

	handleUserRegistration(username, password) {
		this.props.handleUserRegistration(username, password);
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
						</React.Fragment>
					}
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
		        </Toolbar>
		      </AppBar>
		    </React.Fragment>
		)
	}
}

export default NavBar;