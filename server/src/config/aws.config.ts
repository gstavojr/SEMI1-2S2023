import { AwsConfig } from '../interfaces/aws.interface';


export const cofigS3: AwsConfig = {
  region         : process.env.AWS_REGION as string,
  accessKeyId    : process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
};