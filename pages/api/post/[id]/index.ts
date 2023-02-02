import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../lib/prisma';
import { TagItem } from '../../../../types';

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
              id: true,
              name: true,
            },
          },
          comments: true,
          category: true,
          likers: {
            select: {
              id: true,
            },
          },
          subscribers: {
            select: {
              id: true,
            },
          },
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

      if (req.body.isPublic && req.body.createdAt) {
        await prisma.post.update({
          where: {
            id: Number(req.query.id),
          },
          data: {
            title: req.body.title,
            content: req.body.content,
            htmlContent: req.body.htmlContent,
            tags: {
              set: [], // disconnect
              connect: req.body.tags?.map((tag: TagItem) => {
                return {
                  name: tag.name,
                };
              }),
            },
            category: {
              connect: {
                id: req.body.category.id,
              },
            },
            isPublic: req.body.isPublic,
            allowComments: req.body.allowComments,
            createdAt: new Date(req.body.createdAt),
          },
        });
      } else {
        await prisma.post.update({
          where: {
            id: Number(req.query.id),
          },
          data: {
            title: req.body.title,
            content: req.body.content,
            htmlContent: req.body.htmlContent,
            tags: {
              set: [], // disconnect
              connect: req.body.tags?.map((tag: TagItem) => {
                return {
                  name: tag.name,
                };
              }),
            },
            category: {
              connect: {
                id: req.body.category.id,
              },
            },
            isPublic: req.body.isPublic,
            allowComments: req.body.allowComments,
          },
        });
      }

      res.status(201).json('ok');
    }

    if (req.method === 'DELETE') {
      await prisma.comment.deleteMany({
        where: {
          postId: Number(req.query.id),
        },
      });

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
