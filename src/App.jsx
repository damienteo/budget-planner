import React from 'react';
import Cookies from 'universal-cookie';

import {
  Paper,
  createMuiTheme,
  MuiThemeProvider,
  Grid,
}
  from '@material-ui/core';

import './App.css';
import { Alert } from './components/validations'
import ErrorBoundary from './components/ErrorBoundary'
import NavBar from './components/NavBar'
import UserInput from './components/UserInput';
import Chart from './components/charts/Chart';
import LandingPage from './components/LandingPage';
import { Welcome } from './components/texts/'

//================================================================================
// Constants
//================================================================================

const cookies = new Cookies();
const moment = require('moment');

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

const localHost = 'http://localhost:4000'
const herokuSite = 'https://my-budget-planner-api.herokuapp.com'

let site = localHost;

//================================================================================
// Start of Class
//================================================================================

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
    this.handleSetPlan = this.handleSetPlan.bind(this);
    this.getUserPlan = this.getUserPlan.bind(this);
    this.handlePlanInitialisation = this.handlePlanInitialisation.bind(this);
    this.handleSetExpense = this.handleSetExpense.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);

    //================================================================================
    // State
    //================================================================================

    this.state = {
      newUser: true,
      username: '',
      userId: 0,
      loggedIn: false,
      currentMonth: 0,
      alert: false,
      alertMessage: '',
      years: 0,
      monthlyIncome: 0,
      goal: 0,
      monthlyBudget: 0,
      currentRemainingBudget: 0,
      excessBudget: 0,
      newExpense: 0,
      expenseReason: '',
      newMonth: 0,
      savedExpenses: [],
      chartData: {
        labels: [
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
        datasets: [
          {
            stack: 'stack1',
            label: 'Expenses',
            data: new Array(12).fill(0),
            backgroundColor: "rgba(255,99,132,0.3)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 0,
            hoverBackgroundColor: "rgba(255,99,132,0.5)",
            hoverBorderColor: "rgba(255,99,132,1)",
          },
          {
            stack: 'stack1',
            label: 'Future Budget',
            data: new Array(12).fill(0),
            backgroundColor: "rgba(69, 186, 69, 0.2)",
            borderColor: "rgba(69, 186, 69, 1)",
            borderWidth: 0,
            hoverBackgroundColor: "rgba(69, 186, 69, 0.4)",
            hoverBorderColor: "rgba(69, 186, 69, 1)",
          },
          {
            stack: 'stack1',
            label: 'Current Budget',
            data: new Array(12).fill(''),
            backgroundColor: "rgba( 255, 255, 16, 0.2)",
            borderColor: "rgba(255, 255, 16, 1)",
            borderWidth: 0,
            hoverBackgroundColor: "rgba(255, 255, 16, 0.4)",
            hoverBorderColor: "rgba(255, 255, 16, 1)",
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.pingAPI();
    this.getCurrentMonth();
  }

  //================================================================================
  // Miscellaneous Functions
  //================================================================================

  //This app uses Material UI popup alerts for many items.
  //component is found in src/components/validations/alerts
  //The following function is responsible to setting state to close the alert
  closeAlert(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ alert: false });
  };

  getCurrentMonth() {
    this.setState({
      currentMonth: moment().month(),
    })
  }

  //================================================================================
  // Calculation Functions
  //================================================================================

  budgetPerMonth(income, goal, years) {
    let monthlySavingsTarget = goal / (years * 12);
    let roundedMonthlySavingsTarget = Math.round(monthlySavingsTarget);
    return income - roundedMonthlySavingsTarget;
  }

  //returns budget based on changes in input
  //function returns value accordingly if user changes either the monthly income, goal, or years
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

  //calculates whether the user is ahead or behind budget
  //This is by taking in unspent or overspent budget from the beginning of the year till current month
  calculateExcessBudget(newChartValues) {
    const { currentMonth } = this.state;

    let newExcess = 0;
    let currentRemainingBudget = newChartValues.datasets[2].data;

    for (let i = 0; i <= currentMonth; i++) {
      newExcess = newExcess + currentRemainingBudget[i];
    }

    return newExcess;
  }

  //Distributes remaining planned budget among the remaining months
  calculateNewBudget(newExpenseData) {

    const { monthlyBudget } = this.state;

    let yearlyBudget = monthlyBudget * 12;
    let currentTotalExpense = newExpenseData.reduce((a, b) => a + b, 0);
    let leftoverBudget = yearlyBudget - currentTotalExpense;

    let unexpendedMonths = 0
    let countUnexpendedMonths = () => {
      for (let entry in newExpenseData) {
        if (newExpenseData[entry] === 0)
          unexpendedMonths++;
      }
    }
    countUnexpendedMonths()
    let newAdjustedBudget = leftoverBudget / unexpendedMonths;

    return Math.round(newAdjustedBudget);
  }

  currentPlannedBudget(newExpenseChart, newMonth) {
    if (typeof newExpenseChart.datasets[1].data[newMonth] !== 'number') {
      return 0;
    } else {
      return newExpenseChart.datasets[1].data[newMonth];
    }
  }

  currentRemainingBudget(newExpenseChart, newMonth) {
    if (typeof newExpenseChart.datasets[2].data[newMonth] !== 'number') {
      return 0;
    } else {
      return newExpenseChart.datasets[2].data[newMonth];
    }
  }

  updateFutureBudget(currentMonth, newMonthlyBudget, currentExpenses) {
    let newFutureBudgetValues = [];
    for (let i = 0; i <= 11; i++) {
      if (i <= currentMonth) {
        newFutureBudgetValues.push("");
      } else if (currentExpenses[i] > 0) {
        let adjustedFutureBudget = newMonthlyBudget - currentExpenses[i];
        newFutureBudgetValues.push(adjustedFutureBudget);
      } else {
        newFutureBudgetValues.push(newMonthlyBudget);
      }
    }
    return newFutureBudgetValues;
  }

  updateCurrentBudget(currentMonth, newMonthlyBudget, currentExpenses) {
    let newCurrentBudgetValues = [];
    for (let i = 0; i <= 11; i++) {
      if (i <= currentMonth) {
        let adjustedCurrentBudget = newMonthlyBudget - currentExpenses[i];
        newCurrentBudgetValues.push(adjustedCurrentBudget);
      } else {
        newCurrentBudgetValues.push("");
      }
    }
    return newCurrentBudgetValues;
  }


  //================================================================================
  // Handlers
  //================================================================================

  handleUserLogout() {
    cookies.remove('userId');
    cookies.remove('userSession');
    this.setState({
      username: '',
      userId: 0,
      loggedIn: false,
      newUser: true,
      alert: true,
      alertMessage: 'You have logged out'
    })
  }

  handleBudgetChartChange(newMonthlyBudget) {

    const { currentMonth, chartData } = this.state;

    let currentExpenses = { ...chartData.datasets[0].data };

    let newFutureBudgetValues = this.updateFutureBudget(currentMonth, newMonthlyBudget, currentExpenses)

    let newCurrentBudgetValues = this.updateCurrentBudget(currentMonth, newMonthlyBudget, currentExpenses)

    let newChart = { ...chartData }
    newChart.datasets[1].data = newFutureBudgetValues;
    newChart.datasets[2].data = newCurrentBudgetValues;

    return newChart;

  }

  handleChartInitialisation(newMonthlyBudget, savedExpenses) {

    const { currentMonth, chartData } = this.state;

    let currentExpenses = { ...chartData.datasets[0].data };
    if (savedExpenses != undefined) {
      console.log("undefined")
      currentExpenses = new Array(12).fill(0);
      for (let i = 0; i < savedExpenses.length; i++) {
        let currentValue = currentExpenses[savedExpenses[i].month]
        let newValue = currentValue + savedExpenses[i].expense;
        currentExpenses[savedExpenses[i].month] = newValue;
      }
    }

    let newFutureBudgetValues = this.updateFutureBudget(currentMonth, newMonthlyBudget, currentExpenses)

    let newCurrentBudgetValues = this.updateCurrentBudget(currentMonth, newMonthlyBudget, currentExpenses)

    let newChart = { ...chartData }
    newChart.datasets[0].data = currentExpenses;
    newChart.datasets[1].data = newFutureBudgetValues;
    newChart.datasets[2].data = newCurrentBudgetValues;

    return newChart;

  }

  handlePlanChange(name, value) {

    let floatValue = parseFloat(value);

    let newMonthlyBudget = this.budgetCalculator(name, floatValue);

    let newChartValues = this.handleBudgetChartChange(newMonthlyBudget);

    let newExcessBudget = this.calculateExcessBudget(newChartValues);

    this.setState({
      [name]: floatValue,
      monthlyBudget: newMonthlyBudget,
      chartData: newChartValues,
      currentRemainingBudget: newChartValues.datasets[2].data[this.state.currentMonth],
      excessBudget: newExcessBudget,
    })

  }

  handlePlanInitialisation(years, monthlyincome, goal, setMonthlyBudget, pastExpenses) {

    let newChartValues = this.handleChartInitialisation(setMonthlyBudget, pastExpenses);

    let newExcessBudget = this.calculateExcessBudget(newChartValues);

    this.setState({
      years: years,
      monthlyIncome: monthlyincome,
      goal: goal,
      monthlyBudget: setMonthlyBudget,
      chartData: newChartValues,
      currentRemainingBudget: newChartValues.datasets[2].data[this.state.currentMonth],
      excessBudget: newExcessBudget,
      savedExpenses: pastExpenses,
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

  handleReasonChange(event) {
    this.setState({
      expenseReason: event.target.value,
    })
  }

  setExpense() {

    const { monthlyBudget, newExpense, newMonth, currentMonth, chartData } = this.state;

    //adjusting expenses

    let newExpenseChart = { ...chartData }

    let newExpenseData = newExpenseChart.datasets[0].data.map(
      (x, index) => {
        return (index === newMonth) ? x + parseFloat(newExpense) : x;
      }
    );

    // adjusting future planned budget

    // let newAdjustedBudget = this.calculateNewBudget(newExpenseData);

    let newPlannedBudgetData = newExpenseChart.datasets[0].data.map(
      (x, index) => {

        let leftoverBudget = monthlyBudget - newExpenseData[index];

        if (index > currentMonth) {

          if (newExpenseData[index] === 0) {
            return monthlyBudget;
          } else {
            return leftoverBudget;
          }

        } else {
          return "";
        }

      }
    );

    //adjusting current remaining budget till month

    let currentMonthBudget = monthlyBudget;

    let currentMonthLeftoverBudget = currentMonthBudget - newExpenseData[newMonth];

    let newRemainingBudgetData = newExpenseChart.datasets[0].data.map(
      (x, index) => {

        if (index <= currentMonth) {

          if (index === newMonth) {
            return currentMonthLeftoverBudget;
          } else if (newExpenseChart.datasets[2].data[index] === '') {
            return monthlyBudget;
          } else {
            return newExpenseChart.datasets[2].data[index];
          }

        } else {
          return "";
        }
      }

    );

    //setting newExpenseChartData

    newExpenseChart.datasets[0].data = newExpenseData;
    newExpenseChart.datasets[1].data = newPlannedBudgetData;
    newExpenseChart.datasets[2].data = newRemainingBudgetData;

    let newExcessBudget = this.calculateExcessBudget(newExpenseChart);

    let formattedMonth = moment.months(newMonth);
    let newAlertMessage = `Expense of $${newExpense} added for the month of ${formattedMonth}`;

    this.setState({
      chartData: newExpenseChart,
      newExpense: 0,
      currentRemainingBudget: newExpenseChart.datasets[2].data[currentMonth],
      excessBudget: newExcessBudget,
      alert: true,
      alertMessage: newAlertMessage,
    })

  }

  //================================================================================
  // Requests to Back-End
  //================================================================================

  //Pings backend when frontend starts. This is as backend is using a free Heroku dyno. By waking the dyno ahead of time, this will decrease the delay which the user may face if dyno is only awaken after registration or login.
  pingAPI() {
    let request = new Request(site + '/ping', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });
    fetch(request)
      .catch(function (err) {
        console.log(err);
      })
  }

  handleUserRegistration(username, password) {

    const here = this;

    let user_data = {
      user_name: username,
      user_password: password
    };
    let request = new Request(site + '/api/new-user', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user_data),
    });

    //xmlhttprequest()

    fetch(request)
      .then(function (response) {
        response.json()
          .then(function (data) {
            if (data.registered) {
              cookies.set('userId', data.id, { path: '/' });
              cookies.set('userSession', data.userSession, { path: '/' });
              here.setState({
                username: user_data.user_name,
                loggedIn: true,
                alert: true,
                alertMessage: data.message,
              })
            } else {
              here.setState({
                alert: true,
                alertMessage: data.message
              })
            }
          })
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  handleUserLogin(username, password) {

    const here = this;

    let user_data = {
      user_name: username,
      user_password: password
    };
    let request = new Request(site + '/api/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user_data)
    });

    //xmlhttprequest()

    fetch(request)
      .then(function (response) {
        response.json()
          .then(function (data) {
            if (data.loggedIn) {
              cookies.set('userId', data.id, { path: '/' });
              cookies.set('userSession', data.userSession, { path: '/' });
              here.setState({
                username: user_data.user_name,
                loggedIn: true,
                alert: true,
                alertMessage: data.message,
                newUser: false
              })
            } else {
              here.setState({
                alert: true,
                alertMessage: data.message
              })
            }
          })
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  handleSetPlan() {

    const {
      goal,
      monthlyIncome,
      years,
    } = this.state;

    let userId = cookies.get('userId');
    let userSession = cookies.get('userSession');

    const here = this;

    let user_plan = {
      goal: goal,
      monthlyIncome: monthlyIncome,
      years: years,
      userId: userId,
      userSession: userSession
    };

    let request = new Request(site + '/api/set-plan', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user_plan)
    });

    //xmlhttprequest()

    fetch(request)
      .then(function (response) {
        response.json()
          .then(function (data) {
            here.setState({
              newUser: false,
              alert: true,
              alertMessage: data.message
            })
          })
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  //This function gets BOTH the user's current plan, and previous recorded expenses.
  getUserPlan() {

    let userId = cookies.get('userId');
    let userSession = cookies.get('userSession');

    const here = this;

    let user_details = {
      userId: userId,
      userSession: userSession
    };

    let request = new Request(site + '/api/get-plan', {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user_details)
    });

    //xmlhttprequest()

    fetch(request)
      .then(function (response) {
        response.json()
          .then(function (data) {
            if (data.exist) {
              const { expenses } = data.data;
              const {
                goal,
                years,
                monthlyincome
              } = data.data.plan[0];
              let setMonthlyBudget = here.budgetPerMonth(monthlyincome, goal, years);
              here.handlePlanInitialisation(years, monthlyincome, goal, setMonthlyBudget, expenses);
            } else {
              here.handlePlanInitialisation(1, 3000, 18000, 1500, []);
            }
          })
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  handleSetExpense() {

    const {
      newExpense,
      newMonth,
      expenseReason,
    } = this.state;

    let userId = cookies.get('userId');
    let userSession = cookies.get('userSession');

    const here = this;

    let user_expense = {
      newExpense: newExpense,
      newMonth: newMonth,
      expenseReason: expenseReason,
      userId: userId,
      userSession: userSession
    };

    let request = new Request(site + '/api/set-expense', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user_expense)
    });

    //xmlhttprequest()

    fetch(request)
      .then(function (response) {
        response.json()
          .then(function (data) {
            here.setExpense();
          })
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  //================================================================================
  // End of Functions
  //================================================================================

  render() {

    const {
      years,
      monthlyIncome,
      goal,
      monthlyBudget,
      newExpense,
      newMonth,
      expenseReason,
      chartData,
      newUser,
      username,
      loggedIn,
      currentRemainingBudget,
      excessBudget,
      alert,
      alertMessage,
      savedExpenses,
    } = this.state;

    return (
      <React.Fragment>
        <ErrorBoundary>
          <MuiThemeProvider theme={theme}>
            <NavBar
              handleUserRegistration={this.handleUserRegistration}
              handleUserLogout={this.handleUserLogout}
              handleUserLogin={this.handleUserLogin}
              username={username}
              loggedIn={loggedIn}
            />
            <Alert
              alert={alert}
              alertMessage={alertMessage}
              closeAlert={this.closeAlert}
            />
            {
              !loggedIn &&
              <LandingPage
                handleUserRegistration={this.handleUserRegistration}
              />
            }
            {
              loggedIn && newUser &&
              <Welcome
                years={years}
                monthlyIncome={monthlyIncome}
                goal={goal}
                monthlyBudget={monthlyBudget}
                onPlanChange={this.handlePlanChange}
                handleSetPlan={this.handleSetPlan}
              />
            }
            {
              loggedIn && !newUser &&
              <Grid
                container
                style={{ marginTop: `64px` }}
              >
                <Grid item md={4} xs={12}>
                  <Paper>
                    <UserInput
                      newUser={newUser}
                      years={years}
                      monthlyIncome={monthlyIncome}
                      goal={goal}
                      monthlyBudget={monthlyBudget}
                      newExpense={newExpense}
                      newMonth={newMonth}
                      expenseReason={expenseReason}
                      currentRemainingBudget={currentRemainingBudget}
                      excessBudget={excessBudget}
                      savedExpenses={savedExpenses}
                      onPlanChange={this.handlePlanChange}
                      onExpenseChange={this.handleExpensesChange}
                      onMonthChange={this.handleMonthChange}
                      onReasonChange={this.handleReasonChange}
                      setExpense={this.setExpense}
                      handleSetPlan={this.handleSetPlan}
                      getUserPlan={this.getUserPlan}
                      handleSetExpense={this.handleSetExpense}
                    />
                  </Paper>
                </Grid>
                <Grid item md={8} xs={12}>
                  <Paper style={styles.menu}>
                    <Chart
                      chartData={chartData}
                      displayDataLabel={true}
                      displayLegend={true}
                      displayTooltips={true}
                    />
                  </Paper>
                </Grid>
              </Grid>
            }
          </MuiThemeProvider>
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

export default App;
