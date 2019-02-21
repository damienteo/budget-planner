import React, { Component } from 'react';

class UserInput extends Component {

	constructor(props) {

		super(props);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			years: 1,
		    monthlyIncome: 3000,
		    goal: 18000
		};

	}

	handleChange(event) {

		console.log("whoops");

		const {name, value} = event.target
		console.log("name", name);
		console.log("value", value);

		this.setState({
			[name]: value,
		})

	}

    render() {

        const {  
        	years, 
        	monthlyIncome, 
        	goal,
        } = this.state;

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
					type="number"
					name="years"
					value={ years }
					onChange={this.handleChange}
				/>

		    </React.Fragment>
        )
    }
}

export default UserInput;