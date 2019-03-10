import React from 'react';
import Chart from './Chart';

class ChartDemo extends React.Component {

  constructor() {

    super();

    this.state = {
      start: true,
      chartData: {
        labels: [
          'Present',
          'Future',
        ],
        datasets: [
          {
            stack: 'stack1',
            label: 'Expenses',
            data: [
              100,
              '',
            ],
            backgroundColor: "rgba(255,99,132,0.3)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 0,
            hoverBackgroundColor: "rgba(255,99,132,0.5)",
            hoverBorderColor: "rgba(255,99,132,1)",
          },
          {
            stack: 'stack1',
            label: 'Future Budget',
            data: [
              '',
              100,
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

  render() {

    const { chartData } = this.state;

    return (
      <Chart
        chartData={chartData}
        displayDataLabel={true}
        displayLegend={false}
        displayTooltips={true}
      />
    )
  }
}

export default ChartDemo