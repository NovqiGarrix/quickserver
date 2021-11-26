import { FunctionComponent, Fragment, useState } from 'react';

import { useSelector } from 'react-redux';
import { IUserReducer } from '../../store/reducers/user.reducer';
import { RootState } from '../../store';
import { App, IAppReducer } from '../../store/reducers/app.reducer';

import { InfoIcon, Realtime } from '.';
import { RefreshIcon, TrashIcon } from '@heroicons/react/outline';

type GridViewProps = {
    datas: Array<App>;
    onAppDelete: (projectId: string, appId: string) => void;
}

const AppGridView: FunctionComponent<GridViewProps> = (props) => {

    const { datas, onAppDelete } = props

    const userState: IUserReducer = useSelector((state: RootState) => state.user);
    const appState: IAppReducer = useSelector((state: RootState) => state.app);

    const [cardHover, setCardHover] = useState({ status: false, projectId: "" });

    const onCardHover = (projectId: string) => {
        setCardHover({ ...cardHover, status: true, projectId });
    }

    const onCardHoverLeave = () => {
        setCardHover({ ...cardHover, status: false, projectId: "" });
    }

    console.log({ gridView: datas });

    return (
        <div className="grid grid-cols-3 gap-6">
            {datas.map((data, key: number) => {

                return (
                    <div key={key} onMouseOver={() => onCardHover(data._id)} onMouseLeave={() => onCardHoverLeave()} className="bg-white rounded-lg p-6 flex items-start justify-between flex-col" style={{ height: "14rem" }}>
                        <div>
                            <div className="flex items-center justify-between">
                                <h3 className="font-poppins font-bold text-md tracking-wide mr-4">{data.name}</h3>
                            </div>
                            <p className="text-gray-500 font-poppins tracking-wide flex text-sm">
                                <Realtime time={data.createdAt} className="mr-1" /> by {userState.user?.name}
                            </p>
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <data.Icon className="w-6 h-6" />

                            {appState.isActionLoading.status && appState.isActionLoading.appId === data._id ? (
                                <RefreshIcon className="animate-spin text-gray-500 w-6 h-6" />
                            ) : (
                                <InfoIcon
                                    label="Delete"
                                    onClick={() => onAppDelete(data.projectId, data._id)}
                                >
                                    <TrashIcon
                                        className="w-6 h-6 text-gray-500 hover:text-red-500 cursor-pointer transition-all duration-150"
                                    />
                                </InfoIcon>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )

}

export default AppGridView