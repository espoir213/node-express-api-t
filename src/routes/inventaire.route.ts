import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import UploadFile from '@/middlewares/upload/upload-file';
import authMiddleware from '@/middlewares/auth.middleware';
import InventaireController from '@/controllers/inventaire.controller';

class InventaireRoute implements Routes {
  public path = '/inventaire';
  public router = Router();
  public inventaireController = new InventaireController();
  public uploadFile = new UploadFile();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.inventaireController.getAllInventaire);

    this.router.get(`${this.path}/:id`, authMiddleware, this.inventaireController.getInventaireById);

    this.router.post(`${this.path}`, authMiddleware, this.inventaireController.createInventaire);

    this.router.put(`${this.path}/:id`, authMiddleware, this.inventaireController.updateInventaire);

    this.router.delete(`${this.path}/:id`, authMiddleware, this.inventaireController.deleteInventaire);

    this.router.get(`${this.path}/page/:pageSize/:page`, authMiddleware, this.inventaireController.getInventairePaginate);
  }
}

export default InventaireRoute;
