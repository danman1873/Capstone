import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";


export default async function handler(req, res) {

    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    if (req.method === 'PUT') {
        try {

            const userId = req.query.id

            const updatedCoins = await prisma.coins.updateMany({
                where: { coinId: userId },
                data: {
                    coinCount:{
                        decrement: Number(req.body)
                    }
                }
            });
            res.status(200).json(updatedCoins);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong On Update' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const deleteCoins = await prisma.coins.delete({
                where: { id: coinId },
            });
            res.status(200).json(deleteCoins);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }

    else {
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res
            .status(405)
            .json({ message: `HTTP method ${req.method} is not supported.` })
    }
}
