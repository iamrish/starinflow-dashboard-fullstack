const csv = require("fast-csv");
const fs = require("fs");
const path = require("path");

const data = [];
const visitedCountries = new Set();

// Async function to get all the files from the directory
const getFiles = async (dirPath, fileList) => {
  const files = await fs.promises.readdir(dirPath);
  for (file of files) {
    const stat = await fs.promises.stat(path.join(dirPath, file));
    if (stat.isDirectory()) {
      await getFiles(path.join(dirPath, file), fileList);
    } else if (stat.isFile()) {
      fileList.push(path.join(dirPath, file));
    }
  }
  return fileList;
};

const pushData = (obj, row, month = null, country = null) => {
  // console.log(obj, row, month);
  if (!obj.caseDates.includes(row[0])) obj.caseDates.push(row[0]);
  obj.cases.push(row[2]);
  obj.preds.push(row[3]);
  if (!obj.predDates.includes(row[4])) obj.predDates.push(row[4]);
  if (month) obj.month = month;
  if (country) {
  }
};

// Construct the object
const makeData = (row, oldDataFlag = 0, month) => {
  if (row[0] === "Date") {
    // Do nothing as this is the first row
  } else if (!oldDataFlag) {
    if (!visitedCountries.has(row[1])) {
      // 1. naya object
      data.push({
        country: row[1],
        cases: [row[2]],
        preds: [row[3]],
        caseDates: [row[0]],
        predDates: [row[4]],
        prev: [],
      });

      // 2. add to visited countries
      visitedCountries.add(row[1]);

      //3. add dates
    } else {
      // 1. find the object jisme insert karna hai
      for (obj of data) {
        if (obj.country === row[1]) {
          pushData(obj, row);
        }
      }
    }
  } else if (oldDataFlag) {
    for (obj of data) {
      if (obj.country === row[1]) {
        for (o of obj.prev) {
          // if month is present
          if (o.month === month) {
            pushData(o, row);
            return;
          }
        }
        // console.log("oldDataFlag", oldDataFlag);
        obj.prev.push({
          month: "",
          cases: [],
          preds: [],
          caseDates: [],
          predDates: [],
        });
        pushData(obj.prev.slice(-1)[0], row, month);
      }
    }
  }
};

// Async function to read and parse CSV
const readCSV = (path) => {
  // console.log(path);
  return new Promise(async (resolve, reject) => {
    fs.createReadStream(path)
      .pipe(csv.parse())
      .on("data", (row) => {
        const month = path.split("_").slice(-1)[0].slice(0, 7);
        // console.log(path.split("\\"));
        makeData(row, path.split("\\")[7] === "oldData", month);
      })
      .on("end", resolve)
      .on("error", reject);
  });
};

const getCaseDataRunner = (dirPath) => {
  // console.log(dirPath);
  return new Promise((resolve, reject) => {
    getFiles(dirPath, [])
      .then(async (files) => {
        for (file of files) {
          // console.log(file);
          await readCSV(file);
        }
      })
      .then(() => {
        resolve(data);
      });
  });
};

module.exports = {
  getCaseDataRunner,
  visitedCountries,
};
// runnerFunc(`${__dirname}/data/cases`).then((data) => console.log(data));
