import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import { PAGE_SIZE } from '../../../../../recoil/main';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const posts = await prisma.post.findMany({
        where: {
          category: {
            name: String(req.query.name),
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
      let postsByPage = posts.slice((Number(page) - 1) * PAGE_SIZE, Number(page) * PAGE_SIZE);

      res.status(200).json(postsByPage);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
