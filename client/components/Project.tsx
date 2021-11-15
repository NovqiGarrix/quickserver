import { useState, FunctionComponent, ChangeEvent, Dispatch, SetStateAction } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';
import type { IProjectReducer } from '../store/reducers/project.reducer';

import { SearchIcon, ViewListIcon, ViewGridIcon } from '@heroicons/react/outline'
import { Input, Button, ProjectGridView } from './childs';
import { UPDATE_DATA_PROJECT } from '../store/action.types';
import { deleteProject, updateProject } from '../store/actions/project.action';

type ProjectProps = {
    type: "grid" | "list";
    toGrid: () => void;
    toList: () => void;
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

const Project: FunctionComponent<ProjectProps> = ({ type, toGrid, toList, setOpenModal }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const projectState: IProjectReducer = useSelector((state: RootState) => state.project);

    const dispatch = useDispatch();

    const submitSearch = (ev: any) => {
        ev.preventDefault();
    }

    const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(target.value);
    }

    const onProjectClick = (projectId: string) => {
        const currentProject = projectState.project?.find((project) => project._id === projectId);
        const currentActiveProject = localStorage.getItem('project_active');

        if (currentProject) {
            if (currentProject._id === currentActiveProject) {
                const updatedProject = {
                    ...currentProject,
                    isActive: false
                }

                localStorage.removeItem('project_active');
                return dispatch({ type: UPDATE_DATA_PROJECT, payload: updatedProject })
            }

            const updatedProject = {
                ...currentProject,
                isActive: !currentProject.isActive
            }

            const prevActive = projectState.project?.find((project) => project.isActive === true);
            if (prevActive) {
                const unActivePrevProject = {
                    ...prevActive,
                    isActive: false
                }

                dispatch({ type: UPDATE_DATA_PROJECT, payload: unActivePrevProject });
            }

            localStorage.setItem('project_active', currentProject._id);
            return dispatch({ type: UPDATE_DATA_PROJECT, payload: updatedProject })
        }

        console.log('Project not found!');
    }

    const onProjectDelete = (projectId: string) => dispatch(deleteProject(projectId));

    const onProjectRename = (projectId: string, newName: string) => dispatch(updateProject(projectId, { name: newName }))

    return (
        <div className="bg-blue-50 p-10 w-full max-h-screen h-screen overflow-y-auto">

            <div className="flex items-center justify-between mb-8">
                <div className="inline-block w-full">
                    <form className="w-3/5" onSubmit={submitSearch}>
                        <Input
                            onChange={onSearchChange}
                            value={searchQuery}
                            Icon={SearchIcon}
                            label="Search projects..."
                            name="searchQuery"
                            type="text"
                            onSubmit={(ev) => ev.preventDefault()}
                        />
                    </form>

                    {/* TOTO: Create filter query */}
                </div>


                <div className="flex items-center mb-3">
                    <ViewListIcon className="w-5 h-5 hover:text-red-400 duration-150 mr-3 cursor-pointer" onClick={toList} />

                    <div className="bg-white p-1 rounded-md group mr-6" onClick={toGrid}>
                        <ViewGridIcon className="w-5 h-5 group-hover:text-red-500 duration-150 cursor-pointer" />
                    </div>
                    <Button type="button" color={{ normal: "bg-green-400", hover: "bg-green-500" }} onClick={() => setOpenModal(true)}>New Project</Button>
                </div>

            </div>

            {type === "grid" && (
                !projectState.error && projectState.project ? (
                    <ProjectGridView
                        onProjectDelete={onProjectDelete}
                        onProjectClick={onProjectClick}
                        datas={searchQuery ? projectState.project.filter((project) => project.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) : projectState.project}
                        onProjectRename={onProjectRename}
                    />
                ) : (
                    <div>Loading...</div>
                )
            )}
        </div>
    )

}

export default Project