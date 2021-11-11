import { Request, Response, NextFunction } from 'express';

import userService from '../service/user.service';
import clientScriptAuth from './clientScript-auth';

import { IoRedis } from '../config/redis';
import sendHTTPError from '../util/sendError';
import jwt from '../util/jwt';
import logger from '../config/logger';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {

    const { __tkn__, _resh__ }: { __tkn__: string, _resh__: string } = req.cookies

    const clientScriptAccessToken = req.headers['x-client-token'] as string | undefined
    if(clientScriptAccessToken) return await clientScriptAuth(clientScriptAccessToken, res, next).catch((err) => {
        logger.error('ClientScriptError', err.message);
        return sendHTTPError(res, err.message);
    });

    if (!__tkn__) return sendHTTPError(res, 'Unauthorized!', 401);

    try {

        const verifiedToken = jwt.verifyToken(__tkn__);
        if (!verifiedToken.valid && verifiedToken?.expired !== 'Token expired') return sendHTTPError(res, 'Unauthorized!', 401);

        if (verifiedToken.expired === 'Token expired') {

            if (!_resh__) return sendHTTPError(res, `${verifiedToken.expired ? verifiedToken.expired : 'Unauthorized!'}`, 401);

            const verifiedRefreshToken = jwt.verifyToken(_resh__);
            if (!verifiedRefreshToken.valid) return sendHTTPError(res, `${verifiedRefreshToken?.expired ? verifiedRefreshToken.expired : 'Unauthorized!'}`, 401);

            // Refresh token authorized
            const { email } = verifiedRefreshToken.data as { email: string }
            const user = await userService.findOne({ email });
            if (!user) return sendHTTPError(res, 'Unauthorized!', 401);

            const newAccessToken = await userService.reIssueAccessToken(email);
            res.cookie('__tkn__', newAccessToken, { expires: new Date(Date.now() + 900000)  });

            res.locals.user = user
            return next();
        }

        const { sessionId } = verifiedToken.data as { sessionId: string }
        const ioRedis = new IoRedis();

        const user = JSON.parse(await ioRedis.get(sessionId));
        if (!user) return sendHTTPError(res, 'Unauthorized!', 401);

        res.locals.user = user;
        return next();

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

export default authMiddleware