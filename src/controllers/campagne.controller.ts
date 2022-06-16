import { CampagneEntity, typeDest } from '@/entities/campagne.entity';
import { InputPagination } from '@/entities/pagination';
import Validator from '@/middlewares/validator';
import CampagneService from '@/services/campagne.service';
import ClientService from '@/services/client.service';
import { NextFunction, Request, Response } from 'express';

class CampagneController {
  public serviceCampagne = new CampagneService();
  public clientService = new ClientService();
  public validation = new Validator();

  public getAllCampagne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCampagneData = await this.serviceCampagne.findAllCampagne();
      res.status(200).json({ data: findAllCampagneData });
    } catch (error) {
      next(error);
    }
  };

  public getCampagneById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const CampagneId = Number(req.params.id);
      const findOneCampagneData = await this.serviceCampagne.findCampagneById(CampagneId);
      res.status(200).json({ data: findOneCampagneData });
    } catch (error) {
      next(error);
    }
  };

  public createCampagne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const Campagne: CampagneEntity = req.body;

      const createCampagneData = await this.serviceCampagne.createCampagne(Campagne);
      res.status(200).json({ data: createCampagneData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCampagne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const CampagneId = Number(req.params.id);
      const deleteCampagnetData = await this.serviceCampagne.deleteCampagne(CampagneId);

      res.status(200).json({ data: deleteCampagnetData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getCampagnePaginate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inputPagination = new InputPagination();
      inputPagination.page = Number(req.params.page);
      inputPagination.pageSize = Number(req.params.pageSize || 10);

      const findUser = await this.serviceCampagne.findCampagnePaginate(inputPagination);
      res.status(200).json({ data: findUser });
    } catch (error) {
      next(error);
    }
  };

  public getAllTypeDestCampagne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: typeDest });
    } catch (error) {
      next(error);
    }
  };

  public getAllCampagneRecipientsByIdCampagne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const CampagneId = Number(req.params.id);
      const findCampagneData = await this.serviceCampagne.getAllCampaignRecipientsByIdCampagne(CampagneId);
      res.status(200).json({ data: findCampagneData });
    } catch (error) {
      next(error);
    }
  };
}
export default CampagneController;
