import React from 'react';
import Chart from './Chart';

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
	1100,
	1000,
	900,
	800,
	700,
	600,
	500,
	400,
	300,
	200,
	100,
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
	1100,
	1000,
	900,
	800,
	700,
	600,
	500,
	400,
	300,
	200,
	100,
	0,
	100,
	200
];

const hues = [
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
	"rgba(96, 125, 139, 0.75)",
	"rgba(88, 139, 134, 0.75)",
	"rgba(72, 139, 127, 0.75)",
	"rgba(64, 139, 120, 0.75)",
	"rgba(56, 135, 113, 0.75)",
	"rgba(48, 130, 106, 0.75)",
	"rgba(40, 120, 100, 0.75)",
	"rgba(32, 110, 98, 0.75)",
	"rgba(24, 100, 87, 0.75)",
	"rgba(16, 90, 76, 0.75)",
	"rgba(8, 80, 75, 0.75)",
	"rgba(0, 70, 64, 0.75)",
];

class Animation extends React.Component {

	constructor() {

		super();

		this.state = {
			chartData: {
				labels: [
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
				],
				datasets: [
					{
						label: '',
						data: values,
						backgroundColor: hues,
						hoverBackgroundColor: "rgba(96, 125, 139)",
					},
				],
			},
			down: [
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				false,
				false,
				false,
			]
		};
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.change(),
			500
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	change() {

		let previousValues = this.state.chartData.datasets[0].data;

		let changeDirection = [...this.state.down];

		let reshuffleValues = [];
		for (let i = 0; i < previousValues.length; i++) {

			if (previousValues[i] === 1100) {
				changeDirection[i] = true
			}

			if (previousValues[i] === 0) {
				changeDirection[i] = false
			}

			let newValue;

			if (changeDirection[i] === true) {
				newValue = previousValues[i] - 100;
			} else {
				newValue = previousValues[i] + 100;
			}
			reshuffleValues.push(newValue);
		}

		let reshuffleHues = [];
		for (let i = 0; i < 48; i++) {
			let randomHue = Math.floor((Math.random() * 20));
			reshuffleHues.push(hues[randomHue]);
		}

		let newChartData = { ...this.state.chartData };
		newChartData.datasets[0].data = reshuffleValues;
		newChartData.datasets[0].backgroundColor = reshuffleHues;

		this.setState({
			chartData: newChartData,
			down: changeDirection,
		});

	}

	render() {

		const { chartData } = this.state;

		return (
			<Chart
				chartData={chartData}
				displayDataLabel={false}
				displayLegend={false}
				displayTooltips={false}
			/>
		)
	}
}

export default Animation