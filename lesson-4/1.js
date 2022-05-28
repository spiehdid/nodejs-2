const fs = require("fs");
const yargs = require("yargs");
const path = require("path");

const options = yargs.usage("Usage: -p <path>").option("p", {
  alias: "path",
  describe: "Path to file",
  type: "string",
  demandOption: true,
}).argv;

const filePath = path.join(__dirname, options.path);
const data = fs.readFileSync(filePath, "utf8");

console.log(data);
