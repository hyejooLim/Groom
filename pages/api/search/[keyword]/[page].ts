import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { PAGE_SIZE } from '../../../../recoil/main';

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

      const { page } = req.query;
      let postsByPage = [];

      if (Number(page) > 0) {
        postsByPage = posts.slice((Number(page) - 1) * PAGE_SIZE, Number(page) * PAGE_SIZE);
      } else {
        postsByPage = posts.slice(0, PAGE_SIZE);
      }

      res.status(200).json(postsByPage);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;