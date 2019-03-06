import React, { Component } from 'react';
import UserPlanInput from './UserPlanInput'
import {
    Grid,
    Button
}
    from '@material-ui/core';

const styles = {
    input: {
        width: 150,
        margin: 10,
    },
};

class UserSetPlan extends Component {

    constructor(props) {
        super(props);
        this.handlePlanChange = this.handlePlanChange.bind(this);
        this.handleSetPlan = this.handleSetPlan.bind(this);
    }

    handlePlanChange(event) {
        this.props.handlePlanChange(event);
    }

    handleSetPlan() {
        this.props.handleSetPlan();
    }

    render() {

        const { years, monthlyIncome, goal, newUser } = this.props;

        return (
            <React.Fragment>
                <Grid container>
                    <UserPlanInput
                        years={years}
                        monthlyIncome={monthlyIncome}
                        goal={goal}
                        newUser={newUser}
                        handlePlanChange={this.handlePlanChange}
                        handleSetPlan={this.handleSetPlan}
                    />
                    <Button
                        onClick={this.handleSetPlan}
                        variant="outlined"
                        size="small"
                        style={styles.input}
                        color="secondary"
                    >
                        Set Plan
                    </Button>
                </Grid>
            </React.Fragment>
        )
    }
}

export default UserSetPlan;