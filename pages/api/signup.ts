import next, { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { hashPassword } from "../../utils/auth";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method !== "POST") {
      return;
    }

    const { email, password, name } = req.body;

    // 이미 가입한 email인지 검사
    const exUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exUser) {
      return res.status(403).send({ message: "이미 가입한 이메일입니다." });
    }

    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default handler;
