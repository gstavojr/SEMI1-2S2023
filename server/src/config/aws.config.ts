import { AwsConfig, DynamoConfig } from '../interfaces/aws.interface';


export const cofigS3: AwsConfig = {
  region         : process.env.AWS_REGION as string,
  accessKeyId    : process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
};

export const configDynamoDB: DynamoConfig = {
  apiVersion     : '2012-08-10',
  region         : process.env.AWS_REGION as string,
  accessKeyId    : process.env.AWS_ACCESS_KEY_ID_DYNAMO as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_DYNAMO as string
}

export const configRekognition: AwsConfig = {
  region         : process.env.AWS_REGION as string,
  accessKeyId    : process.env.AWS_ACCESS_KEY_ID_REKOGNITION as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_REKOGNITION as string
};

export const configTranslate: AwsConfig = {
  region         : process.env.AWS_REGION as string,
  accessKeyId    : process.env.AWS_ACCESS_KEY_ID_TRANSLATE as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_TRANSLATE as string
};

export const configCognito = {
  UserPoolId: process.env.AWS_USER_POOL_ID as string,
  ClientId: process.env.AWS_CLIENTE_ID as string,
}
