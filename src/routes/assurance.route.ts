import AssuranceController from '@/controllers/assurance.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

class AssuranceRoute {
  public path = '/assurance';
  public router = Router();
  public AssuranceController = new AssuranceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.AssuranceController.getAllAssurance);
    this.router.get(`${this.path}/:id`, authMiddleware, this.AssuranceController.getAssuranceById);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.AssuranceController.deleteAssurance);
    this.router.post(`${this.path}`, authMiddleware, this.AssuranceController.createAssurance);
    this.router.put(`${this.path}/:id`, authMiddleware, this.AssuranceController.updateAssurance);
  }
}

export default AssuranceRoute;
