import { EnvConfig } from 'src/interfaces/config.interface';

export const config = (): EnvConfig => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  mongodb: process.env.DATABASE_CONNECTION_STRING,
});
