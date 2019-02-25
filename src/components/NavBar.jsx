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
	button: {
		margin: 10,
	},
}

class NavBar extends React.Component {

	constructor(props) {
		super(props);
		this.handleUserRegistration = this.handleUserRegistration.bind(this);
	}

	handleUserRegistration(event) {
		this.props.handleUserRegistration(event);
	}

	render() {
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