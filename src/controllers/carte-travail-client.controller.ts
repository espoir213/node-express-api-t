import { StatusCarteTravail } from '@/entities/carte-travail-client.entity';
import Validator from '@/middlewares/validator';
import CarteTravailClientService from '@/services/carte-travail-client.service';
import { NextFunction, Request, Response } from 'express';

class CarteTravailClientController {
  public serviceCarteTravailClient = new CarteTravailClientService();
  public validation = new Validator();

  public getAllCarteTravailClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clientId = Number(req.params.idClient);
      const findAllCarteTravailClientData = await this.serviceCarteTravailClient.findAllCarteTravailClientByIdClient(clientId);
      res.status(200).json({ data: findAllCarteTravailClientData });
    } catch (error) {
      next(error);
    }
  };

  public getCarteTravailClientById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const carteTravailClientId = Number(req.params.id);
      const findOneCarteTravailClientData = await this.serviceCarteTravailClient.findCarteTravailClientById(carteTravailClientId);
      res.status(200).json({ data: findOneCarteTravailClientData });
    } catch (error) {
      next(error);
    }
  };

  public createCarteTravailClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const carteTravailClient = req.body;
      carteTravailClient.rapportCorporel = JSON.stringify(carteTravailClient.rapportCorporel);
      carteTravailClient.rapportMecanique = JSON.stringify(carteTravailClient.rapportMecanique);
      carteTravailClient.rapportElectrique = JSON.stringify(carteTravailClient.rapportElectrique);
      const createCarteTravailClientData = await this.serviceCarteTravailClient.createCarteTravailClient(carteTravailClient);
      res.status(200).json({ data: createCarteTravailClientData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCarteTravailClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const carteTravailClientId = Number(req.params.id);
      const carteTravailClientData = req.body;
      if (carteTravailClientData.rapportCorporel) carteTravailClientData.rapportCorporel = JSON.stringify(carteTravailClientData.rapportCorporel);
      if (carteTravailClientData.rapportMecanique) carteTravailClientData.rapportMecanique = JSON.stringify(carteTravailClientData.rapportMecanique);
      if (carteTravailClientData.rapportElectrique)
        carteTravailClientData.rapportElectrique = JSON.stringify(carteTravailClientData.rapportElectrique);
      const updateCarteTravailClientData = await this.serviceCarteTravailClient.updateCarteTravailClient(
        carteTravailClientId,
        carteTravailClientData,
      );
      res.status(200).json({ data: updateCarteTravailClientData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCarteTravailClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const carteTravailClientId = Number(req.params.id);
      const deleteCarteTravailClienttData = await this.serviceCarteTravailClient.deleteCarteTravailClient(carteTravailClientId);

      res.status(200).json({ data: deleteCarteTravailClienttData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getAllStatusCarteTravailClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: StatusCarteTravail });
    } catch (error) {
      next(error);
    }
  };
}
export default CarteTravailClientController;
