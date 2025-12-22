import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dayjs from "dayjs";

import prisma from "../../prisma/prisma";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "GET") {
      const session = await getSession({ req });
      if (!session) {
        return res.status(403).send({ message: "세션이 만료되었습니다." });
      }

      await prisma.tempPost.deleteMany({
        where: {
          createdAt: {
            lte: new Date(
              dayjs().subtract(90, "day").format("YYYY-MM-DD HH:mm:ss")
            ),
          },
        },
      });

      const tempPosts = await prisma.tempPost.findMany({
        where: {
          author: { email: session.user?.email },
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        include: {
          tags: true,
          category: true,
        },
      });

      return res.status(200).json(tempPosts);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
