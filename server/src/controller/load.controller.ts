import { Handler } from 'express';
import { cofigS3 } from '../config/aws.config';
import aws from 'aws-sdk';
import { S3Params, S3ParamsGetFile } from '../interfaces/aws.interface';

import multer from 'multer';

aws.config.update(cofigS3);
const s3 = new aws.S3();


export const uploadImage: Handler = (req, res) => {

  const { namePhoto, photo } = req.body;

  if ( !namePhoto || !photo ) return res.status(400).json({message: 'Falta parametros'});

  // * El id es el nombre de la imagen y tiene que ser unico si no va sobre escribir el existente

  // Indicar el nombre y la url de la imagen
  // Carpeta y nombre
  // Esta url es la que se va a guardar en la base de datos
  const urlImage = `fotos/${namePhoto}.jpg`;

  // Convertir la imagen de base 64 a un buffer
  const bufferImage = Buffer.from(photo, 'base64');

  // Configurar el bucket
  // Agregar la region del bucket y las credenciales
  // Nuncaca subir las credenciales a github o gitlab
  // Posiblemete les pueden bloquear la cuenta por exponer las credenciales en un repositorio publico

  

  // Crear una variable que contiene el servicio y caracteristicas de un s3
  
  // Crear un objeto con las caracteristicas de la imagen
  const params: S3Params = {
    Bucket     : process.env.AWS_BUCKET_NAME as string,
    Key        : urlImage,
    Body       : bufferImage,
    ContentType: 'image'
  };

  // Subir la imagen

  s3.upload(params, ( err: Error, data: aws.S3.ManagedUpload.SendData ) => {
    if ( err ) 
      return res.status(500).json({ message: 'Error al subir la imagen', error: err });

    return res.status(200).json({ message: 'Imagen subida', data });
  });






};

export const download: Handler = (req, res) => {

  const { namePhoto } = req.body;

  const urlImage = `fotos/${namePhoto}.jpg`;


  // Se crea una valirable que contiene el servicio o caracteristicas S3
  const paramsGetFileS3: S3ParamsGetFile = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key   : urlImage
  };

  s3.getObject(paramsGetFileS3, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    // ustedes verifica ya en la base de datos que si exista la imagen

    // Parser la imagen a base64
    const image = Buffer.from(data.Body as Buffer).toString('base64');
    return res.status(200).json({ message: 'Se descargo la imagen exitosamente', image });  
  });

};


export const uploadMp3: Handler = (req, res) => {

  const { nameMp3 } = req.params;

  // const storage = multer.memoryStorage();
  // const upload = multer({ 
  //     storage, 
  //     limits: { 
  //       fields: 1, // Campos adicionales
  //       fieldSize: 10 * 1024 * 1024, // tamano de archivo en bytes
  //       files: 1, // Numero de archivos que se pueden subir
  //       parts: 2, // Tipos de campo
  //     } 
  // });

  // upload.single('')

  const { file: mp3 } = req;


  if ( !nameMp3 || !mp3 ) return res.status(400).json({message: 'Falta parametros'});


  const bufferMp3 = mp3.buffer as Buffer;
  const urlMp3 = `music/${nameMp3}.mp3`;

  const params: S3Params = {
    Bucket     : process.env.AWS_BUCKET_NAME as string,
    Key        : urlMp3,
    Body       : bufferMp3,
    ContentType: 'audio/mpeg'
  }

  s3.upload(params, ( err: Error, data: aws.S3.ManagedUpload.SendData ) => {
    if ( err ) 
      return res.status(500).json({ message: 'Error al subir el audio', error: err });

    return res.status(200).json({ message: 'Audio subido', data });
  });


};