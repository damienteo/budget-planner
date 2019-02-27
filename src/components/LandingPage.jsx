import React from 'react';
import { 
	Typography,
	Grid,
	Paper
} from '@material-ui/core';
import Animation from './charts/Animation';

class LandingPage extends React.Component {

	constructor() {
	    super();
	}

	render() {

		return(
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
									<Typography>
							            This is the Landing Page!
							        </Typography>
							        <Typography>
							            Budget Planner is about visualising your financial future. All too often, we make goals to save, but we find it hard to keep track of how much we need to save.
							        </Typography>
							        <Typography>
							            Budget Planner will automatically calculate how much you need to save, and how much you should spend per month to meet your savings goal. It will show you clearly how you are improving in terms of contorlling your spending.
							        </Typography>
							    </Grid>
							    <Grid item md={5} xs={12}>
						        	<Animation/>
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
									<Typography>
							            This is the Landing Page!
							        </Typography>
							        <Typography>
							            Budget Planner is about visualising your financial future. All too often, we make goals to save, but we find it hard to keep track of how much we need to save.
							        </Typography>
							        <Typography>
							            Budget Planner will automatically calculate how much you need to save, and how much you should spend per month to meet your savings goal. It will show you clearly how you are improving in terms of contorlling your spending.
							        </Typography>
							    </Grid>
							    <Grid item md={5} xs={12}>
						        	<Animation/>
						        </Grid>
						    </Grid>
				        </Paper> 
			        </Grid>
		        </Grid>
			</React.Fragment>
		)
	}
}

export default LandingPage;