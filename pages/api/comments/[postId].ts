import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "GET") {
      const comments = await prisma.comment.findMany({
        where: {
          postId: Number(req.query.postId),
        },
        include: {
          author: {
            select: {
              name: true,
              imageUrl: true,
            },
          },
        },
        orderBy: [
          {
            datetime: "asc",
          },
        ],
      });

      res.status(200).json(comments);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
