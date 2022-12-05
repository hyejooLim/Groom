import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const session = await getSession({ req });
      if (!session) {
        return res.status(403).send({ message: '세션이 만료되었습니다.' });
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
              comments: {
                select: {
                  id: true,
                },
              },
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
              likers: {
                select: {
                  id: true,
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

      if (!user) {
        return res.status(403).send({ message: '다시 로그인 해주세요.' });
      }

      res.status(200).json(user);
    }

    if (req.method === 'PUT') {
      const session = await getSession({ req });
      if (!session) {
        return res.status(403).send({ message: '세션이 만료되었습니다.' });
      }

      await prisma.user.update({
        where: {
          email: session.user?.email,
        },
        data: {
          imageUrl: req.body?.imageUrl,
        },
      });

      res.status(200).json('ok');
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
