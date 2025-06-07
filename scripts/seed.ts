import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

interface Wilayah {
  level: number;
  kode: string;
  nama: string;
}

const csvFilePath = path.join(__dirname, '..', 'data', 'kode_wilayah_2023_v230711.csv');
const jsonFilePath = path.join(__dirname, '..', 'data', 'wilayah.json');
const dataWilayah: Wilayah[] = [];

console.log('🌱 Starting data seeding...');
console.log(`Reading from: ${csvFilePath}`);

fs.createReadStream(csvFilePath)
  .pipe(csv({ separator: ',', mapHeaders: ({ header }) => header.toLowerCase() }))
  .on('data', (row) => {
    const level = parseInt(row['level'], 10);
    const kode = row['code'];
    const nama = row['name'];
    
    if (kode && nama && !isNaN(level)) {
      dataWilayah.push({ level, kode, nama });
    }
  })
  .on('end', () => {
    try {
      fs.writeFileSync(jsonFilePath, JSON.stringify(dataWilayah, null, 2));
      console.log('✅ Data seeding successful!');
      console.log(`JSON data written to: ${jsonFilePath}`);
      console.log(`${dataWilayah.length} records processed.`);
    } catch (error) {
      console.error('❌ Error writing JSON file:', error);
    }
  })
  .on('error', (error) => {
    console.error('❌ Error reading CSV file:', error);
  }); 