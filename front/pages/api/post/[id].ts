import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';
import { TagItem } from '../../../types';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const post = await prisma.post.findUnique({
        where: {
          id: Number(req.query.id),
        },
        include: {
          tags: {
            select: {
              name: true,
            },
          },
          comments: true,
          category: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      });

      res.status(200).json(post);
    }

    if (req.method === 'PUT') {
      await Promise.all(
        req.body.tags?.map((tag: TagItem) =>
          prisma.tag.upsert({
            where: { name: tag.name },
            update: {},
            create: {
              name: tag.name,
            },
          })
        )
      );

      const post = await prisma.post.update({
        where: {
          id: Number(req.query.id),
        },
        data: {
          title: req.body.title,
          content: req.body.content,
          htmlContent: req.body.htmlContent,
          tags: {
            set: [],
            connect: req.body.tags,
          },
          category: {
            connect: {
              id: req.body.category.id,
            },
          },
        },
      });

      res.status(201).json(post);
    }

    if (req.method === 'DELETE') {
      await prisma.post.delete({
        where: {
          id: Number(req.query.id),
        },
      });

      res.status(200).send('ok');
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
