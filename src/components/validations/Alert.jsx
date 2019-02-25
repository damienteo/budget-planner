import React from 'react';
import { Grid, Snackbar, IconButton, Button } from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';

class Alert extends React.Component {

  constructor(props) {
    super(props);
    this.closeAlert = this.closeAlert.bind(this);
  }

  closeAlert() {
    this.props.closeAlert();
  }

  render() {

    const { alert, alertMessage } = this.props;

    return(
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={ alert }
        autoHideDuration={3000}
        onClose={this.closeAlert}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{ alertMessage }</span>}
        action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={this.closeAlert}
        >
          <CloseIcon />
        </IconButton>,
        ]}
      />
    )
  }
}

export default Alert;