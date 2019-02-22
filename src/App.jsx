import React from 'react';

import {
  BrowserRouter, 
  Route, 
  Switch, 
  NavLink 
} from 'react-router-dom';

import './App.css';
import ErrorBoundary from './components/ErrorBoundary'
import UserInput from './components/UserInput';
import Chart from './components/charts/Chart';

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
    this.handleChartChange = this.handleChartChange.bind(this);

    this.state = {
      years: '',
      monthlyIncome: '',
      goal: '',
      monthlyBudget: '',
      expenses: [],
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
      goal: 18000,
      monthlyBudget: 1500,
    })
  }

  getChartData() {
    //ajaxcalls here
    // console.log("getting chart")
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

  budgetPerMonth(income, goal, years) {
    let monthlySavingsTarget = goal/(years*12);
    let roundedMonthlySavingsTarget = Math.round((monthlySavingsTarget + 0.00001) * 100) / 100;
    return income - roundedMonthlySavingsTarget;  
  }

  handleChange(name, value) {

    const { monthlyIncome, goal, years } = this.state;

    let newMonthlyBudget; 
    let floatValue = parseFloat(value);

    if (name === "years") {
      // console.log("years", monthlyIncome, goal, floatValue)
      newMonthlyBudget = this.budgetPerMonth(monthlyIncome, goal, floatValue)
    } else if (name === "monthlyIncome") {
      newMonthlyBudget = this.budgetPerMonth(floatValue, goal, years)
    } else if (name === "goal") {
      newMonthlyBudget = this.budgetPerMonth(monthlyIncome, floatValue, years)
    }
    
    this.setState({
      [name]: floatValue,
      monthlyBudget: newMonthlyBudget,
    })

  }

  handleChartChange() {

    let newValues = [];
    for(let i = 1; i<=12; i++) {
      newValues.push(this.state.monthlyBudget);
    }

    let newChart = { ...this.state.chartData}
    newChart.datasets[0].data = newValues;

    this.setState({
      chartData: newChart,
    })

  }


  render() {

    const { 
      years,
      monthlyIncome, 
      goal, 
      monthlyBudget,
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
                  monthlyBudget={ monthlyBudget }
                  onUserChange={ this.handleChange } 
                  onChartChange={ this.handleChartChange }
                /> 
              } 
              exact
            />
            <Route component={ Unknown } />
          </Switch>
          </React.Fragment>
        </BrowserRouter>
        <Chart chartData={ chartData }/>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
