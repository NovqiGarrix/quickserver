import { AnyAction, Reducer } from 'redux';
import { REQUEST_PROJECT, SET_DATA_PROJECT, SET_ERROR_PROJECT, UPDATE_DATA_PROJECT } from '../action.types';

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

    error: string | null;

    project: Array<Project> | null 
    
}

const initializeState: IProjectReducer = {
    isLoading: false,
    error: null,
    project: null
}

const projectReducer: Reducer = (state: IProjectReducer = initializeState, action: AnyAction): IProjectReducer => {

    switch (action.type) {
        case REQUEST_PROJECT:
            return { ...state, isLoading: true }

        case SET_ERROR_PROJECT:
            return { ...state, isLoading: false, error: action.payload }

        case SET_DATA_PROJECT:
            const data = action.payload as Array<Project>

            return { ...state, isLoading: false, error: null, project: data.map((project) => ({ ...project, isActive: false })) }

        case UPDATE_DATA_PROJECT:
            const incomingProject: Project = action.payload

            if(state.project?.length) {
                return {
                    ...state,
                    isLoading: false,
                    error: null,
                    project: state.project.map((project) => project._id === incomingProject._id ? incomingProject : project)
                }
            }

            return state
    
        default:
            return state
    }

}

export default projectReducer