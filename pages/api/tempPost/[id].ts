export const runtime = "nodejs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";
import { TagItem } from "../../../types";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "PUT") {
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

      if (req.body.category?.id) {
        await prisma.tempPost.update({
          where: {
            id: Number(req.query.id),
          },
          data: {
            title: req.body.title,
            content: req.body.content,
            htmlContent: req.body.htmlContent,
            tags: {
              set: [], // disconnect
              connect: req.body.tags,
            },
            category: {
              connect: {
                id: req.body.category.id,
              },
            },
          },
        });
      } else {
        await prisma.tempPost.update({
          where: {
            id: Number(req.query.id),
          },
          data: {
            title: req.body.title,
            content: req.body.content,
            htmlContent: req.body.htmlContent,
            tags: {
              set: [], // disconnect
              connect: req.body.tags,
            },
          },
        });
      }

      res.status(200).json("ok");
    }

    if (req.method === "DELETE") {
      await prisma.tempPost.delete({
        where: {
          id: Number(req.query.id),
        },
      });

      return res.status(200).send("ok");
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
