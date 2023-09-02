import { Handler } from 'express';
import { db } from '../database/db';
import { Ejemplo } from '../models/ejemplo';

export const getData: Handler = async (req, res) => {
  try {
    const query = `SELECT * FROM Ejemplo`;

    const queryResp = await db.query(query);

    const data = queryResp[0];
    return res.status(200).json({ message: 'Succes', data });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};


export const saveData: Handler = async (req, res) => {

  const { name, location } = req.body;

  try {
    const query = `INSERT INTO Ejemplo(name, location) 
      VALUES (:name, :location);`;

    await db.query(query, {
      replacements: {
        name,
        location
      }
    });

    return res.status(200).json({ message: 'Exitoso' });
    
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }


}


export const getData2: Handler = async (req, res) => {

  try {
    const ejemplos = await Ejemplo.findAll();
    const ejemplo1 = await Ejemplo.findOne({ where: { id: 1 } });
    console.log({ ejemplo1 })
    return res.status(200).json({ message: 'Succes', ejemplos });
    
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
    

};