import InfosDevisController from '@/controllers/info-devis.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

class InfosDevisRoute {
  public path = '/infos-devis';
  public router = Router();
  public InfosDevisController = new InfosDevisController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/by-devis/:idDevis`, authMiddleware, this.InfosDevisController.getAllInfosDevisByIdDevis);
    this.router.get(`${this.path}/:id`, authMiddleware, this.InfosDevisController.getInfoDevisById);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.InfosDevisController.deleteInfoDevis);
    this.router.post(`${this.path}`, authMiddleware, this.InfosDevisController.createInfoDevis);
    this.router.put(`${this.path}/:id`, authMiddleware, this.InfosDevisController.updateInfoDevis);
  }
}

export default InfosDevisRoute;
