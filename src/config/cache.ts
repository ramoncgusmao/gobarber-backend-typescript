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
      Host: 'localhost',
      Port: 6379,
      password: undefined,
    },
  },
} as ICacheConfig;
