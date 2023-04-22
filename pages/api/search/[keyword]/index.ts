import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const keyword = req.query.keyword as string;

      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: keyword,
              },
            },
            {
              content: {
                contains: keyword,
              },
            },
            {
              category: {
                name: {
                  contains: keyword,
                },
              },
            },
            {
              author: {
                name: {
                  contains: keyword,
                },
              },
            },
            {
              tags: {
                some: {
                  name: keyword,
                },
              },
            },
          ],
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
        select: {
          id: true,
          title: true,
          category: {
            select: {
              name: true,
            },
          },
          author: {
            select: {
              name: true,
            },
          },
          createdAt: true,
        },
      });

      res.status(200).json(posts);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
