const { green, yellow, red } = require("colors/safe"),
isPrime = (number) => {
    for (let i = 2; i <= number / 2; i++) {
      if (number % i === 0) return false;
    }
    return true;
},
from = +process.argv[2],
to = +process.argv[3];
let count = 1,
arr = [],
err = 0,
messages = ["Начало диапазона должно быть положительным числом!", "Конец диапазона должно быть положительным числом!"];
if (Math.sign(from) == -1 || (isNaN(parseFloat(from)) && !isFinite(from))){
    err = 1;
}
if(Math.sign(to) == -1 || (isNaN(parseFloat(to)) && !isFinite(to))){
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
    let colorer = green;
    if (isPrime(number)) {
      if (count % 2 === 0) {
        colorer = yellow;
        count ++;
      } else if (count % 3 === 0) {
        colorer = red;
        count = 1;
      } else {
        count ++;
      }
      arr.push([colorer,number]);
    }
    return arr;
}
for (let number = from; number <= to; number++) {
    getColor(number);
}
if (!arr.length == 0){
    var index;
    for (index = 0; index < arr.length; ++index) {
        console.log(arr[index][0](arr[index][1]));
    }
} else {
    throw console.log(red("В последовательности не было простых чисел!"));
}
