import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export interface Wilayah {
  level: number;
  kode: string;
  nama: string;
}

const dataWilayah: Wilayah[] = [];
const csvFilePath = path.join(__dirname, 'data', 'kode_wilayah_2023_v230711.csv');

export const muatData = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (dataWilayah.length > 0) {
        return resolve();
    }
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
        console.log('Data wilayah dari CSV berhasil dimuat.');
        resolve();
      })
      .on('error', (error) => {
        console.error('Gagal memuat data CSV:', error);
        reject(error);
      });
  });
};

export const getProvinsi = () => dataWilayah.filter(d => d.level === 1);

export const getKabupaten = (kodeProvinsi?: string) => {
  let hasil = dataWilayah.filter(d => d.level === 2);
  if (kodeProvinsi) {
    hasil = hasil.filter(d => d.kode.startsWith(kodeProvinsi));
  }
  return hasil;
};

export const getKecamatan = (kodeKabupaten?: string) => {
  let hasil = dataWilayah.filter(d => d.level === 3);
  if (kodeKabupaten) {
    hasil = hasil.filter(d => d.kode.startsWith(kodeKabupaten));
  }
  return hasil;
};

export const getKelurahan = (kodeKecamatan?: string) => {
  let hasil = dataWilayah.filter(d => d.level === 4);
  if (kodeKecamatan) {
    hasil = hasil.filter(d => d.kode.startsWith(kodeKecamatan));
  }
  return hasil;
};