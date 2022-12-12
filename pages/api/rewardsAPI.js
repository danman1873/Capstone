import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react';

//API for getting a user's rewards
export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    if (req.method === 'POST') {
        try {
            const { rewards, rewardCoinCost } = req.body;

            const prismaUser = await prisma.user.findUnique({
                where: { email: session.user.email }
            })

            const newReward = await prisma.rewards.create({
                data: {
                    rewards,
                    rewardCoinCost,
                    rewardId: prismaUser.id
                },
            });
            res.status(200).json(newReward)
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' })
        }
    }

    else {
        res.setHeader('Allow', ['POST']);
        res
            .status(405)
            .json({ message: `HTTP method ${req.method} is not supported` });
    }
}