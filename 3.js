const fs = require("fs");
const { Transform } = require("stream");
const logFile = process.argv[2];
const ipAddr = process.argv[3];
const readStream = fs.createReadStream("./"+logFile, "utf8");
const writeStream = fs.createWriteStream("./"+ipAddr+"_processed.log", {
  flags: "a",
  encoding: "utf-8",
});

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const transformedChunk = chunk
      .toString()
      .replace(new RegExp(ipAddr+".*\n", "g"), '\.$&')
      .replace(new RegExp("^[0-9/\ \/a-z/A-Z/-].*", "img"), '')
      .replace(new RegExp("^[\.]", "mg"), '')
      .replace(new RegExp("^[\n]$", "mg"), "")
      .replace(new RegExp("\n\n", "mg"), "\n");
    callback(null, transformedChunk);
  },
});

readStream.pipe(transformStream).pipe(writeStream);

console.log("Запись завершена!");