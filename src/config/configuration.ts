export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  databaseConnectionString: process.env.DATABASE_CONNECTION_STRING,
});
