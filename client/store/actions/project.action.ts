import { Dispatch } from 'redux';

import { REQUEST_PROJECT, SET_ERROR_PROJECT, SET_DATA_PROJECT, CREATE_NEW_PROJECT, DELETE_PROJECT, REQUEST_ACTION_PROJECT, UPDATE_DATA_PROJECT } from '../action.types';
import { createProjectAPI, CreateProjectType, deleteProjectAPI, getProjectsAPI, updateProjectAPI, UpdateProjectType } from '../../apis/project.api';

export const getProjects = () => async (dispatch: Dispatch) => {

    dispatch({ type: REQUEST_PROJECT });

    try {

        const { data, error } = await getProjectsAPI();
        if (error) return dispatch({ type: SET_ERROR_PROJECT, payload: error });

        return dispatch({ type: SET_DATA_PROJECT, payload: data });

    } catch (error: any) {
        dispatch({ type: SET_ERROR_PROJECT, payload: error.message });
    }

}

export const createProject = (data: CreateProjectType) => async (dispatch: Dispatch) => {

    dispatch({ type: REQUEST_PROJECT });

    try {

        const { data: result, error } = await createProjectAPI(data);
        if (error) return dispatch({ type: SET_ERROR_PROJECT, payload: error });

        // TODO: Create new action
        dispatch({ type: CREATE_NEW_PROJECT, payload: result });

    } catch (error: any) {
        dispatch({ type: SET_ERROR_PROJECT, payload: error.message });
    }
}

export const deleteProject = (projectId: string) => async (dispatch: Dispatch) => {

    dispatch({ type: REQUEST_ACTION_PROJECT, payload: projectId });

    try {

        const { data, error } = await deleteProjectAPI(projectId);
        if (error) return dispatch({ type: SET_ERROR_PROJECT, payload: error });

        dispatch({ type: DELETE_PROJECT, payload: data.projectId });

    } catch (error: any) {
        dispatch({ type: SET_ERROR_PROJECT, payload: error.message });
    }
}

export const updateProject = (projectId: string, data: UpdateProjectType) => async (dispatch: Dispatch) => {

    dispatch({ type: REQUEST_ACTION_PROJECT, payload: projectId });

    try {

        const { data: result, error } = await updateProjectAPI(projectId, data);
        if (error) return dispatch({ type: SET_ERROR_PROJECT, payload: error });

        dispatch({ type: UPDATE_DATA_PROJECT, payload: result });

    } catch (error: any) {
        dispatch({ type: SET_ERROR_PROJECT, payload: error.message });
    }
}