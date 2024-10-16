import * as Joi from 'joi';

/** This code exports a validation schema object created using the Joi library. The schema defines the
expected shape and types of environment variables that will be used in a Node.js application. The
schema includes validation rules for various environment variables such as `NODE_ENV`, `APP_NAME`,
`APP_DESCRIPTION`, `APP_VERSION`, `APP_PORT`, `APP_IS_PRODUCTION`, `DB_HOST`, `DB_PORT`,
`POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `DB_TYPE`, and more. This schema can be used to validate the
environment variables before the application starts running to ensure that they meet the expected
requirements. */

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  APP_NAME: Joi.string().required(),
  APP_DESCRIPTION: Joi.string().required(),
  APP_VERSION: Joi.string().required(),
  APP_PORT: Joi.number().default(3000),
  APP_IS_PRODUCTION: Joi.boolean().required(),
  
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  DB_TYPE: Joi.string().valid('postgres', 'mysql').required(),
  DB_SYNCHRONIZE_ENTITIES: Joi.boolean().required(),

  // PGADMIN_DEFAULT_EMAIL: Joi.string().email().required(),
  // PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),

  DATABASE_URL: Joi.string().uri().required(),
});
