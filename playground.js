const Step = require("step");
const add = [1, 2, 3, 4, 6, 7];
Step(
  function callforEachFun() {
    add.forEach(this);
  },
  function funofEach(error, value) {
    console.log(value);
  }
);
