import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { 
	Button, 
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Icon,
	TextField,
	Select,
	InputLabel,
	FormControl,
	MenuItem,
	withStyles,
	withMobileDialog
} from '@material-ui/core';

const styles = {
	button: {
		margin: 10,
	},
	textfield: {
		padding: 0,
		width: '100%',
		margin: 10,
	},
	dialoguecontent: {
		paddingTop: 0,
	}
}

class Registration extends React.Component {

	constructor(props) {
		super(props);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			open: false,
			userInput: {
				username: '',
				password: '',
				repeatPassword: '',
			},
		}
	}

	componentDidMount() {
        ValidatorForm.addValidationRule('isMinLength', (value) => {
            if (value.length < 6) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.userInput.password) {
                return false;
            }
            return true;
        });
    }

	handleToggle() {
		console.log("toggling");
		this.setState({
			open: !this.state.open
		})
	}

	handleChange = name => ({target: { value }}) => {
	    this.setState({ 
	    	userInput: {
	    		...this.state.userInput,
	    		[name]: value 
	    	}
	    });
	 };

	handleSubmit() {
		const {username, password} = this.state.userInput
		console.log(username, password);
		this.props.handleUserRegistration(username, password);
		this.setState({
			open: !this.state.open,
			userInput: {
	    		...this.state.userInput,
	    		username: '',
	    		password: '', 
	    	}

		})
	}
	
	render() {

		const { open, userInput: { username, password, repeatPassword } } = this.state;
		const { fullScreen } = this.props;

		return(
			<React.Fragment>

				<Button
					onClick={this.handleToggle}
					color="inherit"
					variant="outlined"
				>
					Register
				</Button>

				<Dialog
					open={open}
					onClose={this.handleToggle}
					fullScreen={fullScreen}
				>
					<ValidatorForm
						ref="form"
						onSubmit={this.handleSubmit}
						onError={errors => console.log(errors)}
					>
						<DialogContent
							style={styles.dialogcontent}
						>
							<TextValidator
								label="username"
								value={username}
								onChange={this.handleChange('username')}
								style={styles.textfield}
								maxLength="5"
								validators={[
									'required',
									'isMinLength', 
									'matchRegexp:^[a-zA-Z0-9]+$'
								]}
								errorMessages={[
									'this field is required', 
									'Must be at least 6 charecters', 
									'Please use either alphabets or numbers'
								]}
							/>
							<br />
							<TextValidator
								label="password"
								value={password}
								type="password"
								onChange={this.handleChange('password')}
								style={styles.textfield}
								validators={[
									'required',
									'isMinLength', 
									'matchRegexp:^[a-zA-Z0-9]+$'
								]}
								errorMessages={[
									'this field is required', 
									'Must be at least 6 charecters', 
									'Please use either alphabets or numbers'
								]}
							/>
							<br />
							<TextValidator
								label="Repeat password"
								value={repeatPassword}
								type="password"
								onChange={this.handleChange('repeatPassword')}
								style={styles.textfield}
								validators={[
									'required',
									'isMinLength', 
									'matchRegexp:^[a-zA-Z0-9]+$', 
									'isPasswordMatch'
								]}
								errorMessages={[
									'this field is required', 
									'Must be at least 6 charecters', 
									'Please use either alphabets or numbers', 
									'Password mismatch'
								]}
							/>
							<DialogActions>
								<Button 
									color="primary"
									variant="contained"
									type="submit"
									// onClick={this.handleSubmit}
									style={styles.button}
								>
									Confirm Registration
								</Button>
							</DialogActions>
						</DialogContent>
					</ValidatorForm>
				</Dialog>

		    </React.Fragment>
		)
	}
}

Registration.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default  withMobileDialog()(Registration);