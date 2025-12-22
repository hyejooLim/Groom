import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_BUCKET_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_BUCKET_SECRET_ACCESS_KEY!,
  },
});
