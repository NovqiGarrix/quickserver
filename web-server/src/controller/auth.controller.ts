import { Request, Response } from 'express';

import authService from '../service/auth.service';
import { encodeBase64 } from '../util/base64';
import sendHTTPError from '../util/sendError';

export const getAuthURL = async (req: Request, res: Response): Promise<Response> => {

    try {

        const authURL = authService.getAuthURL();
        const response = {
            data: authURL,
            error: null
        }

        return res.send(response)

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

export const handleOAuthRedirect = async (req: Request, res: Response): Promise<void> => {

    const code = req.query.code as string

    try {

        const isSuccess = await authService.loginWithGoogle(code);
        if (!isSuccess.ok) return res.redirect(`${process.env.CLIENT_URL}/login?error=${isSuccess.message}`);

        res.cookie('__tkn__', isSuccess.data.accessToken, { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.cookie('_resh__', isSuccess.data.refreshToken, { expires: new Date(Date.now() + (3600 * 1000) * (24 * 30) * 12), httpOnly: true });
        return res.redirect(`${process.env.CLIENT_URL}/login`);

    } catch (error: any) {
        return res.redirect(`${process.env.CLIENT_URL}/login?error=${error.message}`);
    }

}

