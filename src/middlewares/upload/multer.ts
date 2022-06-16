import { accessKey, secretKey, spaceEndpoint } from '@/config/upload';
import aws from 'aws-sdk';

const spacesEndpoint: any = new aws.Endpoint(spaceEndpoint);

const multer: any = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});

export default multer;
