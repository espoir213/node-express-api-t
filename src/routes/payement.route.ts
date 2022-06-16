import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import UploadFile from '@/middlewares/upload/upload-file';
import authMiddleware from '@/middlewares/auth.middleware';
import PayementController from '@/controllers/payement.controller';

class PayementRoute implements Routes {
  public path = '/payement';
  public router = Router();
  public payementController = new PayementController();
  public uploadFile = new UploadFile();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.payementController.getAllPayement);

    this.router.get(`${this.path}/:id`, authMiddleware, this.payementController.getPayementById);

    this.router.post(`${this.path}`, authMiddleware, this.payementController.createPayement);

    this.router.put(`${this.path}/:id`, authMiddleware, this.payementController.updatePayement);

    this.router.delete(`${this.path}/:id`, authMiddleware, this.payementController.deletePayement);

    this.router.get(`${this.path}/page/:pageSize/:page`, authMiddleware, this.payementController.getPayementPaginate);
  }
}

export default PayementRoute;
