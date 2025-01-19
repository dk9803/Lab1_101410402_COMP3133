const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

// Delete files if they exist
if (fs.existsSync(canadaFile)) fs.unlinkSync(canadaFile);
if (fs.existsSync(usaFile)) fs.unlinkSync(usaFile);

// Read and process the CSV file
fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    const { country, year, population } = row;
    const dataLine = `${country},${year},${population}\n`;

    if (country.toLowerCase() === 'canada') {
      fs.appendFileSync(canadaFile, dataLine);
    } else if (country.toLowerCase() === 'united states') {
      fs.appendFileSync(usaFile, dataLine);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed!');
  });
