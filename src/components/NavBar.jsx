import React from 'react';
import { 
	AppBar,
	Toolbar,
	Typography,
	Button, 
} from '@material-ui/core';

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
		          <Button 
		          	color="inherit"
		          	variant="outlined"
		          >
		          	Register
		          </Button>
		        </Toolbar>
		      </AppBar>
		    </React.Fragment>
		)
	}
}

export default NavBar;