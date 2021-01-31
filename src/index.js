#!/usr/bin/env node
const yargs = require("yargs");
const distanceErr = new Error('Distance should be non-negative number.');
/**
 * Build a dictionary of co2:
 * keys: the names of transportation methods.
 * values: the co2 values per passenger per km.
 * (Source: BEIS/Defra Greenhouse Gas Conversion Factors 2019)
*/
var car_dic = {}
car_dic['bus'] = 27
car_dic['train'] = 6
const car_sizes = ['small','medium','large']
const car_types = ['diesel','petrol','plugin-hybrid','electric']
const car_co2 = [[142,154,73,50],[171,192,110,58],[209,282,126,73]]
for(var i=0; i<car_sizes.length;i++){
    for(var j=0; j<car_types.length;j++){
    var key = car_sizes[i]+'-'+car_types[j]+'-'+'car'
    car_dic[key]= car_co2[i][j]
    }
}
const keys = Object.keys(car_dic);
/** Build the command line tool using yargs
 * getter : get arguments and set corresponding constraints 
 * calculator : compute and show the result on the command line.
*/ 
var getter = yargs
.scriptName("co2-calculator")
.usage('Usage: $0 --transportation-method [str] --distance [num]')
.example('$0 --transportation-method train --distance 5000',
'Returns the amount of CO2 by multiplying the corresponding per-passenger-per-km value of given method and the distance')
.option('transportation-method',{
    alias: 'm',
    describe:'choose your transportation method',
    choices: keys,
    demandOption:true,
   
  }) 
.option('distance',{
    alias: 'd',
    describe:'give a positive number',
    type: 'number',
    demandOption:true,
    nargs: 1,
  }) 
.option('unit-of-distance', {
    alias:'unit_dis',
    choices: ['km', 'm'],
    default:'km'
  })
  .option('output', {
    choices: ['kg', 'g']
  })
  .check((argv) => {
    if (argv.d>=0) {
       return true;
    }
    throw distanceErr;
  });

  function calculator(argv){
    var result = (car_dic[argv.m])*Number(argv.d); // a initial multiplication from two given numbers
    var output_unit = argv.output;
    var mode ; // a string variable (example: 'km-kg') that can distinguish among four different units combination.
    // construct the mode
    if (output_unit==undefined){
      output_unit = (argv.unit_dis=='km') ? output_unit = 'kg' :  output_unit = 'g'
    }
    mode  = output_unit+'-'+argv.unit_dis
    // according to the mode to modified the result
    switch (mode) {
      case 'kg-km':
        result /= 1000
        break;
      case 'kg-m': 
        result /= 1e6
        break;
      case 'g-km': 
        result = result 
        break; 
      case 'g-m':
        result /= 1000
        break;
      default:
        result = result
    }
  return {result:result,output_unit:output_unit,dist_unit:argv.unit_dis}
  }

module.exports = {getter,calculator,keys,car_dic,distanceErr};
