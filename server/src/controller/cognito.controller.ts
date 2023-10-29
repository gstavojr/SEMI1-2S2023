import { 
  AuthenticationDetails, 
  CognitoUser, 
  CognitoUserAttribute, 
  CognitoUserPool 
} from 'amazon-cognito-identity-js';
import { configCognito } from '../config/aws.config';
import { Handler } from 'express';

import crypto from 'crypto';


const coginito = new CognitoUserPool(configCognito);

export const signUp: Handler = async (req, res) => {

  const { email, password, name, carnet, username  } = req.body;

  const attributeList: CognitoUserAttribute[] = []; // Lista de atributos que tiene el usuario

  // * Nombre

  // Tiene informacion del nombre del usuario
  const dataName = {
    Name: 'name', // El nombre de la propiedad
    Value: name // Valor del atributo
  }

  // Agregar el atributo que devuelve cognitoIdentity a la lista
  attributeList.push(new CognitoUserAttribute(dataName));

  // * Email

  const dataEmail = {
    Name: 'email',
    Value: email
  }

  attributeList.push(new CognitoUserAttribute(dataEmail));

  // * Carnet

  const dataCarnet = {
    Name: 'custom:carnet',
    Value: `${carnet}`
  }
  
  attributeList.push(new CognitoUserAttribute(dataCarnet));


  // * Password
  // Se encripta la password
  // Crypto es una libreria de nodejs

  const hash = crypto.createHash('sha256').update(password).digest('hex');
  
  // Se realiza el registro del usuario
  coginito.signUp(
    username, 
    hash + 'D**', 
    attributeList, 
    null!, 
    (err, data) => {
      if ( err ) 
        return res
          .status(500)
          .json({ message: `Error al registrar usuario ${email}`, err });

      return res.status(200).json({ message: 'Usuario registrado', data });
    }
  );

}


export const signIn: Handler = async (req, res) => {

  const { email, password } = req.body;

  // Se encripta la password
  const hash = crypto.createHash('sha256').update(password).digest('hex');

  // usamos el metodo AuthenticationDetails para autenticar al usuario
  // le pasamos el email y la password
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: hash + 'D**'
  });

  // se crea el objeto cognitoUser
  // le pasamos el email y el pool de cognito
  const userData = {
    Username: email,
    Pool    : coginito // Se puede decir que es la conexion a cognito
  }

  // Se realiza la conexion con nuestro usuario de cognito
  const cognitoUser = new CognitoUser(userData);

  // Se autentica el usuario con el metodo authenticateUser
  // le pasamos los datos de autenticacion
  cognitoUser.authenticateUser(authenticationDetails, {
    // Se ejecuta cuando se autentica correctamente
    // data es la informacion del usuario que esta en cognito, tambien devuelve los tokens
    onSuccess: (data) => {
      return res.status(200).json({ message: 'Usuario autenticado', data });
    },
    // Se ejecuta cuando hay un error
    // err es el error que devuelve cognitos
    onFailure: (err) => {
      return res.status(500).json({ message: 'Error al autenticar usuario', err });
    },
    // Se ejecuta cuando se necesita cambiar la password
    newPasswordRequired: (userAttributes, requiredAttributes) => {
      return res
        .status(200)
        .json({ message: 'Usuario autenticado', userAttributes, requiredAttributes });
    }
  });



};


interface ResponseUpdateProfile {
  err    : any;
  message: string;
  status : number;
};

export const updateProfile = (
  name: string,
  cognitoUser: CognitoUser
): Promise<ResponseUpdateProfile> => {

  const attributeList: CognitoUserAttribute[] = []; // Lista de atributos

  // Definir atributo actualizar
  attributeList.push(
    new CognitoUserAttribute({
      Name: 'name', // El nombre de la propiedad
      Value: name // Nuevo valor del atributo
    })
  );

  const promise: Promise<ResponseUpdateProfile> = new Promise( ( resolve, reject ) => {

    cognitoUser.updateAttributes( attributeList, ( err, result ) => {

      if ( result === 'SUCCESS' ) {
        resolve({ status: 200, message: 'Usuario actualizado', err: null });
        return;
      }

      reject({ status: 500, message: 'Error al actualizar el usuario', err });
    });
    
  });

  return promise;
};


export const updateProfileAuthenticated: Handler = async (req, res) => {

  const { email, password, name } = req.body;

  const hash = crypto.createHash('sha256').update(password).digest('hex');

  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: hash + 'D**'
  });

  const userData = {
    Username: email,
    Pool: coginito // Se puede decir que es la conexion a cognito
  }

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {

    onSuccess: async ( data ) => {

      const respUpdate = await updateProfile(name, cognitoUser);
      return res.status(respUpdate.status).json({ ...respUpdate });

    },

    onFailure: ( err ) => {

      return res.status(500).json({ message: 'Error al autenticar usuario', err });

    },

    newPasswordRequired: ( userAttributes, requiredAttributes ) => {
      return res
        .status(200)
        .json({ message: 'Usuario autenticado', userAttributes, requiredAttributes });
    }
  });



};