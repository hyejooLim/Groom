export const runtime = "nodejs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "GET") {
      const user = await prisma.user.findUnique({
        where: {
          email: String(req.query.email),
        },
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
          posts: {
            select: {
              id: true,
            },
          },
          neighbors: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(403).send({ message: "존재하지 않는 사용자입니다." });
      }

      res.status(200).json(user);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
