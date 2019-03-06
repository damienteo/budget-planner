import React, { Component } from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

class Chart extends Component {

	render() {

		defaults.global.defaultFontFamily = 'Roboto';
		defaults.global.animation.duration = 2000;
		defaults.global.layout.padding = 20;

		const { chartData, displayDataLabel, displayLegend, displayTooltips } = this.props;

		return (
			<div className="chart">
				<Bar
					data={chartData}
					width={100}
					height={65}
					options={{
						title: {
							display: false,
							text: "2019",
							fontSize: 25
						},
						legend: {
							display: displayLegend,
							position: 'top',
							labels: {
								fontSize: 18
							}
						},
						plugins: {
							datalabels: {
								display: displayDataLabel,
								color: 'black',
								font: {
									size: 11,
									weight: 200
								},
							}
						},
						tooltips: {
							enabled: displayTooltips
						},
						scales: {
							yAxes: [
								{
									gridLines: {
										display: true,
										color: "rgba(255,99,132,0.2)"
									}
								},
							],
							xAxes: [
								{
									gridLines: {
										display: false
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