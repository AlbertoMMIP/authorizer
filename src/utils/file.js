const fs = require('fs');

module.exports = {
  parseFileToArray (path = 'src/resources/input/operations') {
    const array = new Promise((resolve, reject) => {
      fs.readFile(path, async (error, data) => {
        if (error) {
          reject(`Error to read file => ${error.message}`);
        }
        const parseData = data.toString();
        const arrayInputs = parseData.split('\n')
        resolve(arrayInputs)
      })
    });

    return array;
  }
}