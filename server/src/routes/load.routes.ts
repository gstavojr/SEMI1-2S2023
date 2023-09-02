import { Router } from 'express';
import { download, uploadImage, uploadMp3 } from '../controller/load.controller';
import { uploadAndSaveDynamo } from '../controller/dynamo.controller';

import multer from 'multer';
import { getData, getData2, saveData } from '../controller/rds.controller';

const router = Router();
const upload = multer();

router.post('/upload', uploadImage);
router.post('/download', download);
router.post('/uploadMusic/:nameMp3', upload.single('track') ,uploadMp3);

router.post('/uploadAndSaveDynamo', uploadAndSaveDynamo);


// RDS
router.get('/getData', getData);
router.get('/getData2', getData2);

router.post('/saveData', saveData);


export default router;
