export default {
  environment: process.env.NODE_ENV || 'development',
  baseUrl: process.env.API_PATH || '/main-service/api/v1',
  session: process.env.SESSION || 'secret-boilerplate-token',
  token: process.env.TOKEN || 'secret-jwt-token',
  database: {
    name: process.env.DB_NAME || 'task',
    user: process.env.DB_USER || 'mongoose',
    password: process.env.DB_PASSWORD || 'mongoose',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    dialect: process.env.DB_DIALECT || 'mysql',
  },
};
