const yargs = require("yargs");
var car_sizes = ['small','medium','large']
var car_types = ['diesel','petrol','plugin-hybrid','electric']
let car_co2 = [[142,154,73,50],[171,192,110,58],[209,282,126,73]]
var car_dic = {}
for(var i=0; i<car_sizes.length;i++){
    for(var j=0; j<car_types.length;j++){
    var key = car_sizes[i]+'-'+car_types[j]+'-'+'car'
    car_dic[key]= car_co2[i][j]
    }
}
car_dic['bus']=27
car_dic['train']=6

const keys = Object.keys(car_dic);
const calculator = require("yargs")
.scriptName("co2-calculator")
.usage('Usage: $0 --transportation-method [str] --distance [num]')
.example('$0 --transportation-method train --distance 5000',
'Returns the amount of CO2 by multiplying the corresponding per-passenger-per-km value of given method and the distance')
.command('welcome ter yargs!', (yargs) => {
  yargs.option('transportation-method',{
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
    choices: ['kg', 'g'],
    default:'kg'
   
  })}, function (argv) {
      console.log('!!!')
    var mode = argv.output+'-'+argv.unit_dis
    switch (mode) {
      case 'kg-km':
        console.log(`Your trip caused ${result/1000} kg of CO2-equivalent.`)
        break;
      case 'kg-m': 
        console.log(`Your trip caused ${result/1e6} kg of CO2-equivalent.`)
        break;
      case 'g-km': 
        console.log(`Your trip caused ${result} g of CO2-equivalent.`)
        break; 
      case 'g-m':
        console.log(`Your trip caused ${result/1000} g of CO2-equivalent.`)
        break;
      default:
        console.log(142*2000);
    }
})
.help()
.argv
;
