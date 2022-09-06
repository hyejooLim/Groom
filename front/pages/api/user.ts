import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const session = await getSession({ req });
      if (!session) {
        return res.status(403).send('세션이 만료되었습니다.');
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        include: {
          posts: {
            orderBy: [
              {
                createdAt: 'desc',
              },
            ],
            include: {
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
            },
          },
          subscribedPosts: {
            orderBy: [
              {
                createdAt: 'desc',
              },
            ],
            include: {
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
            },
          },
          tempPosts: true,
        },
      });

      res.status(200).json(user);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
