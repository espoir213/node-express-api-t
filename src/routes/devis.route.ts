import DevisController from '@/controllers/devis.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

class DevisRoute {
  public path = '/devis';
  public router = Router();
  public devisController = new DevisController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.devisController.getAllDevis);
    this.router.get(`${this.path}/:id`, authMiddleware, this.devisController.getDevisById);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.devisController.deleteDevis);
    this.router.post(`${this.path}`, authMiddleware, this.devisController.createDevis);
    this.router.put(`${this.path}/:id`, authMiddleware, this.devisController.updateDevis);
    this.router.get(`${this.path}/page/:pageSize/:page`, authMiddleware, this.devisController.getDevisPaginate);
  }
}

export default DevisRoute;
