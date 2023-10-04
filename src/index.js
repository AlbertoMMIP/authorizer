const file = require('./utils/file');
const process = require('./process');
const test = require('./test');

const { argv, exit } = require('process');

const main = async () => {
  const filePath = argv[2]
  if (!filePath) {
    test.init();
    exit();
  }
  try {
    const inputs = await file.parseFileToArray(filePath);
    const outputs = process.init(inputs);
    console.log('# OUTPUT');
    outputs && outputs.forEach(output => {
      console.log(JSON.stringify(output, null, 0));
    });
  } catch (error) {
    console.error(error);
  }
  exit();
}

main();