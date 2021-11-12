import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../store/actions/user.action';
import { RootState } from '../store/';
import { IUserReducer } from '../store/reducers/user.reducer';

const useUser = () => {

    const dispatch = useDispatch();
    const userState: IUserReducer = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return userState
}

export default useUser