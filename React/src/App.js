import React, { useEffect, useState } from "react";
import { HashRouter, Route } from "react-router-dom";
import axios from "axios";

import Dropdown from "./components/Dropdown";
import Cases from "./components/Cases";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar.js";
import Socials from "./components/Socials";
import Paper from "./components/Paper";
import Cards from "./components/Cards";

// import countries from "./data/countries";
// import countries_old from "./data/countries_old";
import EntropyToggler from "./components/EntropyToggler";
// import entropies from "./data/entropies";
// console.log(entropies);

const lastUpdatedDate = "08-03-22";

const App = () => {
  const [countrySelection, onCountrySelect] = useState("India");
  const [caseData, setCaseData] = useState(null);
  const [entropyData, setEntropyData] = useState(null);
  const [allEntropy, setAllEntropy] = useState(null);
  const [countries, setCountries] = useState(null);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8888/api/v1/cases/${countrySelection}`)
      .then((data) => {
        setCaseData(data.data.data);
      });
    axios
      .get(`http://localhost:8888/api/v1/entropy/${countrySelection}`)
      .then((data) => setEntropyData(data.data.data));
  }, [countrySelection]);

  useEffect(() => {
    axios.get("http://localhost:8888/api/v1/countries").then((data) => {
      setCountries(data.data.data);
    });
    axios.get("http://localhost:8888/api/v1/entropy").then((data) => {
      setAllEntropy(data.data.data);
    });
  }, []);

  return (
    <div>
      {allEntropy && (
        <HashRouter>
          <Navbar clicked={clicked} setClicked={setClicked} />
          <div style={{ textAlign: "right", fontSize: "13px" }}>
            Last updated on {lastUpdatedDate}
          </div>
          <div
            className="ui grid stackable"
            style={{ opacity: clicked ? 0 : 1 }}
          >
            <Route path="/" exact>
              <div className="ui row">
                <div
                  className="centered twelve wide column"
                  style={{ paddingTop: "20px" }}
                >
                  <Dropdown
                    selection={countrySelection}
                    label={"Country"}
                    onSelect={onCountrySelect}
                    options={countries}
                  />
                </div>
              </div>
              <Cases country={caseData} entropy={entropyData} />
              <div className="ui row">
                <div className="centered three wide column">
                  <div style={{ textAlign: "center" }}>
                    <h2>Previous Prediction</h2>
                  </div>
                </div>
              </div>
              <Cards country={caseData.prev} />
            </Route>
            <Route path="/entropy-plots" exact>
              <EntropyToggler entropies={allEntropy} options={countries} />
            </Route>
            <Route path="/paper" exact>
              <Paper />
            </Route>
          </div>
          <Socials clicked={clicked} />
          <Footer clicked={clicked} />
        </HashRouter>
      )}
    </div>
  );
};

export default App;
