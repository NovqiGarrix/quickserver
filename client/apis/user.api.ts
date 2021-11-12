import axios from 'axios';

const API = axios.create({ baseURL: `${process.env.SERVER_URL}/api/v1/user` });

API.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken')!;
    const refreshToken = localStorage.getItem('refreshToken')!;

    config.headers = {
        'x-access-token': accessToken,
        'x-refresh-token': refreshToken
    }

    return config
}, (error) => {
    console.warn(error.message);
    return Promise.reject(error);
})

API.interceptors.response.use((result) => {

    const { data: { newAccessToken } } = result
    if(newAccessToken) localStorage.setItem('accessToken', newAccessToken);

    return result
}, (onRejected) => Promise.reject(onRejected));

export async function getUserAPI() {
    const { data } = await API.get('/')
    return data
}