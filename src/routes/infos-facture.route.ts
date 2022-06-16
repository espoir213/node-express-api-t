import InfosFactureController from '@/controllers/info-facture.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

class InfosFactureRoute {
  public path = '/infos-facture';
  public router = Router();
  public InfosFactureController = new InfosFactureController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/by-Facture/:idFacture`, authMiddleware, this.InfosFactureController.getAllInfosFactureByIdFacture);
    this.router.get(`${this.path}/:id`, authMiddleware, this.InfosFactureController.getInfoFactureById);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.InfosFactureController.deleteInfoFacture);
    this.router.post(`${this.path}`, authMiddleware, this.InfosFactureController.createInfoFacture);
    this.router.put(`${this.path}/:id`, authMiddleware, this.InfosFactureController.updateInfoFacture);
  }
}

export default InfosFactureRoute;
