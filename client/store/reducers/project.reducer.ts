import { AnyAction, Reducer } from 'redux';
import { CREATE_NEW_PROJECT, DELETE_PROJECT, REQUEST_ACTION_PROJECT, REQUEST_PROJECT, SET_DATA_PROJECT, SET_ERROR_PROJECT, UPDATE_DATA_PROJECT } from '../action.types';

export type Project = {
    _id: string
    userId: string
    apiKey: string
    dbName: string
    name: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface IProjectReducer {

    isLoading: boolean;
    isActionLoading: {
        status: boolean;
        projectId: string;
    };

    error: string | null;

    project: Array<Project> | null

}

const initializeState: IProjectReducer = {
    isLoading: false,
    isActionLoading: {
        status: false,
        projectId: ''
    },
    error: null,
    project: null
}

const projectReducer: Reducer = (state: IProjectReducer = initializeState, action: AnyAction): IProjectReducer => {

    switch (action.type) {
        case REQUEST_PROJECT:
            return { ...state, isLoading: true }

        case REQUEST_ACTION_PROJECT:
            return { ...state, isActionLoading: { status: true, projectId: action.payload } }

        case SET_ERROR_PROJECT:
            return { ...state, isLoading: false, error: action.payload }

        case SET_DATA_PROJECT:
            const data = action.payload as Array<Project>

            return { ...state, isLoading: false, error: null, project: data.map((project) => ({ ...project, isActive: false })) }

        case UPDATE_DATA_PROJECT:
            const incomingProject: Project = action.payload

            if (state.project?.length) {
                return {
                    ...state,
                    isLoading: false,
                    isActionLoading: { status: false, projectId: "" },
                    error: null,
                    project: state.project.map((project) => project._id === incomingProject._id ? incomingProject : project)
                }
            }

            return state

        case CREATE_NEW_PROJECT:
            const newProject = action.payload as Project
            return { ...state, isLoading: false, error: null, project: [...state.project!, { ...newProject, isActive: false }] }

        case DELETE_PROJECT:
            const deletedProjectId = action.payload
            return { ...state, isLoading: false, error: null, project: state.project?.filter((project) => project._id !== deletedProjectId)! }

        default:
            return state
    }

}

export default projectReducer