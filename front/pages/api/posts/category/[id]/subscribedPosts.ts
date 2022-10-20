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

      const posts = await prisma.post.findMany({
        where: {
          subscribers: {
            some: {
              email: session.user?.email,
            },
          },
          categoryId: Number(req.query.id),
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

      res.status(200).json(posts);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;