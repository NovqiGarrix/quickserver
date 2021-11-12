import { Dispatch } from 'redux';

import { REQUEST_USER, SET_ERROR_USER, SET_DATA_USER } from '../action.types';
import { getUserAPI } from '../../apis/user.api';

export const getUser = () => async (dispatch: Dispatch) => {

    dispatch({ type: REQUEST_USER });

    try {
        
        const { data, error } = await getUserAPI();
        if(error) {
            return dispatch({ type: SET_ERROR_USER, payload: error });
        }

        return dispatch({ type: SET_DATA_USER, payload: data });

    } catch (error: any) {
        dispatch({ type: SET_ERROR_USER, payload: error.message });
    }
}