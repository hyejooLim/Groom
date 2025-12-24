import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
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
          neighbors: {
            connect: {
              id: Number(req.query.id),
            },
          },
        },
      });

      res.status(200).send("ok");
    }

    if (req.method === "DELETE") {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(403).send({ message: "세션이 만료되었습니다." });
      }

      await prisma.user.update({
        where: {
          email: session.user?.email,
        },
        data: {
          neighbors: {
            disconnect: {
              id: Number(req.query.id),
            },
          },
        },
      });

      res.status(200).send("ok");
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
