import { Router, Request, Response, NextFunction } from 'express';
import { getProvinsi, getKabupaten, getKecamatan, getKelurahan, muatData, isDataLoaded } from './data-handler';

const router = Router();

const ensureDataLoaded = async (_req: Request, _res: Response, next: NextFunction) => {
  if (isDataLoaded()) {
    return next();
  }
  try {
    await muatData();
    next();
  } catch (error) {
    next(error);
  }
};

router.use(ensureDataLoaded);

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