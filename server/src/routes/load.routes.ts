import { Router } from 'express';
import { download, uploadImage, uploadMp3 } from '../controller/load.controller';

import multer from 'multer';

const router = Router();
const upload = multer();

router.post('/upload', uploadImage);
router.post('/download', download);
router.post('/uploadMusic/:nameMp3', upload.single('track') ,uploadMp3);

export default router;
