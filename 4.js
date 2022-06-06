#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const isDirectory = (fileName) => {
  return fs.lstatSync(fileName).isDirectory();
};
const isFile = (fileName) => {
  return fs.lstatSync(fileName).isFile();
};

const main = async () => {
  const dirCd = ['..'];
  const dirList = fs.readdirSync(__dirname).filter(isDirectory);
  const fileList = fs.readdirSync(__dirname).filter(isFile);
  const list = dirCd.concat(dirList.concat(fileList));

  const answer = await inquirer.prompt([
    {
      name: "fileName",
      type: "list",
      message: "Choose file:",
      choices: list,
    },
  ]);

  const filePath = path.join(__dirname, answer.fileName);
  if (fs.lstatSync(filePath).isDirectory()){
    __dirname = filePath;
    main();
  } else {
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Please enter text to search: ", function (textSearch) {
      const data = fs.readFileSync(filePath, "utf8");
      if (data.indexOf(textSearch) != "-1"){
        const found = data.match(new RegExp(".*"+textSearch+".*", "gm"));
        console.log("Found: "+found.length+" results.\nResults:\n"+found.join('\n'));
      } else {
        console.log("Not found!");
      }
      rl.close();
    });
  }
};

main();