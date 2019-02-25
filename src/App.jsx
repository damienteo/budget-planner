import React from 'react';
import { Grid, Snackbar, IconButton, Button } from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';

// import {
//   BrowserRouter, 
//   Route, 
//   Switch, 
//   NavLink 
// } from 'react-router-dom';

import {
  Paper,
  createMuiTheme,
  MuiThemeProvider
}
from '@material-ui/core';

import './App.css';
import { Alert } from './components/validations'
import ErrorBoundary from './components/ErrorBoundary'
import NavBar from './components/NavBar'
import UserInput from './components/UserInput';
import Chart from './components/charts/Chart';

// const Unknown = () => {
//   return(
//     <div> 
//       <p> Unknown Page </p>
//     </div>
//   )
// }

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#607d8b',
    },
    secondary: {
      main: '#004d40',
    },
  },
});

const styles = {
  chartPaper: {
    height: '100%',
  },
};

class App extends React.Component {

  constructor() {

    super();

    this.handlePlanChange = this.handlePlanChange.bind(this);
    this.handleExpensesChange = this.handleExpensesChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.setExpense = this.setExpense.bind(this);
    this.handleUserRegistration = this.handleUserRegistration.bind(this);
    this.handleUserLogout = this.handleUserLogout.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    // this.handleChartChange = this.handleChartChange.bind(this);

    this.state = {
      username:'',
      loggedIn: false,
      alert: false,
      alertMessage: '',
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
        datasets:[
          {
            stack: 'stack1',
            label: 'Expenses',
            data:[
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
              backgroundColor: "rgba(255,99,132,0.3)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 0,
              hoverBackgroundColor: "rgba(255,99,132,0.5)",
              hoverBorderColor: "rgba(255,99,132,1)",
          },
          {
            stack: 'stack1',
            label: 'Planned Budget',
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
              backgroundColor: "rgba(69, 186, 69, 0.2)",
              borderColor: "rgba(69, 186, 69, 1)",
              borderWidth: 0,
              hoverBackgroundColor: "rgba(69, 186, 69, 0.4)",
              hoverBorderColor: "rgba(69, 186, 69, 1)",
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.getUserPlan();
    // this.getChartData();
  }

  handleUserRegistration(username, password) {

    const here = this;

    let user_data = {
      user_name: username,
      user_password: password
    };
    let request = new Request('http://localhost:4000/api/new-user', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user_data)
    });

    //xmlhttprequest()

    fetch(request)
      .then(function(response){
        response.json()
          .then(function(data) {
            if (data.registered) {
              here.setState({
                username: user_data.user_name,
                loggedIn: true,
                alert: true,
                alertMessage: data.message
              })
            } else {
              here.setState({
                alert: true,
                alertMessage: data.message
              })
            }
          })
      })
      .catch(function(err) {
        console.log(err);
      })
  }

  handleUserLogin(username, password) {

    const here = this;

    let user_data = {
      user_name: username,
      user_password: password
    };
    let request = new Request('http://localhost:4000/api/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user_data)
    });

    //xmlhttprequest()

    fetch(request)
      .then(function(response){
        response.json()
          .then(function(data) {
            if (data.loggedIn) {
              here.setState({
                username: user_data.user_name,
                loggedIn: true,
                alert: true,
                alertMessage: data.message
              })
            } else {
              here.setState({
                alert: true,
                alertMessage: data.message
              })
            }
          })
      })
      .catch(function(err) {
        console.log(err);
      })
  }

  closeAlert(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({  alert: false });
  };

  handleUserLogout() {
    this.setState({
      username:'',
      loggedIn: false,
      alert: true,
      alertMessage: 'You have logged out'
    })
  }

    // handleUserLogin() {

  // }

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
    let roundedMonthlySavingsTarget = Math.round(monthlySavingsTarget);
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

  handleBudgetChartChange(newMonthlyBudget) {

    let newValues = [];
    for(let i = 1; i<=12; i++) {
      newValues.push(newMonthlyBudget);
    }

    let newChart = { ...this.state.chartData}
    newChart.datasets[1].data = newValues;

    return newChart;

  }

  handlePlanChange(name, value) {

    let floatValue = parseFloat(value);

    let newMonthlyBudget = this.budgetCalculator(name, floatValue);

    let newChartValues = this.handleBudgetChartChange(newMonthlyBudget);
    
    this.setState({
      [name]: floatValue,
      monthlyBudget: newMonthlyBudget,
      chartData: newChartValues,
    })

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

  calculateNewBudget(newExpenseData) {

    const { monthlyBudget } = this.state;

    let yearlyBudget = monthlyBudget * 12;
    let currentTotalExpense = newExpenseData.reduce((a,b) => a + b, 0);
    let leftoverBudget = yearlyBudget - currentTotalExpense;

    let unexpendedMonths = 0
    let countUnexpendedMonths = () => {
      for(let entry in newExpenseData) {
        if (newExpenseData[entry] === 0) 
          unexpendedMonths++;
      }
    }
    countUnexpendedMonths()
    let newAdjustedBudget = leftoverBudget/unexpendedMonths;

    return Math.round(newAdjustedBudget);
  }

  setExpense() {

    const { newExpense, newMonth, chartData } = this.state;

    let newExpenseChart = { ...chartData}

    let currentMonthBudget = 
      newExpenseChart.datasets[1].data[newMonth]+newExpenseChart.datasets[0].data[newMonth];

    let newExpenseData = newExpenseChart.datasets[0].data.map( 
      (x, index) => {
        return (index === newMonth) ?  x + parseFloat(newExpense) : x;
      }
    );

    let currentMonthLeftoverBudget = currentMonthBudget - newExpenseData[newMonth];
    let newAdjustedBudget = this.calculateNewBudget(newExpenseData);

    let newBudgetData = newExpenseChart.datasets[0].data.map( 
      (x, index) => {

        let leftoverBudget = newExpenseChart.datasets[1].data[index] - newExpenseData[index];

        if (index === newMonth) {
          return currentMonthLeftoverBudget;
        } else if (newExpenseData[index] === 0) {
          return newAdjustedBudget;
        } else if (leftoverBudget <= 0) {
          return "";
        } else {
          return leftoverBudget;
        }

      }
    );

    newExpenseChart.datasets[0].data = newExpenseData;
    newExpenseChart.datasets[1].data = newBudgetData;

    this.setState({
      chartData: newExpenseChart,
      newExpense: 0,
    })

  }

  render() {

    const { 
      years,
      monthlyIncome, 
      goal, 
      monthlyBudget,
      newExpense,
      newMonth,
      chartData,
      username,
      loggedIn,
      alert,
      alertMessage
    } = this.state;

    return (
      <React.Fragment>
        <ErrorBoundary>
          <MuiThemeProvider theme={theme}>
            <NavBar
              handleUserRegistration={ this.handleUserRegistration }
              handleUserLogout={ this.handleUserLogout }
              handleUserLogin={ this.handleUserLogin }
              username={ username }
              loggedIn={ loggedIn}
            />
            <Alert 
              alert={ alert }
              alertMessage={ alertMessage }
              closeAlert={ this.closeAlert }
            />
            <Grid container>
              <Grid item md={4} xs={12}>
                <Paper>
                  <UserInput 
                    years={ years }
                    monthlyIncome={ monthlyIncome }
                    goal={ goal }
                    monthlyBudget={ monthlyBudget }
                    newExpense={ newExpense }
                    newMonth = { newMonth }
                    onPlanChange={ this.handlePlanChange }
                    onExpenseChange={ this.handleExpensesChange }
                    onMonthChange={ this.handleMonthChange }
                    setExpense={ this.setExpense }
                  />
                </Paper> 
              </Grid>
              <Grid item md={8} xs={12}>
                <Paper style = {styles.menu}>
                  <Chart chartData={ chartData }/>
                </Paper>
              </Grid>
            </Grid>
          </MuiThemeProvider>
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

export default App;