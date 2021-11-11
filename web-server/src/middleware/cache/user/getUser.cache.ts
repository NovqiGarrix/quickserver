import { Request, Response, NextFunction } from 'express';

import sendHTTPError from '../../../util/sendError';
import { IoRedis } from '../../../config/redis';

const getUserCache = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const cache: string | undefined = req.headers['cache-control']
    if (!cache) return next();

    try {

        const ioRedis = new IoRedis();
        const cacheStatus = await ioRedis.get(cache);
        if (cacheStatus !== 'OK') {
            await ioRedis.del(cache)
            return next();
        }

        return res.sendStatus(304);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }


}

export default getUserCache