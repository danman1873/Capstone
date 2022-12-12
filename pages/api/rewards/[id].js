import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

//API that allows a user to use their specific ID to delete a reward

export default async function handler(req, res) {

    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    const rewardId = req.query.id;

    if (req.method === 'DELETE') {
        try {
            const deleteReward = await prisma.rewards.delete({
                where: { id: rewardId },
            });
            res.status(200).json(deleteReward);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }

    else {
        res.setHeader('Allow', ['DELETE']);
        res
            .status(405)
            .json({ message: `HTTP method ${req.method} is not supported.` })
    }
}