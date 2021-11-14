import { FunctionComponent, useEffect } from 'react';

import { LoginIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { decodeBase64 } from '../../utils/base64';

const GoogleLogin: FunctionComponent = () => {

    const router = useRouter();

    useEffect(() => {

        let payload = router.query?.payload as string
        payload = payload ? decodeBase64(payload) : ''

        if (payload) {

            const { accessToken, refreshToken }: { accessToken: string; refreshToken: string } = JSON.parse(payload);
            window.localStorage.setItem('accessToken', accessToken as string);
            window.localStorage.setItem('refreshToken', refreshToken as string);

            document.location.href = `${process.env.BASE_URL}`
        }

        router.replace('/login');

    }, [router]);

    return (
        <div className="bg-white flex items-center justify-center min-h-screen">
            <LoginIcon className="w-10 h-10 animate-bounce text-gray-400" />
        </div>
    )

}

export default GoogleLogin