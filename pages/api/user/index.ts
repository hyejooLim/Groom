export const runtime = "nodejs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "GET") {
      const session = await getServerSession(req, res, authOptions);
      if (!session || !session.user?.email) {
        return res.status(401).send({ message: "세션이 만료되었습니다." });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        include: {
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
        return res.status(403).send({ message: "사용자를 찾을 수 없습니다." });
      }

      const { id, email, name, imageUrl, posts, neighbors } = user;

      res.status(200).json({ id, email, name, imageUrl, posts, neighbors });
    }

    if (req.method === "PUT") {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(403).send({ message: "세션이 만료되었습니다." });
      }

      await prisma.user.update({
        where: {
          email: session.user?.email,
        },
        data: {
          imageUrl: req.body?.imageUrl,
        },
      });

      res.status(200).json("ok");
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
