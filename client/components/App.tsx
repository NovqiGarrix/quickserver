import { ChangeEvent, useState, useEffect, Fragment, useRef } from 'react';
import { useRouter } from 'next/router';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';
import { IAppReducer } from '../store/reducers/app.reducer';
import { getApps } from '../store/actions/app.action';

import { SearchIcon, ViewListIcon, ViewGridIcon } from '@heroicons/react/outline'
import { Input, Button, GridView } from './childs';

type AppProps = {
    type: string;
    toGrid: () => void
    toList: () => void
}
const AppComponent = ({ type, toGrid, toList }: AppProps) => {

    const [searchQuery, setSearchQuery] = useState("");

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

    useEffect(() => {
        const projectActiveId = localStorage.getItem('project_active')!
        projectId.current = projectActiveId

        dispatch(getApps(projectActiveId));
    }, []);

    return (
        <div className="bg-blue-50 p-10 w-full max-h-screen h-screen overflow-y-auto">

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
                    <Button type="button" color={{ normal: "bg-green-400", hover: "bg-green-500" }} onClick={() => console.log("Hello Button")}>New App</Button>
                </div>

            </div>

            {type === "grid" && (
                <Fragment>
                    {!appState.error && appState.app ? (
                        <GridView type="app" datas={appState.app} />
                    ) : (
                        <div>{!projectId.current && (
                            <div>
                                Please <p className="underline text-red-500 font-bold text-poppins" onClick={() => router.push('/')}>choose</p> the project first!
                            </div>
                        )}</div>
                    )}
                </Fragment>
            )}
        </div>
    )

}

export default AppComponent