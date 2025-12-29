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
        return res.status(401).send({ message: "세션이 만료되었습니다." });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        include: {
          neighbors: {
            select: {
              id: true,
              name: true,
              email: true,
              imageUrl: true,
              posts: {
                select: { id: true },
              },
              neighbors: {
                select: { id: true },
              },
            },
            orderBy: [
              {
                name: "asc",
              },
            ],
          },
        },
      });

      res.status(200).json(user.neighbors);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
