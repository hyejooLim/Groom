import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const session = await getSession({ req });
      const keyword = req.query.keyword as string;

      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        include: {
          neighbors: {
            where: {
              OR: [
                {
                  name: {
                    contains: keyword,
                  },
                },
                {
                  email: {
                    contains: keyword,
                  },
                },
              ],
            },
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
