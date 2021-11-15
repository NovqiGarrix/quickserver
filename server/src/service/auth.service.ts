import { Google } from '../config/google';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import jwt from "../util/jwt";
import { IoRedis } from '../config/redis';
import userService from './user.service';

const { findOne, createUser } = userService

function getAuthURL(): string {

    const SCOPES = ['profile', 'email']
    const google = new Google();
    const oAuthClient = google.getClient();

    return oAuthClient.generateAuthUrl({ access_type: 'offline', scope: SCOPES });

}

async function loginWithGoogle(code: string): Promise<{ ok: boolean; message: string, data: { accessToken: string, refreshToken?: string } }> {

    const google = new Google();
    const oAuthClient = google.getClient();

    const { tokens: { id_token } } = await oAuthClient.getToken(code);

    const { data, valid } = jwt.decodeToken(id_token as string);
    if (!valid || !data) return { ok: false, message: "Invalid Credential", data: { refreshToken: '', accessToken: '' } };

    const { name, email, picture } = data as { name: string, email: string, picture: string }
    const existUser = await findOne({ email });

    const ioRedis = new IoRedis();

    if (existUser) {
        await ioRedis.set(existUser.email, 960, JSON.stringify(existUser)); // 1 minutes longer in redis
        const accessToken = jwt.signToken({ email: existUser.email }, { expiresIn: '15m' });
        const refreshToken = jwt.signToken({ email: existUser.email }, { expiresIn: '1y' });

        return {
            ok: true,
            message: 'OK!',
            data: { accessToken, refreshToken }
        }
    }

    const newUser = await createUser({ name, email, isGoogleAccount: true, img: picture });
    await ioRedis.set(newUser.email, 960, JSON.stringify(newUser)); // 1 minutes longer in redis

    const accessToken = jwt.signToken({ email: newUser.email }, { expiresIn: '15m' });
    const refreshToken = jwt.signToken({ email: newUser.email }, { expiresIn: '1y' });

    return {
        ok: true,
        message: 'OK!',
        data: { accessToken, refreshToken }
    }
}

export default { getAuthURL, loginWithGoogle }