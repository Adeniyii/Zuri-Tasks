const axios = require("axios");
const { join } = require("path");
const { mkdir, writeFile } = require("fs").promises;

const URL = "http://jsonplaceholder.typicode.com/posts/";

async function main() {
  const data = await fetchData(URL);
  const written = await writeToFile(data);

  console.log(
    written ?? "Something went wrong, please contact the developer..."
  );
}

async function fetchData(url) {
  try {
    const rawData = await axios(url);
    if (!rawData) {
      // If nothing was returned from resource
      throw new Error("Unable to fetch resource...");
    }
    return rawData;
  } catch (err) {
    throw err;
  }
}

async function createDir(path) {
  try {
    await mkdir(path);
    console.log("created result directory...");
  } catch (err) {
    if (err.code === "EEXIST") return null;
    else return err;
  }
}

async function writeToFile(result) {
  const filePath = join(__dirname, "result");
  const dataString = JSON.stringify({ ...result.data });

  try {
    const didNotWork = await createDir(filePath);

    if (didNotWork) throw didNotWork;
    else await writeFile("./result/posts.json", dataString);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  return "Data was written to file successfully.";
}

main();
