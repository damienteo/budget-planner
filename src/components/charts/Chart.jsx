import React, {Component} from 'react';
import {Bar, defaults} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

class Chart extends Component {

	render() {

		defaults.global.defaultFontFamily = 'Roboto';
		defaults.global.animation.duration = 2000;
		defaults.global.layout.padding = 20;

		const {chartData} = this.props;

		return(
			<div className="chart">
				<Bar
					data={chartData}
					width={100}
					height={65}
					options={{
						title:{
							display:false,
							text:"2019",
							fontSize: 25
						},
						legend: {
							display: true,
							position: 'top',
							labels: {
			                     fontSize: 20
			                }
						},
						plugins: {
						   datalabels: {
						     	display: true,
						     	color: 'black',
						      	font: {
						          	size: 11,
						          	weight: 200
						        },
						   }
						},
						scales: {
						    yAxes: [
						    	{ 
						    		gridLines: {
							        	display:true,
							        	color:"rgba(255,99,132,0.2)"
							        }
						    	},
						    ],
						    xAxes: [
						    	{
					        		gridLines: {
							        	display:false
							        } 
						    	},
						    ],
						 },
					}}
				/>
			</div>
		)
	}
}

export default Chart;