console.log("Record 1");

Promise.resolve().then(() => console.log("Record 2"));

setTimeout(() => {
  console.log("Record 3");
  Promise.resolve().then(() => {
    console.log("Record 4");
  });
});

Promise.resolve().then(() => {
  Promise.resolve().then(() => {
    console.log("Record 5");
  });
  console.log("Record 6");
});

console.log("Record 7");
