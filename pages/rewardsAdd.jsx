import Head from 'next/head'
import Image from "next/image";
import logoImage from "../public/Logo.png";
import { signOut, getSession, useSession } from "next-auth/react"
import  prisma  from "../lib/prisma"
import { useState } from 'react';
import axios from 'axios';

// Page that handles the front end for adding rewards

export default function Home({getRewards}) {

    const [rewards, setReward]  = useState('')
    const [rewardCoinCost, setRewardCoinCost] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data } = await axios.post('/api/rewardsAPI', {rewards, rewardCoinCost})
        console.log(data)
        window.location.reload();
    }

    const {data: session} = useSession()
    return (
        <div data-theme="mytheme">
            <Head>
                <title> Add Rewards</title>
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
                <span className="mx-4 text-center normal-case text-xl justify-center justify-items-center">Hello {session.user.name} Please Edit Rewards</span>
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
            <div className=' flex flex-col w-full justify-center'>
                <form className=' ml-7 ' onSubmit={handleSubmit}>
                    <input className='grid input input-bordered ' type="text" placeholder="Reward" value={rewards} onChange={(e) => setReward(e.target.value)} />
                    <div className='divider'></div>
                    <input className='grid input input-bordered ' type="number" placeholder="Reward Cost" value={rewardCoinCost} onChange={(e) => setRewardCoinCost(+e.target.value)} />
                    <div className='divider'></div>
                    <button className='grid btn btn-secondary' type="submit">Save Reward</button>
                </form>
            </div>

        </div>
    )
}
// function that renders all the props on the server
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