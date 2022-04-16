import React from "react";
import { Line } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        position: "left",
        id: "Entropy",
        ticks: {
          min: 2,
          max: 20,
          stepSize: 1,
        },
        scaleLabel: {
          display: true,
          labelString: "Sum of Entropies",
          fontSize: 12,
          padding: 10,
        },
      },
    ],
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Latent Dimensions",
          fontSize: 12,
          padding: 10,
        },
      },
    ],
  },
};

const labels = [];

for (let i = 1; i <= 36; i++) labels.push(i);

const Entropy = ({ selection1, selection2 }) => {
  // console.log(entropies);
  const datasets = [
    {
      label: selection1.country,
      fill: false,
      lineTension: 0.1,
      data: selection1.dimSum,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
    },
    {
      label: selection2.country,
      fill: false,
      lineTension: 0.1,
      data: selection2.dimSum,
      backgroundColor: "rgb(204, 239, 255)",
      borderColor: "rgb(77, 198, 255)",
    },
  ];
  const state = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div className="ui row" style={{ paddingTop: "50px" }}>
      <div className="centered ">
        <div className="ui segment">
          <Line data={state} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Entropy;
