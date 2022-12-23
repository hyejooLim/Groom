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
          email: session.user?.email,
        },
        include: {
          receivedPosts: {
            include: {
              sender: {
                select: {
                  name: true,
                  imageUrl: true,
                  password: false,
                },
              },
              receiver: {
                select: {
                  name: true,
                  imageUrl: true,
                  password: false,
                },
              },
              post: {
                include: {
                  author: {
                    select: {
                      name: true,
                    },
                  },
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      res.status(200).json(user.receivedPosts);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
