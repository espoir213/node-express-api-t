import { InfosFactureEntity } from '@/entities/infos-facture.entity';
import InfosFactureService from '@/services/infos-facture.service';
import { NextFunction, Request, Response } from 'express';

class InfosFactureController {
  public serviceInfosFacture = new InfosFactureService();

  public getAllInfosFactureByIdFacture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const factureId = Number(req.params.idFacture);
      const findAllInfosFactureData = await this.serviceInfosFacture.findAllInfoFactureByIdFacture(factureId);
      res.status(200).json({ data: findAllInfosFactureData });
    } catch (error) {
      next(error);
    }
  };

  public getInfoFactureById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const infoFactureId = Number(req.params.id);
      const findOneInfoFactureData = await this.serviceInfosFacture.findInfoFactureById(infoFactureId);
      res.status(200).json({ data: findOneInfoFactureData });
    } catch (error) {
      next(error);
    }
  };

  public createInfoFacture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const infoFacture: InfosFactureEntity = req.body;
      const createInfoFactureData = await this.serviceInfosFacture.createInfoFacture(infoFacture);
      res.status(200).json({ data: createInfoFactureData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateInfoFacture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const infoFacture = Number(req.params.id);
      const infoFactureData: InfosFactureEntity = req.body;
      const updateInfoFactureData = await this.serviceInfosFacture.updateInfoFacture(infoFacture, infoFactureData);
      res.status(200).json({ data: updateInfoFactureData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteInfoFacture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const infoFacture = Number(req.params.id);
      const deleteInfoFacturetData = await this.serviceInfosFacture.deleteInfoFacture(infoFacture);

      res.status(200).json({ data: deleteInfoFacturetData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
export default InfosFactureController;
