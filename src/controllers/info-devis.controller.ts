import { InfosDevisEntity } from '@/entities/infos-devis.entity';
import InfosDevisService from '@/services/infos-devis.service';
import { NextFunction, Request, Response } from 'express';

class InfosDevisController {
  public serviceInfosDevis = new InfosDevisService();

  public getAllInfosDevisByIdDevis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const devisId = Number(req.params.idDevis);
      const findAllInfosDevisData = await this.serviceInfosDevis.findAllInfoDevisByIdDevis(devisId);
      res.status(200).json({ data: findAllInfosDevisData });
    } catch (error) {
      next(error);
    }
  };

  public getInfoDevisById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const InfoDevisId = Number(req.params.id);
      const findOneInfoDevisData = await this.serviceInfosDevis.findInfoDevisById(InfoDevisId);
      res.status(200).json({ data: findOneInfoDevisData });
    } catch (error) {
      next(error);
    }
  };

  public createInfoDevis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const InfoDevis: InfosDevisEntity = req.body;
      const createInfoDevisData = await this.serviceInfosDevis.createInfoDevis(InfoDevis);
      res.status(200).json({ data: createInfoDevisData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateInfoDevis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const InfoDevisId = Number(req.params.id);
      const InfoDevisData: InfosDevisEntity = req.body;
      const updateInfoDevisData = await this.serviceInfosDevis.updateInfoDevis(InfoDevisId, InfoDevisData);
      res.status(200).json({ data: updateInfoDevisData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteInfoDevis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const InfoDevisId = Number(req.params.id);
      const deleteInfoDevistData = await this.serviceInfosDevis.deleteInfoDevis(InfoDevisId);

      res.status(200).json({ data: deleteInfoDevistData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
export default InfosDevisController;
