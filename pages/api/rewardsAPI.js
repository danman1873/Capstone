import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
        const { rewards, rewardCoinCost, user, userId } = req.body;

        const newReward = await prisma.userRewards.create({
            data: {
                rewards,
                rewardCoinCost,
                user,
                userId
            },
        });
        res.status(200).json(newReward);
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