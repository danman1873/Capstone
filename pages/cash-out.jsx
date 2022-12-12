import Head from 'next/head'
import Image from "next/image";
import logoImage from "../public/Logo.png";
import { signOut, getSession, useSession } from "next-auth/react"
import prisma from "../lib/prisma"
import { useState } from 'react';

export default function Home({ getCoins, getRewards, prismaUser }) {


    const [coins, setCoins] = useState('')
    

    const sendCoin = async (e) => {
        e.preventDefault()
        const { data } = await fetch(`/api/coins/${prismaUser.id}`, {
            method: 'PUT',
            body: coins
        })
        console.log(data);
        window.location.reload();
    }
   


    const { data: session } = useSession()
    return (
        <div data-theme="mytheme">
            <Head>
                <title>Cash Out</title>
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
                <span className="mx-4 text-center normal-case text-xl justify-center justify-items-center">You did well! {session.user.name} Choose your reward</span>
            </div>
            <div className="grid-auto-columns: min-content items-center">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Reward</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th></th>
                            <td>
                                {getRewards.map((rewards, e) => (
                                    <div key={e}>{rewards.rewards}</div>
                                ))}
                            </td>
                            <td>
                                {getRewards.map((rewards, f) => (
                                    <div key={f}>
                                        <span className=' justify-items-center '>{rewards.rewardCoinCost}</span>
                                        <input className="checkbox checkbox-sm mx-5 float-right" value={rewards.rewardCoinCost} onClick={(e) => setCoins(+e.target.value)} type='checkbox'/>
                                    </div>
                                ))}
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center stats bg-primary mx-28 ">
                <div className="stat items-center justify-evenly space-y-2">
                    <div className="stat-title normal-case text-xl text-center">Coin Amount</div>
                    <div className="stat-value text-center justify-evenly">
                        {getCoins.map((coins, i) => (
                            <div key={i}>{coins.coinCount}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex flex-auto justify-center'>
                <button className="btn btn-secondary btn-sm my-3 ml-3 " onClick={sendCoin} >Submit Reward Choice</button>
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
        where: { email: session.user.email },
    })

    const getCoins = await prisma.coins.findMany({
        where: {
            coinId: prismaUser.id
        },
        select: {
            coinCount: true,
            coinId: true,
            id: true
        }
    })

    const reward = await prisma.rewards.findUnique({
        where: { id: prismaUser.id }
    })

    const getRewards = await prisma.rewards.findMany({
        where: {
            rewardId: prismaUser.id
        },
        select: {
            rewards: true,
            rewardCoinCost: true,
            rewardId: true,
            id: true
        }
    })


    return {
        props: { session, getCoins, getRewards, reward, prismaUser },
    }
}
