import { AnyAction, Reducer } from 'redux';
import { REQUEST_APP, SET_DATA_APP, SET_ERROR_APP, UPDATE_DATA_APP } from '../action.types';

import { CodeIcon, DeviceMobileIcon, DeviceTabletIcon } from '@heroicons/react/outline';

export type App = {
    _id: string;
    userId: string;
    projectId: string;
    name: string;
    type: 'web' | 'ios' | 'android';
    Icon: any;
    createdAt: string;
    updatedAt: string;
}

export interface IAppReducer {

    isLoading: boolean;

    error: string | null;

    app: Array<App> | null 
    
}

const initializeState: IAppReducer = {
    isLoading: false,
    error: null,
    app: null
}

const appReducer: Reducer = (state: IAppReducer = initializeState, action: AnyAction): IAppReducer => {

    switch (action.type) {
        case REQUEST_APP:
            return { ...state, isLoading: true }

        case SET_ERROR_APP:
            return { ...state, isLoading: false, error: action.payload }

        case SET_DATA_APP:
            const data = action.payload as Array<App>

            return { ...state, isLoading: false, error: null, app: data.map((app) => ({ ...app, Icon: app.type === 'web' ? CodeIcon : app.type === 'ios' ? DeviceMobileIcon : DeviceTabletIcon })) }
    
        default:
            return state
    }

}

export default appReducer