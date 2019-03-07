import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	withMobileDialog
} from '@material-ui/core';
import InputForm from './InputForm';

const styles = {
	button: {
		margin: 5,
	},
	textfield: {
		padding: 0,
		margin: 10,
	},
	dialoguecontent: {
		paddingTop: 0,
		justifyContent: 'center'
	},
}

class UserForm extends React.Component {

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

	handleToggle() {
		this.setState({
			open: !this.state.open
		})
	}

	handleChange = name => ({ target: { value } }) => {
		this.setState({
			userInput: {
				...this.state.userInput,
				[name]: value
			}
		});
	};

	handleSubmit() {
		const { username, password } = this.state.userInput
		this.props.handleUser(username, password);
		this.setState({
			open: !this.state.open,
			userInput: {
				...this.state.userInput,
				username: '',
				password: '',
				repeatPassword: '',
			}

		})
	}

	render() {

		const { open, userInput: { username, password, repeatPassword } } = this.state;
		const { fullScreen, message, button, register } = this.props;
		return (
			<React.Fragment>

				<Button
					onClick={this.handleToggle}
					color="inherit"
					variant="outlined"
					style={styles.button}
				>
					{button}
				</Button>

				<InputForm
					open={open}
					userInput={userInput}
					handleToggle={this.handleToggle}
					fullScreen={fullScreen}
					message={message}
					button={button}
					register={register}
				/>

			</React.Fragment >
		)
	}
}

UserForm.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(UserForm);