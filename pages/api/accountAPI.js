import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
        const { userName, userEmail, userPassword, userCoinTotal, userQuestList, userRewards } = req.body;

        const user = await prisma.userAccount.create({
            data: {
                userName,
                userEmail,
                userPassword,
                userCoinTotal,
                userQuestList,
                userRewards
            },
        });
        res.status(200).json(user);
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