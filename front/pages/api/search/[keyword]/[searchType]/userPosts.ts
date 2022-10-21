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

      if (searchType === 'title') {
        posts = await prisma.post.findMany({
          where: {
            title: {
              contains: keyword,
            },
            author: {
              email: session.user?.email,
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
      } else if (searchType === 'content') {
        posts = await prisma.post.findMany({
          where: {
            content: {
              contains: keyword,
            },
            author: {
              email: session.user?.email,
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
      } else if (searchType === 'tag') {
        posts = await prisma.post.findMany({
          where: {
            tags: {
              some: {
                name: keyword,
              },
            },
            author: {
              email: session.user?.email,
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
