import bcrypt from 'bcryptjs';
import mongoose, { FilterQuery } from 'mongoose';
import { IoRedis } from '../config/redis';

import UserModel, { User } from "../model/user.model";
import jwt from '../util/jwt';

async function createUser(user: Omit<User, '_id' | 'apiKey' | 'createdAt' | 'updatedAt'>): Promise<Omit<User, 'password'>> {

    const apiKey = await bcrypt.hash(`${user.email}${user.name}`, 10);

    const userData = { ...user, apiKey }
    const newUser = await UserModel.create(userData);

    return {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        apiKey: newUser.apiKey,
        img: newUser.img,
        isGoogleAccount: newUser.isGoogleAccount,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
    }

}

async function findOne(filter: FilterQuery<User>, projection?: Record<string, number>): Promise<Omit<User, 'password'> | undefined> {
    return await UserModel.findOne(filter, projection).lean();
}

async function findById(_id: string, projection?: Record<string, number>): Promise<Omit<User, 'password'> | undefined> {
    return await UserModel.findById(_id, projection).lean();
}

async function reIssueAccessToken(email: string): Promise<string> {
    const user = await findOne({ email });
    const ioRedis = new IoRedis();

    await ioRedis.set(email, 960, JSON.stringify(user));
    return jwt.signToken({ email }, { expiresIn: '15m' });
}


export default { createUser, findOne, findById, reIssueAccessToken }