import FactureController from '@/controllers/facture.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

class FactureRoute {
  public path = '/facture';
  public router = Router();
  public factureController = new FactureController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.factureController.getAllFacture);
    this.router.get(`${this.path}/:id`, authMiddleware, this.factureController.getFactureById);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.factureController.deleteFacture);
    this.router.post(`${this.path}`, authMiddleware, this.factureController.createFacture);
    this.router.put(`${this.path}/:id`, authMiddleware, this.factureController.updateFacture);
    this.router.get(`${this.path}/page/:pageSize/:page`, authMiddleware, this.factureController.getFacturePaginate);
    this.router.get(`${this.path}/by-status/:status`, authMiddleware, this.factureController.getAllFactureByStatus);
  }
}

export default FactureRoute;
