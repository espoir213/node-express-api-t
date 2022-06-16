import { ACCESS_KEY, SECRET_KEY, BUCKET_NAME, SPACE_ENDPOINT } from '@config';

const accessKey: string | undefined = ACCESS_KEY;
const secretKey: string | undefined = SECRET_KEY;
const bucketName: string = BUCKET_NAME || '';
const spaceEndpoint: string = SPACE_ENDPOINT || '';

export { accessKey, secretKey, bucketName, spaceEndpoint };
