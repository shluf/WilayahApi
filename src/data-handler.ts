import data from '../data/wilayah.json';

export interface Wilayah {
  level: number;
  kode: string;
  nama: string;
}

const dataWilayah: Wilayah[] = data as Wilayah[];

export const getProvinsi = () => dataWilayah.filter((d: Wilayah) => d.level === 1);

export const getKabupaten = (kodeProvinsi?: string) => {
  let hasil = dataWilayah.filter((d: Wilayah) => d.level === 2);
  if (kodeProvinsi) {
    hasil = hasil.filter((d: Wilayah) => d.kode.startsWith(kodeProvinsi));
  }
  return hasil;
};

export const getKecamatan = (kodeKabupaten?: string) => {
  let hasil = dataWilayah.filter((d: Wilayah) => d.level === 3);
  if (kodeKabupaten) {
    hasil = hasil.filter((d: Wilayah) => d.kode.startsWith(kodeKabupaten));
  }
  return hasil;
};

export const getKelurahan = (kodeKecamatan?: string) => {
  let hasil = dataWilayah.filter((d: Wilayah) => d.level === 4);
  if (kodeKecamatan) {
    hasil = hasil.filter((d: Wilayah) => d.kode.startsWith(kodeKecamatan));
  }
  return hasil;
};