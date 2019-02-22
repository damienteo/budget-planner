import React from 'react';
import { Grid } from '@material-ui/core/';

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

    this.handlePlanChange = this.handlePlanChange.bind(this);
    this.handleExpensesChange = this.handleExpensesChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    // this.handleChartChange = this.handleChartChange.bind(this);

    this.state = {
      years: 0,
      monthlyIncome: 0,
      goal: 0,
      monthlyBudget: 0,
      newExpense: 0,
      newMonth: 0,
      expenses: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
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
    // this.getChartData();
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

  budgetPerMonth(income, goal, years) {
    let monthlySavingsTarget = goal/(years*12);
    let roundedMonthlySavingsTarget = Math.round((monthlySavingsTarget + 0.00001) * 100) / 100;
    return income - roundedMonthlySavingsTarget;  
  }

  budgetCalculator(name, value) {

    const { monthlyIncome, goal, years } = this.state;

    if (name === "years") {
      // console.log("years", monthlyIncome, goal, floatValue)
      return this.budgetPerMonth(monthlyIncome, goal, value)
    } else if (name === "monthlyIncome") {
      return this.budgetPerMonth(value, goal, years)
    } else if (name === "goal") {
      return this.budgetPerMonth(monthlyIncome, value, years)
    }

  }

  handleChartChange(newMonthlyBudget) {

    let newValues = [];
    for(let i = 1; i<=12; i++) {
      newValues.push(newMonthlyBudget);
    }

    let newChart = { ...this.state.chartData}
    newChart.datasets[0].data = newValues;

    return newChart;

  }

  handleExpensesChange(event) {
    this.setState({
      newExpense: event.target.value,
    })
  }

  handleMonthChange(event) {
    this.setState({
      newMonth: event.target.value,
    })
  }

  handlePlanChange(name, value) {

    let floatValue = parseFloat(value);

    let newMonthlyBudget = this.budgetCalculator(name, floatValue);

    let newChartValues = this.handleChartChange(newMonthlyBudget);
    
    this.setState({
      [name]: floatValue,
      monthlyBudget: newMonthlyBudget,
      chartData: newChartValues,
    })

  }

  render() {

    const { 
      years,
      monthlyIncome, 
      goal, 
      monthlyBudget,
      newExpense,
      chartData 
    } = this.state;

    return (
      <React.Fragment>
        <ErrorBoundary>
          <Grid container>
            <Grid item sm = {4}>
              <UserInput 
                years={ years }
                monthlyIncome={ monthlyIncome }
                goal={ goal }
                monthlyBudget={ monthlyBudget }
                newExpense={ newExpense }
                onPlanChange={ this.handlePlanChange }
                onExpenseChange={ this.handleExpensesChange }
                onMonthChange={ this.handleMonthChange }
              /> 
            </Grid>
            <Grid item sm = {8}>
              <Chart chartData={ chartData }/>
            </Grid>
          </Grid>
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

export default App;