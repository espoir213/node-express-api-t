import { CreateFactureDto } from '@/dtos/facture.dto';
import { FactureEntity } from '@/entities/facture.entity';
import { InputPagination } from '@/entities/pagination';
import ActionFactureService from '@/services/action-facture.service';
import FactureService from '@/services/facture.service';
import { NextFunction, Request, Response } from 'express';

class FactureController {
  public serviceFacture = new FactureService();
  public actionFactureService = new ActionFactureService();

  public getAllFacture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllFactureData = await this.serviceFacture.findAllFacture();
      res.status(200).json({ data: findAllFactureData });
    } catch (error) {
      next(error);
    }
  };

  public getFactureById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const factureId = Number(req.params.id);
      const findOneFactureData = await this.serviceFacture.findFactureById(factureId);
      res.status(200).json({ data: findOneFactureData });
    } catch (error) {
      next(error);
    }
  };

  public createFacture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const facture: CreateFactureDto = req.body;
      const createFactureData = await this.actionFactureService.creactFactureAndInfos(facture);
      res.status(200).json({ data: createFactureData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateFacture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const factureId = Number(req.params.id);
      const factureData: FactureEntity = req.body;
      const updateFactureData = await this.serviceFacture.updateFacture(factureId, factureData);
      res.status(200).json({ data: updateFactureData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteFacture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const factureId = Number(req.params.id);
      const deleteFacturetData = await this.serviceFacture.deleteFacture(factureId);

      res.status(200).json({ data: deleteFacturetData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getFacturePaginate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inputPagination = new InputPagination();
      inputPagination.page = Number(req.params.page);
      inputPagination.pageSize = Number(req.params.pageSize || 10);

      const findUser = await this.serviceFacture.findFacturePaginate(inputPagination);
      res.status(200).json({ data: findUser });
    } catch (error) {
      next(error);
    }
  };

  public getAllFactureByStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const status = Number(req.params.status);
      const findAllFactureData = await this.serviceFacture.findAllFactureByStatus(status);
      res.status(200).json({ data: findAllFactureData });
    } catch (error) {
      next(error);
    }
  };
}
export default FactureController;
