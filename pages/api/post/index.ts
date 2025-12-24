import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import prisma from "../../../lib/prisma";
import { TagItem } from "../../../types";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "POST") {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(403).send({ message: "세션이 만료되었습니다." });
      }
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
        await prisma.post.create({
          data: {
            title: req.body.title,
            content: req.body.content,
            htmlContent: req.body.htmlContent,
            tags: {
              connect: req.body.tags,
            },
            category: {
              connect: {
                id: req.body.category.id,
              },
            },
            isPublic: req.body.isPublic,
            allowComments: req.body.allowComments,
            createdAt: new Date(req.body.createdAt),
            author: {
              connect: {
                email: session?.user?.email,
              },
            },
          },
          include: {
            category: {
              select: {
                name: true,
              },
            },
            tags: {
              select: {
                name: true,
              },
            },
          },
        });
      } else {
        await prisma.post.create({
          data: {
            title: req.body.title,
            content: req.body.content,
            htmlContent: req.body.htmlContent,
            tags: {
              connect: req.body.tags,
            },
            category: {
              connect: {
                id: req.body.category.id,
              },
            },
            isPublic: req.body.isPublic,
            allowComments: req.body.allowComments,
            author: {
              connect: {
                email: session?.user?.email,
              },
            },
          },
          include: {
            category: {
              select: {
                name: true,
              },
            },
            tags: {
              select: {
                name: true,
              },
            },
          },
        });
      }

      await prisma.autoSave.deleteMany({
        where: {
          author: {
            email: session?.user?.email,
          },
        },
      });

      res.status(201).json("ok");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export default handler;
