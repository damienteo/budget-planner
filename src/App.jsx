import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'

import './App.css';
import UserInput from './components/UserInput'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any child components and re-renders with an error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.error) {
      // Fallback UI if an error occurs
      return (
        <div>
          <h2>{"Oh-no! Something went wrong"}</h2>
          <p className="red">
            {this.state.error && this.state.error.toString()}
          </p>
          <div>{"Component Stack Error Details: "}</div>
          <p className="red">{this.state.errorInfo.componentStack}</p>
        </div>
      );
    }
    // component normally just renders children
    return this.props.children;
  }
}

const Unknown = () => {
  return(
    <div> 
      <p> Unknown Page </p>
    </div>
  )
}

class App extends React.Component {

  constructor() {

    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      years: '',
      monthlyIncome: '',
      goal: ''
    };

  }

  componentDidMount() {
    this.getUserPlan();
  }

  getUserPlan() {
    //ajaxcalls here
    this.setState({
      years: 1,
      monthlyIncome: 3000,
      goal: 18000
    })
  }

  handleChange(name, value) {

    // const {name, value} = event.target
    console.log("name", name);
    console.log("value", value);
    
    this.setState({
      [name]: value,
    })

  }

  render() {

    const { years, monthlyIncome, goal } = this.state;

    return (
      <div>
      <ErrorBoundary>
        <BrowserRouter>
          <React.Fragment>
          <Switch>
            <Route 
              path="/" 
              render={ () => 
                <UserInput 
                  years={ years }
                  monthlyIncome={ monthlyIncome }
                  goal={ goal }
                  onUserChange={this.handleChange}
                /> 
              } 
              exact
            />
            <Route component={Unknown} />
          </Switch>
          </React.Fragment>
        </BrowserRouter>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
