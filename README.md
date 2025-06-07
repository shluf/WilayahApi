# API Wilayah Indonesia 2023

API untuk mendapatkan data wilayah administrasi Indonesia (Provinsi, Kabupaten/Kota, Kecamatan, dan Kelurahan/Desa) berdasarkan data dari bps tahun 2023.

## Endpoints

API ini menyediakan beberapa endpoint untuk mengakses data wilayah:

- `GET /api/provinsi`: Mengembalikan daftar semua provinsi.
- `GET /api/kabupaten`: Mengembalikan daftar semua kabupaten/kota.
- `GET /api/kecamatan`: Mengembalikan daftar semua kecamatan.
- `GET /api/kelurahan`: Mengembalikan daftar semua kelurahan/desa.

### Query Parameters

Hasil dapat difilter dengan menggunakan query parameter berikut:

- **Kabupaten/Kota berdasarkan Provinsi:**
  `GET /api/kabupaten?kode_provinsi=<kode_provinsi>`
  Contoh: `GET /api/kabupaten?kode_provinsi=11`

- **Kecamatan berdasarkan Kabupaten/Kota:**
  `GET /api/kecamatan?kode_kabupaten=<kode_kabupaten>`
  Contoh: `GET /api/kecamatan?kode_kabupaten=1101`

- **Kelurahan/Desa berdasarkan Kecamatan:**
  `GET /api/kelurahan?kode_kecamatan=<kode_kecamatan>`
  Contoh: `GET /api/kelurahan?kode_kecamatan=110101`

## Instalasi dan Menjalankan Proyek

1.  **Clone repository:**
    ```bash
    git clone https://github.com/shluf/WilayahApi
    cd WilayahApi
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```

Server akan berjalan di `http://localhost:3001`. 