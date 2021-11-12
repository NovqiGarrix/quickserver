import { Request, Response } from 'express';
import sendHTTPError from '../util/sendError';

export const getCurrentUser = async (req: Request, res: Response): Promise<Response> => {

    const user = res.locals.user
    const newAccessToken = res.locals.newAccessToken

    try {

        const response = {
            data: user,
            newAccessToken,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}