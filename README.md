# CO2 Calculator using yargs
A command line tool that returns the amount of CO2-equivalent that will be caused when traveling a given distance using a given transportation method.

## 1. How to run the tool

### Install dependencies

>After clone/download the project, go to your project root folder via command line
```
cd /dev_co2
```
>Add node dependencies

```
npm install
```
### Start Tool

```
node co2-calculator.js --transportation-method [str] --distance [num]
```
all transportation methods are listed as follows:
[
  'bus',
  'train',
  'small-diesel-car',
  'small-petrol-car',
  'small-plugin-hybrid-car',
  'small-electric-car',
  'medium-diesel-car',
  'medium-petrol-car',
  'medium-plugin-hybrid-car',
  'medium-electric-car',
  'large-diesel-car',
  'large-petrol-car',
  'large-plugin-hybrid-car',
  'large-electric-car'
]

## 2. How to run the unit-test
```
mocha test.js
```