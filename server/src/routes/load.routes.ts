import { Router } from 'express';
import { download, uploadImage, uploadMp3 } from '../controller/load.controller';
import { uploadAndSaveDynamo } from '../controller/dynamo.controller';
import { getData, getData2, saveData } from '../controller/rds.controller';
import { getTranslateText } from '../controller/translate.controller';

import * as rk from '../controller/rekognition.controller'

import multer from 'multer';
import { signIn, signUp, updateProfile, updateProfileAuthenticated } from '../controller/cognito.controller';

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


// Rekognition

router.post('/detectar-cara', rk.detectFaces)
router.post('/detectar-texto', rk.detectText);
router.post('/detectar-famoso', rk.recognizeCelebrities);
router.post('/detectar-etiqueta', rk.detectLabels);
router.post('/comparar-fotos', rk.compareFaces);


// Translate
router.post('/translate', getTranslateText);

// Cognito
router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/updateProfile', updateProfileAuthenticated);

export default router;
