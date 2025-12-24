import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../../../lib/prisma";
import { Sharer } from "../../../../types";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "POST") {
      const session = await getSession({ req });
      if (!session) {
        return res.status(403).send({ message: "세션이 만료되었습니다" });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
      });

      req.body.sharers?.map(async (sharer: Sharer) => {
        await prisma.sharedPost.create({
          data: {
            senderId: user.id,
            receiverId: sharer.id,
            postId: Number(req.query.id),
          },
        });
      });

      res.status(201).send("ok");
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
