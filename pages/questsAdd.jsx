import Head from 'next/head'
import Image from "next/image";
import logoImage from "../public/Logo.png";
import { signOut, getSession, useSession } from "next-auth/react"
import  prisma  from "../lib/prisma"
import { useState } from 'react';
import axios from 'axios';

//page that allos the user to add quests
export default function Home({getQuests}) {

    const [quests, setQuest]  = useState('')
    const [questCoinWorth, setQuestCoinWorth] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data } = await axios.post('/api/questsAPI', {quests, questCoinWorth})
        console.log(data);
        window.location.reload();
    }

    const {data: session} = useSession()
    return (
        <div data-theme="mytheme">
            <Head>
                <title>Add Quests</title>
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
                <span className="mx-4 text-center normal-case text-xl justify-center justify-items-center">Hello {session.user.name} Please Add Your Quests</span>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Quest</th>
                            <th>Quest Worth</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="flex-1 justify-center ">
                            <th></th>
                            <td>
                                {getQuests.map((quests, e) => (
                                    <div key={e}>{quests.quests}</div>
                                ))}
                            </td>
                            <td>
                                {getQuests.map((quests, f) => (
                                    <div key={f}>{quests.questCoinWorth}</div>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className=' flex flex-col w-full justify-center'>
                <form className=' ml-7 ' onSubmit={handleSubmit}>
                    <input className='grid input input-bordered ' type="text" placeholder="Quest" value={quests} onChange={(e) => setQuest(e.target.value)} />
                    <div className='divider'></div>
                    <input className='grid input input-bordered ' type="number" placeholder="Quest Worth" value={questCoinWorth} onChange={(e) => setQuestCoinWorth(+e.target.value)} />
                    <div className='divider'></div>
                    <button className='grid btn btn-secondary' type="submit">Save Quest</button>
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
        props: { session, getQuests },
    }
}