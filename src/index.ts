import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { muatData } from './data-handler';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (_req: Request, res: Response) => {
  res.send(
    '<h1>API Wilayah Indonesia 2023 v230711</h1>\n\n' +
    '<h2>Endpoint:</h2>\n' +
    '<ul>\n' +
    '<li>/api/provinsi</li>\n' +
    '<li>/api/kabupaten</li>\n' +
    '<li>/api/kecamatan</li>\n' +
    '<li>/api/kelurahan</li>\n' +
    '</ul>\n\n' +
    '<h2>With Query:</h2>\n' +
    '<ul>\n' +
    '<li>GET /api/provinsi</li>\n' +
    '<li>GET /api/kabupaten?kode_provinsi=11</li>\n' +
    '<li>GET /api/kecamatan?kode_kabupaten=1101</li>\n' +
    '<li>GET /api/kelurahan?kode_kecamatan=110101</li>\n' +
    '</ul>'
  );
});

if (process.env.NODE_ENV !== 'test') {
  muatData()
    .then(() => {
      if (!process.env.VERCEL_ENV) {
        app.listen(PORT, () => {
          console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
        });
      }
    })
    .catch(error => {
      console.error('❌ Gagal menjalankan server:', error);
      process.exit(1);
    });
}

export default app;