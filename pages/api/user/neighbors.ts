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
          neighbors: {
            select: {
              id: true,
              name: true,
              email: true,
              imageUrl: true,
              posts: {
                select: { id: true },
              },
              neighbors: {
                select: { id: true },
              },
            },
            orderBy: [
              {
                name: 'asc',
              },
            ],
          },
        },
      });

      res.status(200).json(user.neighbors);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
