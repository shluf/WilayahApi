import { Router, Request, Response } from 'express';
import { getProvinsi, getKabupaten, getKecamatan, getKelurahan } from './data-handler';

const router = Router();

router.get('/provinsi', (req: Request, res: Response) => {
  res.json(getProvinsi());
});

router.get('/kabupaten', (req: Request, res: Response) => {
  const { kode_provinsi } = req.query;
  res.json(getKabupaten(kode_provinsi as string));
});

router.get('/kecamatan', (req: Request, res: Response) => {
  const { kode_kabupaten } = req.query;
  res.json(getKecamatan(kode_kabupaten as string));
});

router.get('/kelurahan', (req: Request, res: Response) => {
  const { kode_kecamatan } = req.query;
  res.json(getKelurahan(kode_kecamatan as string));
});

export default router;