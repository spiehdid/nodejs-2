const { green, yellow, red } = require("colors/safe"),
isPrime = (number) => {
    for (let i = 2; i <= number / 2; i++) {
      if (number % i === 0) return false;
    }
    return true;
},
from = +process.argv[2],
to = +process.argv[3];
let count = 0,
arr = [],
err = 0,
messages = ["Начало диапазона должно быть положительным числом!", "Конец диапазона должно быть положительным числом!"];
if (Math.sign(from) == -1 || !isFinite(from)){
    err = 1;
}
if(Math.sign(to) == -1 || !isFinite(to)){
    err = err + 2;
}
switch(err) {
    case 1:  
    throw console.log(red(messages[0]));
    case 2:  
    throw console.log(red(messages[1]));
    case 3: 
    throw console.log(red(messages[0]),red(messages[1]));
}
function getColor(number){
  switch (count % 3) {
    case 0:
      return green;
    case 1:
      return yellow;
    case 2:
      return red;
  }
}
for (let number = from; number <= to; number++) {
  if (isPrime(number)) {
    colorer = getColor(number);
    count ++;
    console.log(colorer(number));
  } 
}
if(!count){
    throw console.log(red("В последовательности не было простых чисел!"));
}