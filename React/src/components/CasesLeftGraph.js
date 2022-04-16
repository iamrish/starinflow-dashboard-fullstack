import React from "react";
import { Line } from "react-chartjs-2";

import { options2 } from "../data/graphAxesConfig";

const CasesLeftGraph = ({ country, labels }) => {
  // console.log(country);
  const state = {
    labels: labels,
    datasets: [
      {
        label: "Cases",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: country.cases,
      },
      {
        label: "Predictions",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgb(204, 239, 255)",
        borderColor: "rgb(77, 198, 255)",
        data: country.preds,
      },
    ],
  };
  return (
    <div className="eight wide column">
      <div className="ui segment">
        <Line
          data={state}
          options={options2}
          style={{ paddingRight: "20px" }}
        />
      </div>
    </div>
  );
};

export default CasesLeftGraph;
