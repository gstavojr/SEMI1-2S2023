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