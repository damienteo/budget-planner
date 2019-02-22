import React from 'react';
import {
  BrowserRouter, 
  Route, 
  Switch, 
  NavLink 
} from 'react-router-dom';

import './App.css';
import UserInput from './components/UserInput';
import Chart from './components/charts/Chart';

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
      goal: '',
      chartData:{
        labels:[
          'Jan', 
          'Feb', 
          'Mar', 
          'Apr', 
          'May', 
          'Jun',
          'Jul', 
          'Aug', 
          'Sep', 
          'Oct', 
          'Nov', 
          'Dec',
        ],
        datasets:[{
          label: 'Population',
          data:[
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
          ],
          backgroundColor:'green',
          borderWith: 4,
          borderColor: '#777',
          hoverBorderWidth: 3,
          hoverBorderColor: 'black',
        }],
      },
    };

  }

  componentDidMount() {
    this.getUserPlan();
    this.getChartData();
  }

  getUserPlan() {
    //ajaxcalls here
    this.setState({
      years: 1,
      monthlyIncome: 3000,
      goal: 18000
    })
  }

  getChartData() {
    //ajaxcalls here
    console.log("getting chart")
    this.setState({
      chartData:{
        labels:[
          'Jan', 
          'Feb', 
          'Mar', 
          'Apr', 
          'May', 
          'Jun',
          'Jul', 
          'Aug', 
          'Sep', 
          'Oct', 
          'Nov', 
          'Dec',
        ],
        datasets:[{
          label: 'Population',
          data:[
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
            1500,
          ],
          backgroundColor:'green',
          borderWith: 4,
          borderColor: '#777',
          hoverBorderWidth: 3,
          hoverBorderColor: 'black',
        }],
      }
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

    const { 
      years,
      monthlyIncome, 
      goal, 
      chartData 
    } = this.state;

    // console.log(this.state.chartData.datasets[0].data)

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
        <Chart chartData={chartData}/>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
