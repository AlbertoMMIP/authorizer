const dataTest = require('./../resources/input/test.json');
const process = require('./../process')

module.exports = {
  init () {
    for (let test in dataTest) {
      console.log(`*************${test}*****************`);
      console.log('# INPUT');
      const inputs = dataTest[test];
      inputs && inputs.forEach(input => {
        console.log(JSON.stringify(input, null, 0));
      });
      const outputs = process.init(inputs);
      console.log('# OUTPUT');
      outputs && outputs.forEach(output => {
        console.log(JSON.stringify(output, null, 0));
      });
    }
  }
}