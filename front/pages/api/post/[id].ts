import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const post = await prisma.post.findUnique({
        where: {
          id: Number(req.query.id),
        },
        include: {
          tags: true,
          comments: true,
          category: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      });

      res.status(200).json(post);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
