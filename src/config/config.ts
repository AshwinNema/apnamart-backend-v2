import { z } from 'zod';

export enum environments {
  production = 'production',
  development = 'development',
  test = 'test',
}
interface config {
  NODE_ENV: environments;
  PORT: number;
}
const envVarsSchema = z.object({
  NODE_ENV: z.enum([
    environments.production,
    environments.development,
    environments.test,
  ]),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().url(),
});

export const validateConfig = (config: config) => {
  const configuration = envVarsSchema.parse(config);
  return {
    env: configuration.NODE_ENV,
    port: configuration.PORT,
  };
};
