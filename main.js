const fs = require("fs");
const axios = require("axios");

const URL = "http://jsonplaceholder.typicode.com/posts/";

// Start program
(async function main() {
  const data = await fetchData(URL);
  const written = await writeToFile(data);

  console.log(written ?? "Something went wrong, please contact the developer.");
})();

async function fetchData(url) {
  try {
    const rawData = await axios(url);
    if (!rawData) {
      // If nothing was returned from resource
      throw new Error("Unable to fetch resource.");
    }
    return rawData;
  } catch (err) {
    throw err;
  }
}

async function writeToFile(result) {
  // fs.writeFile() requires strings
  const dataString = JSON.stringify(result.data);

  fs.writeFile("./results/posts.json", dataString, (err) => {
    if (err) throw err;
  });
  return "Data was written to file successfully.";
}

// Victory!
