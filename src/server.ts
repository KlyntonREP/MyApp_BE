import express from 'express';
import log from './utility/logger';
import 'dotenv/config';
import ExpressApp from './utility/ExpressApp';
import connectDB from './config/db';
import dotenv from 'dotenv';
import * as fs from 'fs';
import http from 'http';
import https from 'https';

dotenv.config();

const privateKey = process.env.NODE_ENV === 'production' ? fs.readFileSync('../privkey.pem', 'utf8') : '';
// const privateKey = process.env.NODE_ENV === 'production' ? fs.readFileSync('/etc/letsencrypt/live/api.gettrill.com/privkey.pem', 'utf8') : '';

const certificate = process.env.NODE_ENV === 'production' ? fs.readFileSync('../fullchain.pem', 'utf8') : '';

const StartServer = async () => {
    const app = express();

    await ExpressApp(app);

    await connectDB();

    const PORT = process.env.PORT || 1335;

    // Starting either http or https server
    const server =
        process.env.NODE_ENV === 'production'
            ? https.createServer(
                  {
                      key: privateKey,
                      cert: certificate,
                  },
                  app,
              )
            : http.createServer(app);

    server.listen(PORT, () => {
        log.info(`Server listening on: http://localhost:${PORT}`);
        log.info(`Swagger doc listening on: http://localhost:${PORT}/api/docs`);
    });
};

StartServer();
