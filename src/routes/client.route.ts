import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ClientController from '@/controllers/client.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class ClientRoute implements Routes {
  public path = '/client';
  public path2 = '/client-sms';
  public path3 = '/client-projet';
  public path4 = '/client-remarques';
  public router = Router();
  public clientController = new ClientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.clientController.getAllClient);
    this.router.get(`${this.path}/:id`, this.clientController.getClientById);
    this.router.post(`${this.path}`, authMiddleware, this.clientController.createClient);
    this.router.put(`${this.path}/:id`, authMiddleware, this.clientController.updateClient);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.clientController.deleteClient);
    this.router.get(`${this.path}/page/:pageSize/:page`, authMiddleware, this.clientController.getClientPaginate);
    // sms client
    this.router.post(`${this.path2}`, authMiddleware, this.clientController.sendSmsClient);
    // projet client
    this.router.get(`${this.path3}/:idClient`, authMiddleware, this.clientController.getAllProjetByClientId);
    //remarques client
    this.router.post(`${this.path4}`, authMiddleware, this.clientController.createRemarqueClient);
    this.router.delete(`${this.path4}/:idRermaque`, authMiddleware, this.clientController.deleteRemarqueClient);
  }
}

export default ClientRoute;
