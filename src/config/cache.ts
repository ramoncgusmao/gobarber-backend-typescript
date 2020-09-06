import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: string;

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  config: {
    redis: {
      Host: process.env.REDIS_HOST,
      Port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig;
