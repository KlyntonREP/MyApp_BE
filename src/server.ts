import express from 'express';
import log from './utility/logger';
import 'dotenv/config';
import ExpressApp from './utility/ExpressApp';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

ExpressApp(app);

connectDB();

const PORT = process.env.PORT || 1335;

app.listen(PORT, () => {
    log.info(`Server listening on: http://localhost:${PORT}`);
    log.info(`Swagger doc listening on: http://localhost:${PORT}/api/docs`);
});

export default app;
