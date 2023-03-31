import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.token !== process.env.NEXT_PUBLIC_MY_SECRET_TOKEN) {
    return res.status(401).send({ message: 'Invalid token' });
  }

  try {
    if (req.body?.path === undefined) {
      return res.status(400).send({ message: 'Bad request (no body)' });
    }

    await res.revalidate(req.body.path);

    return res.status(200).json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
};

export default handler;
