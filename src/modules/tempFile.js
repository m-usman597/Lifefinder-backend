
const fs = require('fs');
const path = require("path");

const filePathTemp = path.join(process.cwd(), 'src', 'temp.json');
// console.log('filePath: ', filePath);

// Function to write data to temp.json file
const createTempFile = (data, filePath) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath||filePathTemp, JSON.stringify(data), (err) => {
        if (err) {
          reject('Error writing file: ' + err);
        } else {
          resolve('File has been written successfully');
        }
      });
    });
  };
  
  // Function to read data from temp.json file
  const readTempFile = (filePath) => {
    return new Promise((resolve, reject) => {
      fs.access(filePath||filePathTemp, fs.constants.F_OK, (err) => {
        if (err) {
          resolve([]);
        } else {
          fs.readFile(filePath||filePathTemp, 'utf8', (err, data) => {
            if (err) {
              reject('Error reading file: ' + err);
            } else {
              resolve(JSON.parse(data));
            }
          });
        }
      });
    });
  };
  
  // Function to update data in temp.json file
  const updateTempFile = (newData, filePath) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await readTempFile(filePath);
        console.log('data inside updateTempFile(): ', data, typeof(data), data?.length); //comment it
        const updatedData = [...data, newData];
        await createTempFile(updatedData, filePath);
        resolve('File has been updated successfully');
      } catch (err) {
        reject('Error updating file: ' + err);
      }
    });
  };
  
  const overwriteTempFile = (newData, filePath) => {
    return new Promise(async (resolve, reject) => {
      try {
        await createTempFile(newData, filePath);
        resolve('File has been updated successfully');
      } catch (err) {
        reject('Error updating file: ' + err);
      }
    });
  };

module.exports = {
    createTempFile,
    readTempFile,
    updateTempFile,
    overwriteTempFile
}