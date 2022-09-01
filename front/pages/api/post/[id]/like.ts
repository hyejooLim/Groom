import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'PUT') {
      const session = await getSession({ req });
      if (!session) {
        return res.status(403).send('세션이 만료되었습니다.');
      }

      await prisma.post.update({
        where: {
          id: Number(req.query.id),
        },
        data: {
          likers: {
            connect: {
              email: session.user?.email,
            },
          },
        },
      });

      res.status(200).send('ok');
    }

    if (req.method === 'DELETE') {
      const session = await getSession({ req });
      if (!session) {
        return res.status(403).send('세션이 만료되었습니다.');
      }

      await prisma.post.update({
        where: {
          id: Number(req.query.id),
        },
        data: {
          likers: {
            disconnect: {
              email: session.user?.email,
            },
          },
        },
      });

      res.status(200).send('ok');
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
