import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import { errorHandler, notFound } from '../middlewares/error.middleware';
import hpp from 'hpp';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { options } from '../docs/swagger';
import { userRoutes, postRoutes, socialRoutes } from '../routes/index';
import session from 'express-session';
import MemoryStore from 'memorystore';

export default async (app: Application) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // set cross origin resource sharing
    app.use(cors());

    // Sanitize data
    app.use(mongoSanitize());

    // Set security headers
    app.use(helmet());

    // Prevent http para
    app.use(hpp());

    // setting up swagger doc
    // const specs = swaggerJsDoc(options);
    // app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs));

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
    app.use(express.static(pathToSwaggerUi));
    // Swagger setup
    const specs = swaggerJsDoc(options);
    const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.css';
    app.use(
        '/api-docs',
        express.static('node_modules/swagger-ui-dist/', { index: false }),
        swaggerUI.serve,
        swaggerUI.setup(specs, {
            customCssUrl: CSS_URL,
            customCss: '.opblock-summary-path-description-wrapper { width: 100%; margin-left: 10px; display: flex; align-items: center; }',
        }),
    );

    app.get('/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    const MemStore = MemoryStore(session);

    app.use(
        session({
            store: new MemStore({
                checkPeriod: 86400000, // prune expired entries every 24h
            }),
            secret: 'somethingsecretgoeshere',
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: 86400000 }, // 24 hours
        }),
    );

    //   declaring the routes
    app.use('/', socialRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/post', postRoutes);
    // app.use('/api/chat', chatRoutes);

    // Error handler
    app.use(notFound);
    app.use(errorHandler);

    return app;
};
