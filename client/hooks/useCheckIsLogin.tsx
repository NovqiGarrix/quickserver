import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useCheckIsLogin = () => {

    const router = useRouter();

    useEffect(() => {
        // Create a checker endpoint!

        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
            router.replace('/');
            return;
        }
    }, [router]);

}

export default useCheckIsLogin