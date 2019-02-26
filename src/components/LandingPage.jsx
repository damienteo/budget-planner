import React from 'react';
import { 
	Typography,
} from '@material-ui/core';
import Animation from './charts/Animation';

class LandingPage extends React.Component {

	constructor() {
	    super();
	}

	render() {

		return(
			<React.Fragment>
				<Typography>
		            This is the Landing Page!
		         </Typography>
		         <Typography>
		            Budget Planner is about visualising your financial future. ALl too often, we make goals to save, but we find it hard to keep track of how much we need to save.
		         </Typography>
		         <Typography>
		            Budget Planner will automatically calculate how much you need to save, and how much you should spend per month to meet your savings goal. It will show you clearly how you are improving in terms of contorlling your spending.
		         </Typography>
		         <Animation/>
			</React.Fragment>
		)
	}
}

export default LandingPage;