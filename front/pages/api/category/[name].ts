import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const category = await prisma.category.findUnique({
        where: {
          name: String(req.query.name),
        },
        include: {
          posts: {
            orderBy: [
              {
                createdAt: 'desc',
              },
            ],
            include: {
              author: {
                select: {
                  name: true,
                },
              },
              category: true,
            },
          },
        },
      });

      res.status(200).json(category);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
