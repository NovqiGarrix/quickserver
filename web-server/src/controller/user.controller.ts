import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { IoRedis } from '../config/redis';
import sendHTTPError from '../util/sendError';

export const getCurrentUser = async (req: Request, res: Response): Promise<Response> => {

    const user = res.locals.user
    const ioRedis = new IoRedis();

    try {

        const sessionId = new mongoose.Types.ObjectId().toString();

        // For updating cache -> Delete the previous one, and insert the existing one
        const cacheId = `user-${sessionId}`;
        await ioRedis.set(cacheId, 900, 'OK');

        const response = {
            data: user,
            cache: cacheId,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}