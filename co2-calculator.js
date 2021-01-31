
const calculator = require("./src/index").calculator;
var getter = require("./src/index").getter; // get the arguments from command line
var res = calculator(getter.argv) // get the claculation result by given command line arguments

console.log(`Your trip caused ${res.result.toFixed(1)} ${res.output_unit} of CO2-equivalent.`)