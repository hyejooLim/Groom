import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('postData', req.body);

    if (req.method === 'POST') {
      const session = await getSession({ req });
      if (!session) {
        return res.status(403).send('세션이 만료되었습니다.');
      }

      await Promise.all(
        req.body.tags?.map((tag) =>
          prisma.tag.upsert({
            where: { name: tag.name },
            update: {},
            create: {
              name: tag.name,
            },
          })
        )
      );

      const post = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          HTMLcontent: req.body.HTMLcontent,
          tags: {
            connect: req.body.tags,
          },
          category: {
            connect: {
              id: req.body.category.id,
            },
          },
          author: {
            connect: {
              email: session?.user?.email,
            },
          },
        },
      });

      res.status(201).json(post);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
