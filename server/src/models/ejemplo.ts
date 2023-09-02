import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../database/db';


interface EjemploAttributes {
  id      : number;
  name    : string;
  location: string;
}

// Aqui se indica que el id es opcional, por que lo maneja la db
interface EjemploCreationAttributes extends Optional<EjemploAttributes, 'id'> {}

// Se crea el model y se extiende sus atributos
interface EjemploInstance
  extends Model<EjemploAttributes, EjemploCreationAttributes>,
    EjemploAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }


// Se define el modelo

export const Ejemplo = db.define<EjemploInstance>('Ejemplo', {
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
});
