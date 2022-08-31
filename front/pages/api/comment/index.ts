import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import prisma from '../../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      console.log('req.body', req.body);

      const session = await getSession({ req });
      if (!session) {
        return res.status(403).send('세션이 만료되었습니다.');
      }

      await prisma.comment.create({
        data: {
          content: req.body.content,
          post: {
            connect: {
              id: req.body.postId,
            },
          },
          author: {
            connect: {
              email: session?.user?.email,
            },
          },
        },
      });

      res.status(201).send('ok');
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
