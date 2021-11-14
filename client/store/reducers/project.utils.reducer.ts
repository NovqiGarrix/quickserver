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