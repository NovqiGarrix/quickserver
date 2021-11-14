import { useState, useEffect } from 'react';

import Head from 'next/head';

import { Header, AppComponent, Notification } from '../../components';
import { useCheckToken } from '../../hooks';

const Apps = () => {

    const [user, _] = useState(true);
    const [isGridView, setIsGridView] = useState(true);

    useCheckToken();

    const toGrid = () => {
        if (!isGridView) return setIsGridView(true);
    }

    const toList = () => {
        if (isGridView) return setIsGridView(false);
    }

    return (
        <div className="bg-white">
            <Head>
                <title>Apps - QuickServer</title>
                <meta name="description" content="QuickServer dashboard page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header currentItem="apps" />

            <section className="w-full px-16 py-10">
                <h1 className="text-4xl font-bold font-poppins select-none text-red-400">Hy, Novrii</h1>
                <h2 className="text-md font-poppins font-medium tracking-wide text-gray-700">Ready to start and manage your apps?</h2>
            </section>

            <section className="w-full flex items-start border-t-2 border-gray-100 justify-between">
                <div className="w-9/12">
                    <AppComponent type={isGridView ? "grid" : "list"} toGrid={toGrid} toList={toList} />
                </div>
                <div className="w-3/12">
                    <Notification label="This is a new message" type="info" />
                </div>
            </section>
        </div>
    )
}

export default Apps