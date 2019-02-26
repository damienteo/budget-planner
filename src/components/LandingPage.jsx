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
	"rgba(96, 125, 139)",
	"rgba(88, 139, 134)",
	"rgba(72, 139, 127)",
	"rgba(64, 139, 120)",
	"rgba(56, 135, 113)",
	"rgba(48, 130, 106)",
	"rgba(40, 120, 100)",
	"rgba(32, 110, 98)",
	"rgba(24, 100, 87)",
	"rgba(16, 90, 76)",
	"rgba(8, 80, 75)",
	"rgba(0, 70, 64)",
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
              hoverBackgroundColor: "rgba(96, 125, 139)",
          },
        ],
      },
    };
  }

  	componentDidMount() {
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

		const { chartData } = this.state;

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