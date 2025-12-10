import { devEnv } from '../config/dev.env';
import { qaEnv } from '../config/qa.env';

export type EnvConfig = typeof devEnv;

export const getEnvConfig = (): EnvConfig => {
  const env = process.env.ENV || 'dev';
  switch (env) {
    case 'qa':
      return qaEnv;
    case 'dev':
    default:
      return devEnv;
  }
};
