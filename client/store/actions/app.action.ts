import { Dispatch } from 'redux';

import { createAppAPI, CreateAppType, deleteAppAPI, getAppsAPI } from '../../apis/app.api';
import { CREATE_NEW_APP, CREATING_NEW_APP, DELETE_APP, REQUEST_ACTION_APP, REQUEST_APP, SET_DATA_APP, SET_ERROR_APP, SET_ERROR_CREATING_NEW_APP } from '../action.types';

export const getApps = (projectId: string) => async (dispatch: Dispatch) => {

    dispatch({ type: REQUEST_APP });

    try {

        const { data, error } = await getAppsAPI(projectId);
        if (error) return dispatch({ type: SET_ERROR_APP, payload: error });

        return dispatch({ type: SET_DATA_APP, payload: data });

    } catch (error: any) {
        dispatch({ type: SET_ERROR_APP, payload: error.message });
    }

}

export const deleteApp = (projectId: string, appId: string) => async (dispatch: Dispatch) => {

    dispatch({ type: REQUEST_ACTION_APP, payload: appId });

    try {

        const { data, error } = await deleteAppAPI(projectId, appId);
        if (error) return dispatch({ type: SET_ERROR_APP, payload: error });

        dispatch({ type: DELETE_APP, payload: data.appId });

    } catch (error: any) {
        dispatch({ type: SET_ERROR_APP, payload: error.message });
    }
}

export const createApp = (projectId: string, data: CreateAppType) => async (dispatch: Dispatch) => {

    dispatch({ type: CREATING_NEW_APP });

    try {
        const { data: result, error } = await createAppAPI(projectId, data);
        if (error) return dispatch({ type: SET_ERROR_CREATING_NEW_APP, payload: error });

        dispatch({ type: CREATE_NEW_APP, payload: result });

    } catch (error: any) {
        dispatch({ type: SET_ERROR_CREATING_NEW_APP, payload: error.message });
    }
}