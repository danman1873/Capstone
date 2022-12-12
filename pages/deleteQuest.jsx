import Head from 'next/head'
import Image from "next/image";
import logoImage from "../public/Logo.png";
import { signOut, getSession, useSession } from "next-auth/react"
import  prisma  from "../lib/prisma"
import Link from 'next/link';

//page that allows the user to delte quests

export default function Home({getQuests}) {

async function questDelete(id) {
    await fetch(`/api/quests/${id}`, {
        method: 'DELETE',
    });
    window.location.reload()
}

    const {data: session} = useSession()
    return (
        <div data-theme="mytheme">
            <Head>
                <title>Edit Quests</title>
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
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Quest</th>
                            <th>Quest Worth</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th></th>
                            <td>
                                {getQuests.map((quests, e) => (
                                    <div key={e}>{quests.quests}</div>
                                ))}
                            </td>
                            <td>
                                {getQuests.map((quests, f) => (
                                    <div key={f}>
                                        {quests.questCoinWorth} 
                                        <button type='button' className=" ml-auto btn btn-sm btn-ghost normal-case text-base" onClick={() => questDelete(quests.id)}>Delete</button>
                                    </div>
                                ))}
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <div className="flex space-x-36">
                    <button className="btn btn-secondary justify-start mt-7">
                        <Link href="/quests">Back to Quests</Link>
                    </button>
                    <button className="btn btn-secondary justify-end mr-4 mt-7">
                        <Link href="/questsAdd">Add Quest</Link>
                    </button>
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
    
    const getQuests = await prisma.quests.findMany({
        where: {
            questId: prismaUser.id
        },
        select: {
            quests: true,
            questCoinWorth: true,
            questId: true,
            id: true
        }
    })

    const quest = await prisma.quests.findUnique({
        where: { id: prismaUser.id }
    })
    
    return {
        props: { session, getQuests, quest },
    }
}