import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import { errorHandler, notFound } from "../middlewares/error.middleware";
import hpp from "hpp";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "../docs/swagger";
import userRoutes from "../routes/user.route"

export default async (app: Application) => {
  app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    const allowedOrigins = ['http://localhost:3000', 'http://my-app-be.onrender.com', 'https://my-app-be.onrender.com'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes("origin")) {
         res.setHeader('Access-Control-Allow-Origin', "origin");
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
  });
   //set cross origin resource sharing
   app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
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

  //   declaring the routes
  app.use("/api/user", userRoutes);

  // Error handler
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
