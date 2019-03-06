import React, { Component } from 'react';
import UserPlanInput from './UserPlanInput';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    Grid,
    Paper
} from '@material-ui/core';

import {
    savingsPerMonth,
    totalMonths,
} from '../functions';

const styles = {
    budget: {
        backgroundColor: '#004d40',
        fontSize: 16,
        color: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    paper: {
        padding: 10,
    },
}

class Welcome extends Component {

    constructor(props) {
        super(props);
        this.handlePlanChange = this.handlePlanChange.bind(this);
        this.handleSetPlan = this.handleSetPlan.bind(this);
        this.state = {
            open: true,
        };
    }

    handlePlanChange(event) {
        const { name, value } = event.target
        this.props.onPlanChange(name, value);
    }

    handleSetPlan() {
        this.props.handleSetPlan();
    }

    render() {

        const {
            years,
            monthlyIncome,
            goal,
            monthlyBudget,
        } = this.props;

        return (
            <React.Fragment>
                <Dialog
                    open={this.state.open}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Welcome</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Thank you for registering.<br />
                            Before we start, we would like to know your goals. <br />
                        </DialogContentText>
                        <Grid container >
                            <UserPlanInput
                                years={years}
                                monthlyIncome={monthlyIncome}
                                goal={goal}
                                handlePlanChange={this.handlePlanChange}
                            />
                        </Grid>
                        <Grid
                            container
                            alignContent="center"
                        >
                            <Paper
                                sm={11}
                                style={styles.paper}
                            >
                                <Grid item sm={10}>
                                    <Typography>
                                        Goal:
                                            <strong> ${goal} </strong>
                                        in
                                            <strong> {years} </strong>
                                        year(s)
                                    </Typography>
                                </Grid>
                                <Grid item sm={10}>
                                    <Typography>
                                        Monthly Income:
                                            <strong> ${monthlyIncome}</strong>
                                    </Typography>
                                </Grid>
                                <Grid item sm={10}>
                                    <Typography>
                                        You need to save:
                                            <strong> ${savingsPerMonth({ goal }, { years })} </strong>
                                        /month for
                                            <strong> {totalMonths({ years })} </strong>
                                        months.
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography style={styles.budget}>
                                        Budget:
                                            <strong> ${monthlyBudget} </strong>
                                        /month
                                    </Typography>
                                </Grid>
                            </Paper>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleSetPlan}
                            variant="outlined"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
        )
    }
}

export default Welcome;