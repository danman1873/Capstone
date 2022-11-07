import {NextApiRequest, NextApiResponse} from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
        const { userCoinTotal, user } = req.body;

        const coins = await prisma.userCoins.create({
            data: {
                userCoinTotal,
                user
            },
        });
        res.status(200).json(coins);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong' });
        }
    }

    else {
        res.setHeader('Allow', ['POST']);
        res
            .status(405)
            .json({message: 'HTTP method ${req.method} is not supported.'})
    }
}