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
              0,
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
          {
            stack: 'stack1',
            label: 'Current Budget',
            data: [
              100,
              '',
            ],
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
    this.timerID = setInterval(
      () => this.change(),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  change() {

    const { start, chartData } = this.state;

    let newChartData = { ...chartData };

    if (start === true) {
      newChartData.datasets[0].data[0] = 100;
      newChartData.datasets[2].data[0] = 0;
    } else {
      newChartData.datasets[2].data[0] = 100;
      newChartData.datasets[0].data[0] = 0;
    }

    this.setState({
      chartData: newChartData,
      start: !start,
    });

  }

  render() {

    // console.log('render');

    const { chartData } = this.state;
    // console.log(" expense", chartData.datasets[0].data)
    // console.log(" budget", chartData.datasets[2].data)

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