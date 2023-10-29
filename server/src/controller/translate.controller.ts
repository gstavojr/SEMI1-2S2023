import { Handler } from 'express';
import { configTranslate } from '../config/aws.config';

import aws from 'aws-sdk';

const translate = new aws.Translate(configTranslate);

export const getTranslateText: Handler = async (req, res) => {

  const { text } = req.body;

  if ( !text ) return res.status(400).json({ message: 'Falta el texto a traducir' });

  const params = {
    SourceLanguageCode: 'auto',   // Reconoce cualquier idioma 
    TargetLanguageCode: 'es',     // el lenguaje al que queremos traducir
    Text              : text      // El texto a traducir
  }

  
  translate.translateText(params, ( err, data ) => {

    if ( err ) 
      return res.status(500).json({ message: 'Error en la traduccion', err });

    return res.status(200).json({ message: 'Traduccion exitosa', data }); 
  })
}