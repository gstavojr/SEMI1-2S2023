import { Handler } from 'express';
import { cofigS3 as configAWSS3, configDynamoDB } from '../config/aws.config';
import { S3Params } from '../interfaces/aws.interface';
import { v4 as uuidv4 } from 'uuid';

import aws from 'aws-sdk';


const s3 = new aws.S3(configAWSS3);
const dynamoDB = new aws.DynamoDB(configDynamoDB);

export const uploadAndSaveDynamo: Handler = async (req, res) => {

  const { namePhoto, photo } = req.body;

  if ( !namePhoto || !photo ) {
    return res.status(400).json({ message: 'Falta el nombre o la foto' });
  }

  const urlImage = `fotos/${namePhoto}.jpg`;
  const bufferImage = Buffer.from(photo, 'base64');

  const params: S3Params = {
    Bucket     : process.env.AWS_BUCKET_NAME as string,
    Key        : urlImage,
    Body       : bufferImage,
    ContentType: 'image'
  };


  try {

    const s3Resp = await s3.upload(params).promise();

    console.log(s3Resp.Location);

    // El objeto que se va a guardar en la base de datos de dynamo
    // Como es vase de datos no relacional se puede guardar cualquier tipo de dato
    await dynamoDB.putItem({
      TableName: process.env.AWS_DYNAMO_DB_TABLE_NAME as string,
      Item: {
        id      : { S: uuidv4() }, // Identificador unico que se definio a la hora de crear la tabla 
        name    : { S: namePhoto },
        location: { S: s3Resp.Location }
      }
    }).promise()


    return res.status(200).json({ message: 'Se agrego la imagen exitosamente' }); 

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error en la subida de imagen', error });
  }


};