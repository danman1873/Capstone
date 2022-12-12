import Head from 'next/head'
import Image from "next/image";
import logoImage from "../public/Logo.png";
import { signOut, getSession, useSession } from "next-auth/react"
import  prisma  from "../lib/prisma"
import { useState } from 'react';

// home page used for displaying a user's quests and allowing them to turn in those quests for their worth
export default function Home({getCoins, getQuests, prismaUser}) {



    const [coins, setCoins] = useState('')


    const sendCoin = async (e) => {
        e.preventDefault()
        const { data } = await fetch(`/api/getCoins/${prismaUser.id}`, {
            method: 'PUT',
            body: coins
        })
        console.log(data);
        window.location.reload();
    }
   

    const {data: session} = useSession()
    return (
        <div data-theme="mytheme">
            <Head>
                <title>Home</title>
            </Head>
            <div>
                <div className="flex justify-start avatar w-24 rounded mt-3 ">
                    <a href="/main">
                        <Image src={logoImage}
                            alt="Picture of Logo" />
                    </a>
                </div>
                <div className=" flex justify-end">
                    <button className=" justify-items-center btn btn-ghost normal-case text-xl" onClick={() => signOut({ callbackUrl: 'https://irpquest.vercel.app' })}>Sign Out</button>
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
                <span className="mx-4 text-center normal-case text-xl justify-center justify-items-center">Hello {session.user.name} Here's Your Quests</span>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full flex-col align-middle">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Quest</th>
                            <th>Value</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th></th>
                            <td>
                                {getQuests.map((quests, e) => (
                                    <div key={e}>
                                        <span>{quests.quests}</span>
                                    </div>
                                ))}
                            </td>
                            <td>
                                {getQuests.map((quests, f) => (
                                    <div key={f}>
                                        <span>{quests.questCoinWorth}</span>
                                        <input className="checkbox checkbox-sm mx-5 float-right" value={quests.questCoinWorth} onClick={(e) => setCoins(+e.target.value)} type="checkbox" />
                                    </div>
                                ))}
                            </td>
                            <td></td>

                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-evenly ">
                <label htmlFor="my-modal" className="btn btn-secondary">Turn in Quest?</label>
            </div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Turn in Quests?</h3>
                    <p className="py-4">Are you sure you want to turn in your quests?</p>
                    <div className="modal-action justify-between modal-primary">
                        <label htmlFor="my-modal" className="btn btn-secondary" onClick={sendCoin}>Yes</label>
                        <label htmlFor="my-modal" className="btn btn-secondary">No</label>
                    </div>
                </div>
            </div>
            <div className="flex justify-center stats bg-primary mx-28 my-6 ">
                <div className="stat items-center justify-evenly space-y-2">
                    <div className="stat-title normal-case text-xl text-center">Coin Amount</div>
                    <div className="stat-value text-center justify-evenly">
                        {getCoins.map((coins, i) => (
                            <div key={i}>{coins.coinCount}</div>
                        ))}
                    </div>
                </div>
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

    
    const getQuests = await prisma.quests.findMany({
        where: {
            questId: prismaUser.id
        },
        select: {
            quests: true,
            questCoinWorth: true
        }
    })
    
    return {
        props: { session, getQuests, prismaUser, getCoins },
    }
}