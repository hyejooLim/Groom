import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { CategoryItem } from "../../types";
import prisma from "../../lib/prisma";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "GET") {
      const categories = await prisma.category.findMany({
        include: {
          posts: true,
        },
        orderBy: [
          {
            priority: "asc",
          },
        ],
      });

      res.status(200).json(categories);
    }

    if (req.method === "PUT") {
      if (0 < req.body.append.length) {
        await Promise.all(
          req.body.append?.map((item: CategoryItem) =>
            prisma.category.create({
              data: {
                id: item.id,
                name: item.name,
                priority: item.priority,
              },
            })
          )
        );
      }

      if (0 < req.body.update.length) {
        await Promise.all(
          req.body.update?.map((item: CategoryItem) =>
            prisma.category.update({
              where: {
                id: item.id,
              },
              data: {
                name: item.name,
                priority: item.priority,
              },
            })
          )
        );
      }

      if (0 < req.body.delete.length) {
        await Promise.all(
          req.body.delete?.map((item: CategoryItem) =>
            prisma.category.delete({
              where: {
                id: item.id,
              },
            })
          )
        );
      }

      res.status(200).json("ok");
    }
  } catch (err) {
    console.error(err);
  }
};
export default handler;
