import { FunctionComponent, Fragment, useState, Dispatch, SetStateAction, MutableRefObject } from 'react';

import { useSelector } from 'react-redux';
import { IProjectReducer, Project } from '../../store/reducers/project.reducer';
import { App } from '../../store/reducers/app.reducer';

import { TrashIcon, RefreshIcon, PencilAltIcon, XIcon, CheckIcon } from '@heroicons/react/outline';
import { ButtonOutline, InfoIcon, Realtime } from '.';
import { RootState } from '../../store';

type GridViewProps = {
    datas: any,
    type: "project" | "app",
    onProjectClick?: (projectId: string) => void;
    onProjectDelete?: (projectId: string) => void;

    onProjectRename?: (projectId: string, newName: string) => void;
}

const GridView: FunctionComponent<GridViewProps> = (props) => {

    const {
        datas,
        type,
        onProjectClick,
        onProjectDelete,
        onProjectRename
    } = props
    const projectState: IProjectReducer = useSelector((state: RootState) => state.project);

    const [isEditingProjectName, setIsEditingProjectName] = useState({ status: false, projectId: "" });
    const [newProjectName, setNewProjectName] = useState("");

    const [cardHover, setCardHover] = useState({ status: false, projectId: "" });

    const currentActiveId = localStorage.getItem('project_active');

    const onCardHover = (projectId: string) => {
        setCardHover({ ...cardHover, status: true, projectId });
    }

    const onCardHoverLeave = () => {
        setCardHover({ ...cardHover, status: false, projectId: "" });
    }

    const onProjectRenameClick = (prevName: string, projectId: string) => {
        setIsEditingProjectName({ ...isEditingProjectName, status: true, projectId })
        setNewProjectName(prevName)
    }

    const onProjectRenameCancel = () => {
        setIsEditingProjectName({ ...isEditingProjectName, status: false, projectId: "" });
        setNewProjectName("");
    }

    return (
        <div className="grid grid-cols-3 gap-6">
            {datas.map((data: App & Project, key: number) => {

                const isActive = currentActiveId === data._id

                return (
                    <div key={key} onMouseOver={() => onCardHover(data._id)} onMouseLeave={() => onCardHoverLeave()} className="bg-white rounded-lg p-6 flex items-start justify-between flex-col" style={{ height: "14rem" }}>
                        <div>
                            <div className="flex items-center justify-between">
                                {(isEditingProjectName.status && data._id === isEditingProjectName.projectId) ? (
                                    <Fragment>
                                        <input
                                            className="mr-4 outline-none border-none"
                                            placeholder="New project name"
                                            value={newProjectName}
                                            onChange={(ev) => setNewProjectName(ev.target.value)}
                                        />

                                        <CheckIcon
                                            className={`w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-600 opacity-0 duration-150 transition-all ${cardHover.status && cardHover.projectId === data._id ? 'opacity-100' : ''}`}
                                            onClick={() => onProjectRename!(data._id, newProjectName)}
                                        />

                                        <XIcon
                                            className={`w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-600 opacity-0 duration-150 transition-all ${cardHover.status && cardHover.projectId === data._id ? 'opacity-100' : ''}`}
                                            onClick={onProjectRenameCancel}
                                        />
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <h3 className="font-poppins font-bold text-md tracking-wide mr-4">{data.name}</h3>
                                        <PencilAltIcon
                                            className={`w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-600 opacity-0 duration-150 transition-all ${cardHover.status && cardHover.projectId === data._id ? 'opacity-100' : ''}`}
                                            onClick={() => onProjectRenameClick(data.name, data._id)}
                                        />
                                    </Fragment>
                                )}
                            </div>
                            <Realtime
                                Component="p"
                                time={data.createdAt}
                                className="text-gray-600 text-sm font-poppins"
                            />
                        </div>

                        <div className="flex items-center justify-between w-full">
                            {type === "app" && <data.Icon className="w-5 h-5" />}

                            {type === "project" ? (
                                <Fragment>
                                    <ButtonOutline
                                        onClick={() => onProjectClick && onProjectClick(data._id)}
                                        type="button"
                                        color={{ normal: "green-400", hover: "green-400" }}
                                        active={isActive}
                                    >
                                        {isActive ? 'Selected' : 'Select Project'}
                                    </ButtonOutline>

                                    {projectState.isActionLoading.status && projectState.isActionLoading.projectId === data._id ? (
                                        <RefreshIcon className="animate-spin text-gray-500 w-6 h-6" />
                                    ) : (
                                        <InfoIcon
                                            label="Delete"
                                            onClick={() => onProjectDelete && onProjectDelete(data._id)}
                                        >
                                            <TrashIcon
                                                className="w-6 h-6 text-gray-500 hover:text-red-500 cursor-pointer transition-all duration-150"
                                            />
                                        </InfoIcon>
                                    )}
                                </Fragment>
                            ) : (
                                <small>Apps</small>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )

}

export default GridView