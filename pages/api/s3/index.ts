import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../../../lib/s3';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const bucket = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_REGION;

  try {
    const { fileName, fileType } = req.body;
    if (!fileName || !fileType) {
      return res.status(400).json({ message: 'fileName and fileType required' });
    }

    const key = `profile/${Date.now()}-${fileName}`;

    if (req.method === 'POST') {
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
      const { key } = req.body;
      if (!key) {
        return res.status(400).json({ message: 'key is required' });
      }

      await s3.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: key,
        }),
      );

      return res.status(200).json({ success: true });
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
