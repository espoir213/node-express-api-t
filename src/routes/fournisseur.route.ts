import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import UploadFile from '@/middlewares/upload/upload-file';
import authMiddleware from '@/middlewares/auth.middleware';
import AdminOnly from '@/middlewares/auth-admin.middleware';
import FournisseurController from '@/controllers/fournisseur.controller';

class FournisseurRoute implements Routes {
  public path = '/fournisseur';
  public router = Router();
  public FournisseurController = new FournisseurController();
  public uploadFile = new UploadFile();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.FournisseurController.getAllFournisseur);

    this.router.get(`${this.path}/:id`, authMiddleware, this.FournisseurController.getFournisseurById);

    this.router.post(`${this.path}`, authMiddleware, this.FournisseurController.createFournisseur);

    this.router.put(`${this.path}/:id`, authMiddleware, this.FournisseurController.updateFournisseur);

    this.router.delete(`${this.path}/:id`, authMiddleware, this.FournisseurController.deleteFournisseur);

    this.router.get(`${this.path}/page/:pageSize/:page`, authMiddleware, this.FournisseurController.getFournisseurPaginate);
  }
}

export default FournisseurRoute;
