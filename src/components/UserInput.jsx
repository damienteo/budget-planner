import React, { Component } from 'react';

class UserInput extends Component {

	constructor(props) {

		super(props);

		this.handleUserChange = this.handleUserChange.bind(this);

	}

	handleUserChange(event) {
		const {name, value} = event.target
		this.props.onUserChange(name, value);
	}

    render() {

        const {  years, monthlyIncome, goal } = this.props;

        return (
            <React.Fragment> 
		     	<p> Budgeting </p>
		     	<p> 
		      		You are planning for the next 
		      			<strong>
		      				{ years }
		      			</strong>
					year(s).
				</p>
				<p> 
					Your monthly income is 
						<strong>
							${  monthlyIncome }
						</strong> 
				</p>
				<p> 
					Your goal is to save: 
						<strong>
							${ goal }
						</strong> 
					in
						<strong>
							{ years }
						</strong>
					year(s).
				</p>
				<input
					key="years"
					type="number"
					name="years"
					value={ years }
					onChange={this.handleUserChange}
				/>
				<input
					key="goal"
					type="number"
					name="goal"
					value={ goal }
					onChange={this.handleUserChange}
				/>
				<input
					key="monthlyIncome"
					type="number"
					name="monthlyIncome"
					value={ monthlyIncome }
					onChange={this.handleUserChange}
				/>

		    </React.Fragment>
        )
    }
}

export default UserInput;