import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import UploadFile from '@/middlewares/upload/upload-file';
import authMiddleware from '@/middlewares/auth.middleware';
import AdminOnly from '@/middlewares/auth-admin.middleware';
import MembreController from '@/controllers/membre.controller';

class MembreRoute implements Routes {
  public path = '/membres';
  public path2 = '/membre-roles';
  public path3 = '/membre-taper';
  public path4 = '/membre-status';
  public router = Router();
  public membreController = new MembreController();
  public uploadFile = new UploadFile();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.membreController.getMembres);

    this.router.get(`${this.path}/:id`, authMiddleware, this.membreController.getMembreById);

    this.router.post(`${this.path}`, authMiddleware, this.membreController.createMembre);

    this.router.put(`${this.path}/:id`, authMiddleware, this.membreController.updateMembre);

    this.router.delete(`${this.path}/:id`, authMiddleware, this.membreController.deleteMembre);

    this.router.get(`${this.path2}`, authMiddleware, this.membreController.getAllRoleMembre);

    this.router.get(`${this.path3}`, authMiddleware, this.membreController.getAllTaperMembre);

    this.router.get(`${this.path4}`, authMiddleware, this.membreController.getAllStatusMembre);

    this.router.get(`${this.path}/page/:pageSize/:page`, authMiddleware, this.membreController.getMembrePaginate);
  }
}

export default MembreRoute;
