const csv = require("fast-csv");
const fs = require("fs");
const path = require("path");
const data = [];
const visitedCountries = new Set();

const findCountryObject = (country) => {
  for (obj of data) {
    if (obj.country === country) return obj;
  }
};

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

const makeData = (row, oldDataFlag, month, country) => {
  if (row[0] === "Date") {
    // Do nothing as this is the first row
  } else if (!oldDataFlag) {
    if (row[0] === "Sum") {
      // make a dimSum array
      const obj = findCountryObject(country);
      obj.dimSum = row.slice(1, -3);
    } else {
      if (!visitedCountries.has(country)) {
        visitedCountries.add(country);
        data.push({
          country,
          min: [row.slice(-3, -2)[0]],
          max: [row.slice(-2, -1)[0]],
          mean: [row.slice(-1)[0]],
          dimSum: [],
        });
      } else {
        const obj = findCountryObject(country);
        obj.min.push(row.slice(-3, -2)[0]);
        obj.max.push(row.slice(-2, -1)[0]);
        obj.mean.push(row.slice(-1)[0]);
      }
    }
  }
};

const readCSV = (path) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(csv.parse())
      .on("data", (row) => {
        const country = path.split("_").slice(-1)[0].split(".")[0];
        const month = path.split("\\")[7];
        makeData(row, path.split("\\")[6] === "oldData", month, country);
      })
      .on("end", resolve)
      .on("error", reject);
  });
};

const runnerFunc = (dirPath) => {
  return new Promise((resolve, reject) => {
    getFiles(dirPath, [])
      .then(async (files) => {
        for (file of files) {
          await readCSV(file);
        }
      })
      .then(() => {
        resolve(data);
      });
  });
};

module.exports = runnerFunc;
