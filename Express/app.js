// 100% node.js under the hood
// The routers do add like a piece of middleware! interesting
const express = require("express");
const cors = require("cors");
const { getCaseDataRunner, visitedCountries } = require("./getCaseData");
const getEntropyDataRunner = require("./getEntropyData");

const app = express();
const caseRouter = express.Router();
const entropyRouter = express.Router();
const countryRouter = express.Router();

// 1. MIDDLEWARE
app.use(express.json());
app.use(cors("http://localhost:3000"));
app.use("/api/v1/cases", caseRouter);
app.use("/api/v1/entropy", entropyRouter);
app.use("/api/v1/countries", countryRouter);

// 2. API request handler
const apiController = (router, data) => {
  router.route("/").get((req, res) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });

  router.route("/:country").get((req, res) => {
    let flag = 0;
    for (obj of data) {
      if (req.params.country === obj.country) {
        flag = 1;
        break;
      }
    }
    if (!flag) {
      res.status(404).json({
        status: "failiure",
        message: "Invalid country",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: obj,
      });
    }
  });
};

const countryController = (router) => {
  // console.log(visitedCountries);
  router.route("/").get((req, res) =>
    res.status(200).json({
      status: "success",
      data: [...visitedCountries],
    })
  );
};
const caseRunner = async () => {
  const data = await getCaseDataRunner(`${__dirname}/data/cases`);
  apiController(caseRouter, data);
};

const entropyRunner = async () => {
  const data = await getEntropyDataRunner(`${__dirname}/data/entropy`);
  apiController(entropyRouter, data);
};

const countryRunner = () => {
  countryController(countryRouter);
};

caseRunner().then(() => {
  entropyRunner().then(() => countryRunner());
});

module.exports = app;
