import PieceCommandeController from '@/controllers/piece-commande.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

class PieceCommandeRoute {
  public path = '/piece-commande';
  public router = Router();
  public PieceCommandeController = new PieceCommandeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.PieceCommandeController.getAllPieceCommande);
    this.router.get(`${this.path}/:id`, authMiddleware, this.PieceCommandeController.getPieceCommandeById);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.PieceCommandeController.deletePieceCommande);
    this.router.post(`${this.path}`, authMiddleware, this.PieceCommandeController.createPieceCommande);
    this.router.put(`${this.path}/:id`, authMiddleware, this.PieceCommandeController.updatePieceCommande);
  }
}

export default PieceCommandeRoute;
