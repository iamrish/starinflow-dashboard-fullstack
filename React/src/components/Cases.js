import React from "react";
import { Line } from "react-chartjs-2";
import CasesLeftGraph from "./CasesLeftGraph";
import { options1 } from "../data/graphAxesConfig";

const Cases = ({ country, entropy }) => {
  // console.log(country);
  const state1 = {
    labels: country.caseDates,
    datasets: [
      {
        label: "Cases",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: country.cases,
        yAxisID: "Cases",
      },
      {
        label: "Min Ent",
        fill: "+1",
        lineTension: 0.1,
        backgroundColor: "rgb(204, 239, 255)",
        borderColor: "rgb(77, 198, 255)",
        data: entropy.min,
        yAxisID: "Entropy",
      },
      {
        label: "Max Ent",
        fill: "-1",
        lineTension: 0.1,
        backgroundColor: "rgb(204, 239, 255)",
        borderColor: "rgb(77, 198, 255)",
        data: entropy.max,
        yAxisID: "Entropy",
      },
      {
        label: "Mean Ent",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgb(0, 51, 77)",
        borderColor: "rgb(0, 51, 77)",
        data: entropy.mean,
        yAxisID: "Entropy",
      },
    ],
  };
  return (
    <div className="ui row">
      <CasesLeftGraph country={country} labels={country.predDates} />

      <div className="eight wide column">
        <div className="ui segment">
          <Line
            data={state1}
            options={options1}
            style={{ paddingLeft: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Cases;
