export const runtime = "nodejs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

import prisma from "../../lib/prisma";
import { TagItem } from "../../types";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "GET") {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(403).send({ message: "세션이 만료되었습니다." });
      }

      const autoSave = await prisma.autoSave.findFirst({
        where: {
          author: {
            email: session?.user?.email,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          tags: true,
          category: {
            select: { id: true, name: true },
          },
        },
      });

      res.status(200).json(autoSave);
    } else if (req.method === "POST") {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(403).send({ message: "세션이 만료되었습니다." });
      }

      const { title, content, htmlContent, categoryId, tags } = req.body;

      await Promise.all(
        tags?.map((tag: TagItem) =>
          prisma.tag.upsert({
            where: { name: tag.name },
            update: {},
            create: {
              name: tag.name,
            },
          })
        )
      );

      await prisma.autoSave.create({
        data: {
          title,
          content,
          htmlContent,
          category: {
            connect: {
              id: categoryId,
            },
          },
          tags: {
            connect: tags,
          },
          author: {
            connect: {
              email: session?.user?.email,
            },
          },
        },
      });

      res.status(201).send("ok");
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
