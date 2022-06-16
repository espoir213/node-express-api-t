import CarteTravailClientController from '@/controllers/carte-travail-client.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

class CarteTravailClientRoute {
  public path = '/carte-travail-client';
  public router = Router();
  public carteTravailClientController = new CarteTravailClientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/by-client/:idClient`, authMiddleware, this.carteTravailClientController.getAllCarteTravailClient);
    this.router.get(`${this.path}/:id`, authMiddleware, this.carteTravailClientController.getCarteTravailClientById);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.carteTravailClientController.deleteCarteTravailClient);
    this.router.post(`${this.path}`, authMiddleware, this.carteTravailClientController.createCarteTravailClient);
    this.router.put(`${this.path}/:id`, authMiddleware, this.carteTravailClientController.updateCarteTravailClient);
    this.router.get(`${this.path}-status`, authMiddleware, this.carteTravailClientController.getAllStatusCarteTravailClient);
  }
}

export default CarteTravailClientRoute;
