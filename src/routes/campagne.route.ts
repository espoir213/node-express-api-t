import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import UploadFile from '@/middlewares/upload/upload-file';
import authMiddleware from '@/middlewares/auth.middleware';
import AdminOnly from '@/middlewares/auth-admin.middleware';
import CampagneController from '@/controllers/campagne.controller';

class CampagneRoute implements Routes {
  public path = '/campagne';
  public path2 = '/type-dest';
  public router = Router();
  public CampagneController = new CampagneController();
  public uploadFile = new UploadFile();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.CampagneController.getAllCampagne);

    this.router.get(`${this.path}/:id`, authMiddleware, this.CampagneController.getCampagneById);

    this.router.post(`${this.path}`, authMiddleware, this.CampagneController.createCampagne);

    this.router.delete(`${this.path}/:id`, authMiddleware, this.CampagneController.deleteCampagne);

    this.router.get(`${this.path}/page/:pageSize/:page`, authMiddleware, this.CampagneController.getCampagnePaginate);

    this.router.get(`${this.path2}`, authMiddleware, this.CampagneController.getAllTypeDestCampagne);

    this.router.get(`${this.path}/recipients/:id`, authMiddleware, this.CampagneController.getAllCampagneRecipientsByIdCampagne);
  }
}

export default CampagneRoute;
