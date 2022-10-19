import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const posts = await prisma.post.findMany({
        where: {
          isPublic: true,
          createdAt: {
            lte: new Date(),
          },
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        include: {
          comments: true,
          tags: {
            select: {
              name: true,
            },
          },
          category: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      });

      return res.status(200).json(posts);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
