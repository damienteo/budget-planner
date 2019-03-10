import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    withMobileDialog,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const moment = require('moment');

const styles = {
    input: {
        width: 150,
        margin: 10,
    },
}

class ExpenseList extends React.Component {

    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleDeleteExpense = this.handleDeleteExpense.bind(this);

        this.state = {
            open: false,
        }
    }

    handleToggle() {
        this.setState({
            open: !this.state.open
        })
    }

    handleDeleteExpense(event) {
        console.log(event.currentTarget.value);
    }

    render() {

        const { open } = this.state;
        const { fullScreen, savedExpenses } = this.props;

        // console.log(savedExpenses);

        let Entries = savedExpenses.map(expense => {
            let formattedMonth = moment.months(expense.month);
            return (
                <TableRow key={expense.id}>
                    <TableCell component="th" scope="row">
                        {expense.reason}
                    </TableCell>
                    <TableCell align="right">${expense.expense}</TableCell>
                    <TableCell align="right">{formattedMonth}</TableCell>
                    <TableCell align="right">
                        <IconButton
                            onClick={this.handleDeleteExpense}
                            value={expense.id}
                        >
                            <DeleteIcon
                                color="action"
                            />
                        </IconButton>
                    </TableCell>
                </TableRow >
            )
        })

        return (
            <React.Fragment>

                <Button
                    onClick={this.handleToggle}
                    variant="outlined"
                    size="small"
                    color="primary"
                    fullWidth
                    style={styles.input}
                >
                    See Past Expenses
                </Button>

                <Dialog
                    open={open}
                    onClose={this.handleToggle}
                    fullScreen={fullScreen}
                >
                    <DialogTitle id="alert-dialog-title">Past Expenses</DialogTitle>
                    <DialogContent>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Reason</TableCell>
                                    <TableCell align="right">Sum</TableCell>
                                    <TableCell align="right">Month</TableCell>
                                    <TableCell align="right"> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Entries}
                            </TableBody>
                        </Table>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleToggle} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment >
        )
    }
}

ExpenseList.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ExpenseList);