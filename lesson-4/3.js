#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const isFile = (fileName) => {
  return fs.lstatSync(fileName).isFile();
};

const list = fs.readdirSync(__dirname).filter(isFile);

const main = async () => {
  const answer = await inquirer.prompt([
    {
      name: "fileName",
      type: "list",
      message: "Choose file:",
      choices: list,
    },
  ]);

  const filePath = path.join(__dirname, answer.fileName);
  const data = fs.readFileSync(filePath, "utf8");

  console.log(data)
};

main();
