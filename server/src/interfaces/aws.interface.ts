export interface AwsConfig {
  region         : string;
  accessKeyId    : string;
  secretAccessKey: string;
};


export interface S3Params {
  Bucket     : string;
  Key        : string;
  Body       : Buffer;
  ContentType: 'image' | 'audio/mp3' | 'video/mp4' | 'audio/mpeg';
}

export interface S3ParamsGetFile {
  Bucket: string;
  Key   : string;
}


export interface DynamoConfig extends AwsConfig {
  apiVersion: string;
}