import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      await prisma.sharedPost.delete({
        where: {
          id: Number(req.query.id),
        },
      });

      res.status(200).send('ok');
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
