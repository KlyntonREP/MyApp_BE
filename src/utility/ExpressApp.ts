import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import { errorHandler, notFound } from "../middlewares/error.middleware";
import hpp from "hpp";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "../docs/swagger";
import { userRoutes, postRoutes} from "../routes/index";
import http from "http"
import createWebSocketServer from "../wsServer"
import passport from 'passport';
import './passport';
import session from 'express-session';


export default (app: Application) => {

  //This block of code we are setting our socket io server
  const wsServer = http.createServer(app);
  createWebSocketServer(wsServer);


  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //set cross origin resource sharing
  app.use(cors());


  // Sanitize data
  app.use(mongoSanitize());

  // Set security headers
  app.use(helmet());

  // Prevent http para
  app.use(hpp());

  //setting up swagger doc
  const specs = swaggerJsDoc(options);
  app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use(session({
    secret: 'somethingsecretgoeshere',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
 }));

  app.use(passport.initialize());
  app.use(passport.session());

  //   declaring the routes
  app.use("/api/user", userRoutes);
  app.use("/api/post", postRoutes);

  // Error handler
  app.use(notFound);
  app.use(errorHandler);

  return wsServer;
};
