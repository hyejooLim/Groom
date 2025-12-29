export const runtime = "nodejs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log("API handler entered");

  try {
    if (req.method === "GET") {
      console.log("DB connect start");
      const posts = await prisma.post.findMany({
        where: {
          isPublic: true,
          createdAt: {
            lte: new Date(),
          },
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        select: {
          id: true,
          title: true,
          category: {
            select: {
              name: true,
            },
          },
          author: {
            select: {
              name: true,
            },
          },
          createdAt: true,
        },
      });

      console.log("DB connect success");
      return res.status(200).json(posts);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
