import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import sendHTTPError from '../util/sendError';
import { decodeBase64 } from '../util/base64';
import { IoRedis } from '../config/redis';
import userService from '../service/user.service';

export default async (bearerToken: string, res: Response, next: NextFunction) => {

    const decodedBearer = JSON.parse(decodeBase64(bearerToken.split(' ')[1]));

    type ClientToken = { bearer: string, data: { userId: string, apiKey: string } }
    const { bearer, data: { userId, apiKey } }: ClientToken = decodedBearer

    try {

        const aValidBearer = await bcrypt.compare('novqigarrix210300', bearer);
        if (!aValidBearer) return sendHTTPError(res, 'Invalid request!', 406);

        // const ioRedis = new IoRedis();

        // const redisData = JSON.parse(await ioRedis.get(userId));
        // if (redisData) {
        //     res.locals.user = redisData
        //     return next();
        // }

        const user = await userService.findOne({ _id: userId, apiKey });
        if (!user) return sendHTTPError(res, 'User not found!', 404);


        // await ioRedis.set(user.email, 900, JSON.stringify(user));
        res.locals.user = user

        return next();

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}