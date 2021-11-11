import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV

const REDIS_PORT = process.env.REDIS_PORT
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PASS = process.env.REDIS_PASS

const REDIS_HOST_TEST = process.env.REDIS_HOST_TEST
const REDIS_PORT_TEST = +process.env.REDIS_PORT_TEST!

export class IoRedis {

    private static redisClient: Redis.Redis

    getConnection(): Redis.Redis {
        if(!IoRedis.redisClient) {
            IoRedis.redisClient = NODE_ENV !== 'production' ? new Redis(REDIS_PORT_TEST, REDIS_HOST_TEST) : new Redis(`redis://:${REDIS_PASS}@${REDIS_HOST}:${REDIS_PORT}/0`)
            return IoRedis.redisClient
        }

        return IoRedis.redisClient
    }

    async get(key: string): Promise<any | undefined> {
        return IoRedis.redisClient.get(key)
    }

    async set(key: string, seconds: number, value: string): Promise<string> {
        return await IoRedis.redisClient.setex(key, seconds, value);
    }

    async del(key: string): Promise<void> {
        await IoRedis.redisClient.del(key);
    }

}