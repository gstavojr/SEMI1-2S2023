import { Handler } from 'express'
import { configRekognition } from '../config/aws.config'

import aws from 'aws-sdk';

const rekognition = new aws.Rekognition(configRekognition);

// ANALIZAR EMOCIONES DE LA CARA
export const detectFaces: Handler = async ( req, res ) => {

  const { image } = req.body;

  if ( !image ) return res.status(400).json({ msg: 'No se ha enviado ninguna imagen' });


  const params = {
    // S3Object: {
    //   Bucket: 'bucket-name',
    //   Name  : 'image-name' // Ejemplo: fotos/mi-foto.jpg
    // },
    Image: {
      Bytes: Buffer.from(image, 'base64')
    },
    Attributes: [ 'ALL' ] // Muestra todos los atributso de la cara
  };

  try {
    const respRekog = await rekognition.detectFaces(params).promise();

    return res.json({ msg: 'Analisis de la imagen', data: respRekog });
    
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Error al analizar la imagen', error: JSON.stringify(error) });
  }

  
};



// ? Analizar texto
export const detectText: Handler = async (req, res) => {

  const { image } = req.body;

  if ( !image ) {
    return res.status(400).json({ message: 'Falta la foto' });
  }

  const params = {
    // S3Object: {
    //   Bucket: 'nombreBucket',
    //   Name: 'rutaDeLaImagen' // ejemplo: fotos/miImagen.jpg
    // },
    Image: {
      Bytes: Buffer.from(image, 'base64')
    },
  }


  try {
    const respRekog = await rekognition.detectText(params).promise();

    return res.json({ msg: 'Analisis de la imagen', data: respRekog.TextDetections });
    
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Error al analizar la imagen', error: JSON.stringify(error) });
  }


}


// ? Analizar famosos
export const recognizeCelebrities: Handler = async (req, res) => {

  const { image } = req.body;

  if ( !image ) {
    return res.status(400).json({ message: 'Falta la foto' });
  }

  const params = {
    // S3Object: {
    //   Bucket: 'nombreBucket',
    //   Name: 'rutaDeLaImagen' // ejemplo: fotos/miImagen.jpg
    // },
    Image: {
      Bytes: Buffer.from(image, 'base64')
    },
  }


  try {
    const respRekog = await rekognition.recognizeCelebrities(params).promise();

    return res.json({ msg: 'Analisis de la imagen', data: respRekog.CelebrityFaces });
    
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Error al analizar la imagen', error: JSON.stringify(error) });
  }


}

// ? Obtener Etiquetas
export const detectLabels: Handler = async (req, res) => {

  const { image } = req.body;

  if ( !image ) {
    return res.status(400).json({ message: 'Falta la foto' });
  }

  const params = {
    // S3Object: {
    //   Bucket: 'nombreBucket',
    //   Name: 'rutaDeLaImagen' // ejemplo: fotos/miImagen.jpg
    // },
    Image: {
      Bytes: Buffer.from(image, 'base64')
    },
    MaxLabels: 123
  }


  try {
    const respRekog = await rekognition.detectLabels(params).promise();

    return res.json({ msg: 'Analisis de la imagen', data: respRekog.Labels });
    
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Error al analizar la imagen', error: JSON.stringify(error) });
  }


}


// ? Comparar fotos
export const compareFaces: Handler = async (req, res) => {

  const { image1, image2, similitud } = req.body;

  if ( !image1 || !image2 || !similitud ) {
    return res.status(400).json({ message: 'Falta la foto' });
  }

  console.log(req.body.similitud)

  const params = {
    // Esta es la imagne que se va guardar 
    SourceImage: {
      Bytes: Buffer.from(image1, 'base64')
    },
    // Esta es la imagne que se va comparar 
    TargetImage: {
      Bytes: Buffer.from(image2, 'base64')
    },

    SimilarityThreshold: similitud, // Es el %  de comparacion || % de similitud

  }

  try {
    const respRekog = await rekognition.compareFaces(params).promise();

    return res.json({ msg: 'Analisis de la imagen', data: respRekog.FaceMatches });
    
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Error al analizar la imagen', error: JSON.stringify(error) });
  }


}