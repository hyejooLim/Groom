import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../../../lib/s3';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const bucket = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_REGION;

  try {
    if (req.method === 'POST') {
      const { fileName } = req.body;
      if (!fileName) {
        return res.status(400).json({ message: 'fileName is required' });
      }

      const key = `profile/${Date.now()}-${fileName}`;
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      const uploadUrl = await getSignedUrl(s3, command, {
        expiresIn: 60,
      });
      const imageUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

      return res.status(200).json({
        key,
        uploadUrl,
        imageUrl,
      });
    }

    if (req.method === 'DELETE') {
      const { key } = req.query;
      if (!key || typeof key !== 'string') {
        return res.status(400).json({ message: 'key is required' });
      }

      await s3.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: key,
        }),
      );

      return res.status(200).json('ok');
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
