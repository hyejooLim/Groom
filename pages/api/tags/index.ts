import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const tags = await prisma.tag.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          id: 'asc',
        },
      });

      return res.status(200).json(tags);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
