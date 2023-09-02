import { Sequelize } from "sequelize";
import { DB_CONFIG } from '../config/db.config';


const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = DB_CONFIG;

export const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host   : DB_HOST,
  dialect: 'mysql',
  define: {
    freezeTableName: true, // Para mostrar cada consulta que se ejecuta
    timestamps     : false
  }
});
