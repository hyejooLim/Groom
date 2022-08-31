import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'PUT') {
      await prisma.comment.update({
        where: {
          id: req.body.id,
        },
        data: {
          content: req.body.content,
        },
      });

      res.status(200).send('ok');
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
