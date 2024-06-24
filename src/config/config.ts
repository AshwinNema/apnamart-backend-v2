import { z } from 'zod';

export enum environments {
  production = 'production',
  development = 'development',
  test = 'test',
}
interface config {
  NODE_ENV: environments;
  PORT: number;
  JWT_ACCESS_EXPIRATION: number;
  JWT_REFRESH_EXPIRATION: number;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
}
const envVarsSchema = z.object({
  NODE_ENV: z.enum([
    environments.production,
    environments.development,
    environments.test,
  ]),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_EXPIRATION: z.coerce.number(),
  JWT_REFRESH_EXPIRATION: z.coerce.number(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
});

export const validateConfig = (config: config) => {
  const configuration = envVarsSchema.parse(config);

  return {
    env: configuration.NODE_ENV,
    port: configuration.PORT,
    jwt: {
      access_secret: configuration.JWT_ACCESS_SECRET,
      refresh_secret: configuration.JWT_REFRESH_SECRET,
      accessTokenExpiration: configuration.JWT_ACCESS_EXPIRATION,
      refreshTokenExpiration: configuration.JWT_REFRESH_EXPIRATION,
    },
  };
};

export const envConfig: z.infer<typeof envVarsSchema> | undefined =
  envVarsSchema.safeParse(process.env)?.data;
