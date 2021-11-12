import { Dispatch } from 'redux';

import { getAppsAPI } from '../../apis/app.api';
import { REQUEST_APP, SET_DATA_APP, SET_ERROR_APP } from '../action.types';

export const getApps = (projectId: string) => async (dispatch: Dispatch) => {

    dispatch({ type: REQUEST_APP });

    try {
        
        const { data, error } = await getAppsAPI(projectId);
        if(error) return dispatch({ type: SET_ERROR_APP, payload: error });

        return dispatch({ type: SET_DATA_APP, payload: data });

    } catch (error: any) {
        dispatch({ type: SET_ERROR_APP, payload: error.message });
    }

}