import next, { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password, name } = req.body;

    // 이미 가입한 email인지 검사
    const exUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 가입한 이메일입니다.');
    }

    if (req.method === 'POST') {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({ data: { email, password: hashedPassword, name } });

      res.status(200).send('ok');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default handler;
