import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import prisma from '../../../../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const session = await getSession({ req });
      if (!session) {
        return res.status(403).send('세션이 만료되었습니다.');
      }

      let posts = [];
      const keyword = req.query.keyword as string;
      const searchType = req.query.searchType as string;

      if (searchType === 'TITLE') {
        posts = await prisma.post.findMany({
          where: {
            subscribers: {
              some: {
                email: session.user?.email,
              },
            },
            title: {
              contains: keyword,
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
      } else if (searchType === 'CONTENT') {
        posts = await prisma.post.findMany({
          where: {
            subscribers: {
              some: {
                email: session.user?.email,
              },
            },
            content: {
              contains: keyword,
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
      } else if (searchType === 'TAG') {
        posts = await prisma.post.findMany({
          where: {
            subscribers: {
              some: {
                email: session.user?.email,
              },
            },
            tags: {
              some: {
                name: keyword,
              },
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
      }

      res.status(200).json(posts);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
