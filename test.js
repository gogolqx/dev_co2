//four unit-tests for the functional requirements of co2-calcualtor 
const cli = require("./src/index").getter;
const car_dic = require("./src/index").car_dic;
const calculator = require("./src/index").calculator;
const distanceErr = require("./src/index").distanceErr;
var expect = require('chai').expect;


describe('1. It can be called with a numeric distance , a unit-of-distance (kilometer km or meter m ) and a transportation-method', function() {
    it('not a non-positive numeric should throw error', function() {
        var method = 'medium-diesel-car'
        var illegal_str = 'abc'
        var illegal = -12
        cli.parse(`--transportation-method ${method} --distance ${illegal_str}`, (err, argv, output) => {
            expect(err).to.equal(distanceErr)
          });
        cli.parse(`--transportation-method ${method} --distance ${illegal}`, (err, argv, output) => {
            expect(err).to.equal(distanceErr)
          });
    });
    it('Three legal args should output a numeric result.', function() {
        var method = 'medium-diesel-car'
        var dist = 15
        var unit_km = 'km'
        cli.parse(`--transportation-method ${method} --distance ${dist} --unit-of-distance ${unit_km}`, (err, argv, output) => {
            res = calculator(argv)
            expect(typeof res.result).to.equal('number');
        });
    });
});

describe('2. The default value for unit is kilometer km.', function() {
    var method = 'large-petrol-car'
    var dist = 1800.5
    var should_default = car_dic[method]*dist/1000
    it('The default unit for distance should be km.', function() {
        cli.parse(`--transportation-method ${method} --distance ${dist}`, (err, argv, output) => {
            res = calculator(argv)
            expect(res.dist_unit).to.equal('km');
        });
    });
    it(`${method}: ${car_dic[method]}(g/km) with ${dist}(km) should equal to ${should_default.toFixed(1)} kg`, function() {
        cli.parse(`--transportation-method ${method} --distance ${dist}`, (err, argv, output) => {
            res = calculator(argv)
            expect(res.result).to.equal(should_default);
        });
    });
});

describe('3. The output shows the amount of CO2-equivalent in kilogram kg or gram g.', function() {
    const method = 'train'
    const dist = 14500
    const should_m_g = car_dic[method]*dist/1000
    const should_m_kg = car_dic[method]*dist/1e6
    const dist_km = 300
    const unit_kg = 'kg'
    const unit_g = 'g'
    const unit_m = 'm'
    const unit_km = 'km'
    const should_km_kg = car_dic[method]*dist_km/1000
    const should_km_g = car_dic[method]*dist_km
    it(`With given unit of distance 'm' but without output_unit: ${method}: ${car_dic[method]}(g/km) with ${dist}(m) should equal to ${should_m_g.toFixed(1)} g`, function() {
        cli.parse(`--transportation-method ${method} --distance ${dist} --unit-of-distance ${unit_m}`, (err, argv, output) => {
            res = calculator(argv)
            expect(res.result).to.equal(should_m_g);
          });
        });

    
    it(`With given unit of distance 'm' and the output_unit 'kg': ${method}: ${car_dic[method]}(g/km) times ${dist}(m) should equal to ${should_m_kg.toFixed(1)} kg`, function() {
        cli.parse(`--transportation-method ${method} --distance ${dist} --unit-of-distance ${unit_m} --output ${unit_kg}`, (err, argv, output) => {
            res = calculator(argv)
            expect(res.result).to.equal(should_m_kg);
        });
    });
    it(`With given unit of distance 'km' but without output_unit: ${method}: ${car_dic[method]}(g/km) with ${dist_km}(km) should equal to ${should_km_kg.toFixed(1)} kg`, function() {
        cli.parse(`--transportation-method ${method} --distance ${dist_km} --unit-of-distance ${unit_km}`, (err, argv, output) => {
            res = calculator(argv)
            expect(res.result).to.equal(should_km_kg);
            });
    });
    it(`With default unit of distance 'km' and the output_unit 'g': ${method}: ${car_dic[method]}(g/km) with ${dist_km}(km) should equal to ${should_km_g.toFixed(1)} g`, function() {
        cli.parse(`--transportation-method ${method} --distance ${dist_km} --output ${unit_g}`, (err, argv, output) => {
            res = calculator(argv)
            expect(res.result).to.equal(should_km_g);
            });
    });
});

describe('4. Named parameters can be put in any order and either use a space() or equal sign(=) .', function() { 
    var method = 'medium-diesel-car'
    var dis = 15
    var unit_dis = 'm'
    var should= (car_dic[method]*dis/1000)
    it('Named parameters can be put in any order.', function() {
        cli.parse(`--unit-of-distance ${unit_dis} --transportation-method ${method} --distance ${dis}`, (err, argv, output) => {
            res = calculator(argv)
             expect(res.result).to.equal(should);
        });
        cli.parse(`--distance ${dis} --unit-of-distance ${unit_dis} --transportation-method ${method} `, (err, argv, output) => {
            res = calculator(argv)
             expect(res.result).to.equal(should);
        });
    });
    it('Either use a space() or equal sign(=) between key and value', function() {
        cli.parse(`--transportation-method ${method} --distance=${dis}`, (err, argv, output) => {
            res = calculator(argv)
             expect(res.result).to.equal(should);
        });
    });
});
 
