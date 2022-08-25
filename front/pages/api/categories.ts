import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const categories = await prisma.category.findMany({
        include: {
          posts: true,
        },
      });

      res.status(200).json(categories);
    }
  } catch (err) {
    console.error(err);
  }
};
export default handler;
