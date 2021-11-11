import { useState } from 'react';
import Head from 'next/head';

import { Header, Project, Notification } from '../components';

const Home = () => {
    const [isGridView, setIsGridView] = useState(true);

    const toGrid = () => {
        if (!isGridView) return setIsGridView(true);
    }

    const toList = () => {
        if (isGridView) return setIsGridView(false);
    }

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
                <p className="text-xs text-red-500 font-poppins tracking-wide font-normal">Novrii</p>
            </section>

            <section className="w-full flex items-start border-t-2 border-gray-100 justify-between">
                <div className="w-9/12">
                    <Project type={isGridView ? "grid" : "list"} toGrid={toGrid} toList={toList} />
                </div>
                <div className="w-3/12">
                    <Notification label="This is a new message" rawType="info" />
                </div>
            </section>
        </div>
    )
}

export default Home

export async function getServerSideProps({ req: { url } }) {

    // const payload = url.split('payload=')[1];
    // const { accessToken, refreshToken } = JSON.parse(decodeBase64(payload));

    // axios.defaults.headers = {
    //     'x-access-token': accessToken,
    //     'x-refresh-token': refreshToken
    // }

    return {
        props: { novrii: 'OKE' }
    }


}
