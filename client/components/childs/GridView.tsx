import { FunctionComponent } from 'react';
import moment from 'moment';

import { useDispatch } from 'react-redux';

import { ButtonOutline } from '.';

import { Project } from '../../store/reducers/project.reducer';
import { App } from '../../store/reducers/app.reducer';
import { UPDATE_DATA_PROJECT } from '../../store/action.types';

type GridViewProps = { datas: any, type: "project" | "app" }
const GridView: FunctionComponent<GridViewProps> = ({ datas, type }) => {

    const dispatch = useDispatch();

    const currentActiveId = localStorage.getItem('project_active')
    const projects = datas as Array<Project>

    const onProjectClick = (projectId: string) => {

        const currentProject = projects.find((project) => project._id === projectId);
        if(currentProject) {
            const updatedProject = {
                ...currentProject,
                isActive: !currentProject.isActive
            }

            const prevActive = projects.find((project) => project.isActive === true);
            if(prevActive) {
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

    return (
        <div className="grid grid-cols-3 gap-6">
            {datas.map((data: App & Project, key: number) => {

                const isActive = currentActiveId === data._id

                return (
                    <div key={key} className="bg-white rounded-lg p-6 flex items-start justify-between flex-col" style={{ height: "14rem" }}>
                    <div>
                        <h3 className="font-poppins font-bold text-md tracking-wide">{data.name}</h3>
                        <p className="text-gray-600 text-sm font-poppins">{moment(new Date(data.createdAt)).fromNow()}</p>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        {type === "app" && <data.Icon className="w-5 h-5" />}

                        {type === "project" ? (
                            <ButtonOutline
                                onClick={() => onProjectClick(data._id)}
                                type="button"
                                color={{ normal: "green-400", hover: "green-400" }}
                                active={isActive}
                            >
                                {isActive ? 'Selected' : 'Select Project'}
                            </ButtonOutline>
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