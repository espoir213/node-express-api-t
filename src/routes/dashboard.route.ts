import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import DashboardController from '@/controllers/dashboard.controller';

class DashboardRoute implements Routes {
  public path = '/dashboard';
  public router = Router();
  public dashboardController = new DashboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/total-client`, this.dashboardController.getNbTotalClient);
  }
}

export default DashboardRoute;
