import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends Component {

	constructor(props) {
		super(props);
	}

	// static defaultProps = {
	// 	displayTitle: true,
	// 	displayLegend: true,
	// 	legendPosition: ''
	// }

	render() {
		const {chartData} = this.props;

		return(
			<div className="chart">
				<Bar
					data={chartData}
					width={100}
					height={50}
					options={{
						title:{
							display:true,
							text:"2019",
							fontSize: 25
						},
						legend: {
							display: true,
							position: 'right'
						}
					}}
				/>
			</div>
		)
	}
}

export default Chart;