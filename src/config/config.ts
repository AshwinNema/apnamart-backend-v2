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
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  ENABLE_PRISMA_LOGGING: z.coerce.boolean().default(false),
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
    cloudinary: {
      cloud_name: configuration.CLOUDINARY_CLOUD_NAME,
      api_key: configuration.CLOUDINARY_API_KEY,
      api_secret: configuration.CLOUDINARY_API_SECRET,
    },
    prisma: {
      enable_logging: configuration.ENABLE_PRISMA_LOGGING,
    },
  };
};

export const envConfig: z.infer<typeof envVarsSchema> | undefined =
  envVarsSchema.safeParse(process.env)?.data;
