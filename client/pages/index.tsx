import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Head from 'next/head';

import useUser from '../hooks/useUser';
import { getProjects } from '../store/actions/project.action';

import { Header, Project, Notification, Modal } from '../components';
import { CreateProject } from '../components/childs';

const Home = () => {
    const [isGridView, setIsGridView] = useState(true);
    const [openModal, setOpenModal] = useState(true)

    const dispatch = useDispatch();

    const userState = useUser();

    const cancelButtonModalRef = useRef(null)

    const toGrid = () => {
        if (!isGridView) return setIsGridView(true);
    }

    const toList = () => {
        if (isGridView) return setIsGridView(false);
    }

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    return (
        <div className="bg-white">
            <Head>
                <title>Dashboard - QuickServer</title>
                <meta name="description" content="QuickServer dashboard page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Modal onOk={() => console.log()} open={openModal} setOpen={setOpenModal} cancelButtonRef={cancelButtonModalRef}>
                <CreateProject onOk={() => console.log()} setOpen={setOpenModal} cancelButtonRef={cancelButtonModalRef} />
            </Modal>
            <Header currentItem="projects" />

            <section className="w-full px-16 py-10">
                <h1 className="text-4xl font-bold font-poppins select-none text-red-400">Hy {userState.user?.name}</h1>
                <h2 className="text-md font-poppins font-medium tracking-wide text-gray-700">Ready to start and manage your project?</h2>
                {userState.error && <p className="text-xs text-red-500 font-poppins tracking-wide font-normal">{userState.error}</p>}
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