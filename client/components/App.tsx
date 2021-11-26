import { ChangeEvent, useState, useEffect, Fragment, useRef, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';
import { IAppReducer } from '../store/reducers/app.reducer';
import { createApp, deleteApp, getApps } from '../store/actions/app.action';

import { SearchIcon, ViewListIcon, ViewGridIcon, RefreshIcon } from '@heroicons/react/outline'
import { Input, Button, OverModal, CreateApp, AppGridView } from './childs';
import { CreateAppType } from '../apis/app.api';
import { MOVE_NEW_APP } from '../store/action.types';

type AppProps = {
    type: string;
    toGrid: () => void
    toList: () => void
}
const AppComponent = ({ type, toGrid, toList }: AppProps) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [openCreateAppModal, setOpenCreateAppModal] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();
    const appState: IAppReducer = useSelector((state: RootState) => state.app);

    const projectId = useRef<string>();

    const submitSearch = (ev: any) => {
        ev.preventDefault();
    }

    const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(target.value);
    }

    const onAppCreate = (projectId: string, data: CreateAppType) => dispatch(createApp(projectId, data));
    const onAppDelete = (projectId: string, appId: string) => dispatch(deleteApp(projectId, appId));

    const continueCreatedApp = () => {
        dispatch({ type: MOVE_NEW_APP })
        setOpenCreateAppModal(false);
    };

    useEffect(() => {
        const projectActiveId = localStorage.getItem('project_active')!
        projectId.current = projectActiveId

        dispatch(getApps(projectActiveId));
    }, [dispatch]);

    return (
        <Fragment>

            <div className="bg-blue-50 p-10 w-full max-h-screen h-screen overflow-y-auto">

                {openCreateAppModal && (
                    <OverModal title="Share" setOpen={setOpenCreateAppModal}>
                        <CreateApp continueCreatedApp={continueCreatedApp} onAppCreate={onAppCreate} />
                    </OverModal>
                )}

                <div className="flex items-center justify-between mb-8">
                    <form className="w-3/5" onSubmit={submitSearch}>
                        <Input
                            onChange={onSearchChange}
                            value={searchQuery}
                            Icon={SearchIcon}
                            label="Search apps..."
                            name="searchQuery"
                            type="text"
                            onSubmit={submitSearch}
                        />
                    </form>


                    <div className="flex items-center mb-3">
                        <ViewListIcon className="w-5 h-5 hover:text-red-400 duration-150 mr-3 cursor-pointer" onClick={toList} />

                        <div className="bg-white p-1 rounded-md group mr-6" onClick={toGrid}>
                            <ViewGridIcon className="w-5 h-5 group-hover:text-red-500 duration-150 cursor-pointer" />
                        </div>
                        {projectId.current && (
                            <Button type="button" color={{ normal: "bg-green-400", hover: "bg-green-500" }} onClick={() => setOpenCreateAppModal(true)}>New App</Button>
                        )}
                    </div>

                </div>

                {type === "grid" && (
                    <div className={`h-full ${appState.isLoading ? 'flex items-center justify-center' : ''}`}>
                        {!appState.error && appState.app ? (
                            appState.isLoading ? (
                                <RefreshIcon className="h-10 w-10 text-gray-500 animate-spin transition-all duration-150" aria-hidden="true" />
                            ) : (
                                <AppGridView datas={appState.app} onAppDelete={onAppDelete} />
                            )
                        ) : (
                            !projectId.current && (
                                <div className="flex items-center justify-center flex-col">
                                    <div className="w-8/12 flex items-center justify-center">
                                        <Image
                                            width={600}
                                            height={510}
                                            alt="No app ilustration"
                                            src="/assets/empty-app.png"
                                            objectFit="cover"
                                            className="mb-3"
                                        />
                                    </div>
                                    <p className="font-poppins mt-5">Please <span className="text-red-500 cursor-pointer hover:underline" onClick={() => router.push('/')}>choose</span> the project first!</p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </Fragment>
    )

}

export default AppComponent