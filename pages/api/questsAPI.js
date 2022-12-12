import prisma from '../../lib/prisma';
import { getSession } from 'next-auth/react';

//API that allows a user to get their quests
export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    if (req.method === 'POST') {
        try {
            const { quests, questCoinWorth } = req.body
            
            const prismaUser = await prisma.user.findUnique({
                where: { email: session.user.email },
            })

            const questAdded = await prisma.quests.create({
                data: {
                    quests,
                    questCoinWorth,
                    questId: prismaUser.id
                },
            });
            res.status(200).json(questAdded)
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