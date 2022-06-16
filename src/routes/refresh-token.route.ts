import RefreshTokenController from '@/controllers/refresh-token.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

class RefreshTokenRoute implements Routes {
  public path = '/refresh-tokens';
  public router = Router();
  public refreshTokenController = new RefreshTokenController();
  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, this.refreshTokenController.getAllRefreshToken);
    this.router.get(`${this.path}/:id`, this.refreshTokenController.getRefreshTokenById);
    this.router.delete(`${this.path}/:id`, this.refreshTokenController.deleteRefreshToken);
    this.router.post(`${this.path}`, this.refreshTokenController.createRefreshToken);
  }
}

export default RefreshTokenRoute;
