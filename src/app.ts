import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import { createConnection } from 'typeorm';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import formData from 'express-form-data';
import cookieParser from 'cookie-parser';
import path from 'path';
import UploadFile from './middlewares/upload/upload-file';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public uploadFile = new UploadFile();

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.env !== 'test' && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.uploadFile.verifierIfDirectory();
    this.app.use(express.static('apidocs'));
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    createConnection(dbConnection);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.initializeFormData();
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeFormData() {
    this.app.use(formData.stream());
    this.app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'CARTOOL API',
          version: '1.0.0',
          description: 'docs',
        },
      },
      apis: [
        'apidoc/assurance-swagger.yaml',
        'apidoc/dashboard-swagger.yaml',
        'apidoc/campagne-swagger.yaml',
        'apidoc/carte-travail-client-swagger.yaml',
        'apidoc/client-swagger.yaml',
        'apidoc/devis-swagger.yaml',
        'apidoc/info-devis-swagger.yaml',
        'apidoc/facture-swagger.yaml',
        'apidoc/info-facture-swagger.yaml',
        'apidoc/fournisseur-swagger.yaml',
        'apidoc/inventaire-swagger.yaml',
        'apidoc/membre-swagger.yaml',
        'apidoc/payement-swagger.yaml',
        'apidoc/piece-commande-swagger.yaml',
        'apidoc/projet-swagger.yaml',
        'apidoc/user-swagger.yaml',
      ],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }
}

export default App;
