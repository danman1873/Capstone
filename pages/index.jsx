import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import {signIn, getProviders, useSession, getSession} from "next-auth/react"

//the main login page for the user
export default function Login({ providers }) {
    const {data: session, status} = useSession();

    if (status !== 'authenticated') {

        return (
            <div>
                <Head>
                    <title>IRP Quest Login</title>
                </Head>
                <main className="flex flex-col items-center justify-center w-full flex-1 py-16 px-20 text-center">
                    <div className=" bg-green-900 rounded-2xl shadow-2xl flex max-w-4xl py-12">
                        <div className="p-5 py-36 px-12">
                            <div className="text-3xl text-center text-white justify-center font-bold mb-1">
                                <span className=" text-yellow-600">I.R.P</span>Quest
                            </div>
                            <div className="py-10">
                                <h2 className="text-3xl font-bold text-white mb-2">Begin your Quest Today!</h2>
                            </div>
                            <div className="flex flex-col items-center">
                                <>
                                    {Object.values(providers).map((provider) => (
                                        <div key={provider.name}>
                                            <button className='btn btn-secondary' onClick={() => signIn(provider.id)}>
                                                Sign in with {provider.name}
                                            </button>
                                        </div>
                                    ))}
                                </>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
// function that renders all the props on the server
export async function getServerSideProps(context) {
    const providers = await getProviders()
    const session = await getSession(context)
    if (session) {
        return {
            redirect: {
                destination: '/main'
            }
        }
    }
    return {
        props: { providers, session },
    }
}