import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const posts = await prisma.post.findMany({
        where: {
          tags: {
            some: {
              name: String(req.query.name),
            },
          },
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
          category: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      });

      res.status(200).json(posts);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;