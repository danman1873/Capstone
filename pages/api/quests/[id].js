import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {

    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    const questId = req.query.id;


    if (req.method === 'DELETE') {
        try {
            const deleteQuest = await prisma.quests.delete({
                where: { id: questId },
            });
            res.status(200).json(deleteQuest)
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
