import React from 'react';
import { 
	Typography,
} from '@material-ui/core';
import Chart from './charts/Chart';

const values = [
	0,
	100, 
	200, 
	300, 
	400, 
	500, 
	600, 
	700,
	800,
	900,
	1000,
	1100
];

const hues =[
	"rgba(255, 242, 176)",
	"rgba(255, 248, 176)",
	"rgba(255, 255, 176)",
	"rgba(248, 255, 176)",
	"rgba(242, 255, 176)",
	"rgba(235, 255, 176)",
	"rgba(228, 255, 176)",
	"rgba(221, 255, 176)",
	"rgba(215, 255, 176)",
	"rgba(208, 255, 176)",
	"rgba(201, 255, 176)",
	"rgba(195, 255, 176)",
];

class LandingPage extends React.Component {

	constructor() {

    super();

    this.state = {
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
            label: '',
            data:values,
              backgroundColor: hues,
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 0,
              hoverBackgroundColor: "rgba(255,99,132,0.5)",
              hoverBorderColor: "rgba(255,99,132,1)",
          },
        ],
      },
    };
  }

  	componentDidMount() {
  		console.log("landingPage mounted");
  		this.timerID = setInterval(
			() => this.change(),
			2000
		);
  	}

  	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	change() {

		let reshuffleValues=[];
		for (let i = 0; i < values.length; i++) {
			let randomValue = Math.floor((Math.random() * 10) + 1);
			reshuffleValues.push(values[randomValue]);
		}

		let reshuffleHues=[];
		for (let i = 0; i < hues.length; i++) {
			let randomHue = Math.floor((Math.random() * 10) + 1);
			reshuffleHues.push(hues[randomHue]);
		}
		
		let newChartData = { ...this.state.chartData};
		newChartData.datasets[0].data = reshuffleValues;
		newChartData.datasets[0].backgroundColor = reshuffleHues;

		this.setState({
			chartData: newChartData,
		});

	}

	render() {

		const { date, chartData } = this.state;

		return(
			<React.Fragment>
				<Typography>
		            This is the Landing Page!
		         </Typography>
		         <Typography>
		            Budget Planner is about visualising your financial future. ALl too often, we make goals to save, but we find it hard to keep track of how much we need to save.
		         </Typography>
		         <Typography>
		            Budget Planner will automatically calculate how much you need to save, and how much you should spend per month to meet your savings goal. It will show you clearly how you are improving in terms of contorlling your spending.
		         </Typography>
		         <Chart chartData={ chartData }/>
			</React.Fragment>
		)
	}
}

export default LandingPage;