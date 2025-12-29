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
      if (!session) {
        return res.status(403).send({ message: "세션이 만료되었습니다." });
      }

      const posts = await prisma.post.findMany({
        where: {
          author: {
            email: session.user?.email,
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
          content: true,
          categoryId: true,
          category: {
            select: {
              name: true,
            },
          },
          comments: {
            select: {
              id: true,
            },
          },
          likers: {
            select: {
              id: true,
            },
          },
          authorId: true,
          author: {
            select: {
              name: true,
            },
          },
          isPublic: true,
          createdAt: true,
        },
      });

      return res.status(200).json(posts);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
