/**
 * This function exports a configuration object with environment variables for a Node.js application,
 * including app name, description, version, and database credentials.
 */
export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    name: process.env.APP_NAME,
    description: process.env.APP_DESCRIPTION,
    version: process.env.APP_VERSION,
    isProduction: Boolean(process.env.APP_IS_PRODUCTION),
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME || 'mydb',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    type: process.env.DB_TYPE || 'postgres',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
  },
 });
