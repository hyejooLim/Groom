import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const tags = await prisma.tag.findMany({
        include: {
          posts: {
            include: {
              category: true,
              author: {
                select: {
                  name: true,
                },
              },
            },
            orderBy: [
              {
                createdAt: 'desc',
              },
            ],
          },
        },
      });

      res.status(200).json(tags);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
