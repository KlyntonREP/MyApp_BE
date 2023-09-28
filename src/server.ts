import express from 'express';
import log from './utility/logger';
import "dotenv/config";
import ExpressApp from './utility/ExpressApp';
import connectDB from './config/db';
import dotenv from 'dotenv';

const StartServer = async () => {
  
  const app = express();
  dotenv.config();

  await ExpressApp(app);

  const PORT = process.env.PORT || 1335;

  await connectDB();

  app.listen(PORT, () => {
    log.info(`Server listening on: http://localhost:${PORT}`);
    log.info(`Swagger doc listening on: http://localhost:${PORT}/api/docs`);
  });
};

StartServer();