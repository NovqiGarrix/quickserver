import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useCheckToken = () => {

    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!(accessToken && refreshToken)) {
            router.replace('/login');
            return;
        }
    }, [router]);

}

export default useCheckToken