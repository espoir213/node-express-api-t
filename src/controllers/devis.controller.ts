import { CreateDevisDto } from '@/dtos/devis.dto';
import { DevisEntity } from '@/entities/devis.entity';
import { InputPagination } from '@/entities/pagination';
import Validator from '@/middlewares/validator';
import ActionDevisService from '@/services/action-devis.service';
import DevisService from '@/services/devis.service';
import { NextFunction, Request, Response } from 'express';

class DevisController {
  public serviceDevis = new DevisService();
  public actionDevisService = new ActionDevisService();
  public validation = new Validator();

  public getAllDevis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllDevisData = await this.serviceDevis.findAllDevis();
      res.status(200).json({ data: findAllDevisData });
    } catch (error) {
      next(error);
    }
  };

  public getDevisById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const DevisId = Number(req.params.id);
      const findOneDevisData = await this.serviceDevis.findDevisById(DevisId);
      res.status(200).json({ data: findOneDevisData });
    } catch (error) {
      next(error);
    }
  };

  public createDevis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const Devis: CreateDevisDto = req.body;
      const createDevisData = await this.actionDevisService.creactDevisAndInfos(Devis);
      res.status(200).json({ data: createDevisData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDevis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const DevisId = Number(req.params.id);
      const DevisData: DevisEntity = req.body;
      const updateDevisData = await this.serviceDevis.updateDevis(DevisId, DevisData);
      res.status(200).json({ data: updateDevisData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDevis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const DevisId = Number(req.params.id);
      const deleteDevistData = await this.serviceDevis.deleteDevis(DevisId);

      res.status(200).json({ data: deleteDevistData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getDevisPaginate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inputPagination = new InputPagination();
      inputPagination.page = Number(req.params.page);
      inputPagination.pageSize = Number(req.params.pageSize || 10);

      const findUser = await this.serviceDevis.findDevisPaginate(inputPagination);
      res.status(200).json({ data: findUser });
    } catch (error) {
      next(error);
    }
  };
}
export default DevisController;
