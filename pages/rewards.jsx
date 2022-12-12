import Head from 'next/head'
import Image from "next/image";
import logoImage from "../public/Logo.png";
import { signOut, getSession, useSession } from "next-auth/react"
import  prisma  from "../lib/prisma"
import Link from 'next/link';


export default function Home({getRewards}) {
    const {data: session} = useSession()
    return (
        <div data-theme="mytheme">
            <Head>
                <title>Rewards</title>
            </Head>
            <div>
                <div className="flex justify-start avatar w-24 rounded mt-3 ">
                    <a href="/main">
                        <Image src={logoImage}
                            alt="Picture of Logo" />
                    </a>
                </div>
                <div className=" flex justify-end">
                    <button className=" justify-items-center btn btn-ghost normal-case text-xl" onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>Sign Out</button>
                </div>
            </div>
            <div className="navbar bg-primary flex justify-center">
                <div className="navbar-center flex justify-center">
                    <a href="/cash-out" className="btn btn-ghost normal-case text-xl">Cash Out</a>
                    <a href="/quests" className="btn btn-ghost normal-case text-xl">Quests</a>
                    <a href="/rewards" className="btn btn-ghost normal-case text-xl">Rewards</a>
                    <a href="/main" className="btn btn-ghost normal-case text-xl">Home</a>
                </div>
            </div>
            <div className="flex justify-center">
                <span className="mx-4 text-center normal-case text-xl justify-center justify-items-center">Hello {session.user.name} Here's Your Rewards</span>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Reward</th>
                            <th>Reward Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="flex-col justify-center ">
                            <th></th>
                            <td>
                                {getRewards.map((rewards, e) => (
                                    <div key={e}>{rewards.rewards}</div>
                                ))}
                            </td>
                            <td>
                                {getRewards.map((rewards, f) => (
                                    <div key={f}>{rewards.rewardCoinCost}</div>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <div className="flex space-x-36">
                    <button className="btn btn-secondary justify-start mt-7">
                        <Link href="/deleteRewards">Edit Rewards</Link>
                    </button>
                    <button className="btn btn-secondary justify-end mr-4 mt-7">
                        <Link href="/rewardsAdd">Add Reward</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const session = await getSession(context)
    
    if (!session) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }
    
    const prismaUser = await prisma.user.findUnique({
        where: {email: session.user.email},
    })
    
    const getRewards = await prisma.rewards.findMany({
        where: {
            rewardId: prismaUser.id
        },
        select: {
            rewards: true,
            rewardCoinCost: true
        }
    })
    
    return {
        props: { session, getRewards },
    }
}