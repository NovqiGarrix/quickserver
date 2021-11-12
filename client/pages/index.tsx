import { useState, useEffect } from 'react';
import axios from 'axios';

import Head from 'next/head';

import { Header, Project, Notification } from '../components';
import router from 'next/router';

type User = {
    _id: string;
    name: string;
    email: string;
}

const Home = () => {
    const [isGridView, setIsGridView] = useState(true);
    const [user, setUser] = useState<User>()

    const toGrid = () => {
        if (!isGridView) return setIsGridView(true);
    }

    const toList = () => {
        if (isGridView) return setIsGridView(false);
    }

    useEffect(() => {

        if(!user) {
            const accessToken = window.localStorage.getItem('accessToken')!;
            const refreshToken = window.localStorage.getItem('refreshToken')!;

            axios.get(`${process.env.SERVER_URL}/api/v1/user`, { headers: {
                'x-access-token': accessToken,
                'x-refresh-token': refreshToken
            } }).then(({ data: { data, error, newAccessToken } }: { data: { data: User, error: string, newAccessToken: string } }) => {
                console.log({ data, error });
                if(error === 'Unauthorized!') {
                    window.localStorage.removeItem('accessToken');
                    window.localStorage.removeItem('refreshToken');
                    return router.replace('/login');
                }
                if(newAccessToken) window.localStorage.setItem('accessToken', newAccessToken);
                setUser({ _id: data._id, name: data.name, email: data.email });
            }).catch((err) => {
                window.localStorage.removeItem('accessToken');
                window.localStorage.removeItem('refreshToken');
                return router.replace('/login');
            });
        }

    }, [user]);

    return (
        <div className="bg-white">
            <Head>
                <title>Dashboard - QuickServer</title>
                <meta name="description" content="QuickServer dashboard page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header currentItem="projects" />

            <section className="w-full px-16 py-10">
                <h1 className="text-4xl font-bold font-poppins select-none text-red-400">Hy there!</h1>
                <h2 className="text-md font-poppins font-medium tracking-wide text-gray-700">Ready to start and manage your project?</h2>
                <p className="text-xs text-red-500 font-poppins tracking-wide font-normal">{user?.name ?? 'Undefined'}</p>
            </section>

            <section className="w-full flex items-start border-t-2 border-gray-100 justify-between">
                <div className="w-9/12">
                    <Project type={isGridView ? "grid" : "list"} toGrid={toGrid} toList={toList} />
                </div>
                <div className="w-3/12">
                    <Notification label="This is a new message" type="info" />
                </div>
            </section>
        </div>
    )
}

export default Home