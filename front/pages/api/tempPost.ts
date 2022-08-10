import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('handler', req.body);

    if (req.method === 'POST') {
      const session = await getSession({ req });

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

      const tempPost = await prisma.tempPost.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          thumbnailContent: req.body.thumbnailContent,
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

      res.status(201).json(tempPost);
    }

    if (req.method === 'DELETE') {
      await prisma.tempPost.delete({
        where: {
          id: req.body,
        },
      });

      return res.status(200).send('ok');
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
