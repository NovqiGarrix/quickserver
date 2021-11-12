import { Dispatch } from 'redux';

import { REQUEST_PROJECT, SET_ERROR_PROJECT, SET_DATA_PROJECT } from '../action.types';
import { getProjectsAPI } from '../../apis/project.api';

export const getProjects = () => async (dispatch: Dispatch) => {

    dispatch({ type: REQUEST_PROJECT });

    try {
        
        const { data, error } = await getProjectsAPI();
        if(error) return dispatch({ type: SET_ERROR_PROJECT, payload: error });

        return dispatch({ type: SET_DATA_PROJECT, payload: data });

    } catch (error: any) {
        dispatch({ type: SET_ERROR_PROJECT, payload: error.message });
    }

}