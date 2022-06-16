import { ClientEntity } from '@/entities/client.entity';
import { InputPagination } from '@/entities/pagination';
import { RemarqueClientEntity } from '@/entities/remarque-client.entity';
import Validator from '@/middlewares/validator';
import CampagneService from '@/services/campagne.service';
import CarteTravailClientService from '@/services/carte-travail-client.service';
import ClientService from '@/services/client.service';
import ProjetService from '@/services/projet.service';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

class ClientController {
  public serviceClient = new ClientService();

  public validation = new Validator();

  public campagneService = new CampagneService();

  public projetService = new ProjetService();

  public carteTravailService = new CarteTravailClientService();

  public getAllClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllClientData = await this.serviceClient.findAllClient();

      res.status(200).json({ data: findAllClientData });
    } catch (error) {
      next(error);
    }
  };

  public getClientById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clientId = Number(req.params.id);
      const findOneClientData = await this.serviceClient.findClientById(clientId);

      res.status(200).json({ data: findOneClientData });
    } catch (error) {
      next(error);
    }
  };

  public createClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const client: ClientEntity = req.body;
      const errors = await validate(client);
      if (errors.length > 0) {
        res.status(422).json(await this.validation.validationEntity(errors));
      } else {
        const createClientData = await this.serviceClient.createClient(client);
        res.status(200).json({ data: createClientData, message: 'created' });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clientId = Number(req.params.id);
      const clientData: ClientEntity = req.body;
      const updateUserData = await this.serviceClient.updateClient(clientId, clientData);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clientId = Number(req.params.id);
      const deleteClientData = await this.serviceClient.deleteClient(clientId);
      res.status(200).json({ data: deleteClientData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getClientPaginate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inputPagination = new InputPagination();
      inputPagination.page = Number(req.params.page);
      inputPagination.pageSize = Number(req.params.pageSize || 10);

      const findUser = await this.serviceClient.findClientPaginate(inputPagination);
      res.status(200).json({ data: findUser });
    } catch (error) {
      next(error);
    }
  };

  public sendSmsClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body;
      const sms = await this.campagneService.sendSmsClient(data);
      res.status(200).json({ data: sms, message: 'send' });
    } catch (error) {
      next(error);
    }
  };

  public getAllProjetByClientId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clientId = Number(req.params.idClient);
      const findOneClientData = await this.projetService.findAllProjetByClientId(clientId);

      res.status(200).json({ data: findOneClientData });
    } catch (error) {
      next(error);
    }
  };

  public createRemarqueClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const remarque: RemarqueClientEntity = req.body;
      const errors = await validate(remarque);
      if (errors.length > 0) {
        res.status(422).json(await this.validation.validationEntity(errors));
      } else {
        const createRemarqueClientData = await this.serviceClient.createRemarqueClient(remarque);
        res.status(200).json({ data: createRemarqueClientData, message: 'created' });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteRemarqueClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const remarqueId = Number(req.params.idRermaque);
      const deleteClientData = await this.serviceClient.deleteRemarqueClient(remarqueId);
      res.status(200).json({ data: deleteClientData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ClientController;
