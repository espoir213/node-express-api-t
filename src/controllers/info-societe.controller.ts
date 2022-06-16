import { API_URL } from '@/config';
import { InfoSocieteEntity } from '@/entities/info-societe.entity';
import InfoSocieteService from '@/services/info-societe.service';
import { NextFunction, Request, Response } from 'express';

class InfoSocieteController {
  public serviceInfoSociete = new InfoSocieteService();

  public updateInfoSociete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const InfoSocieteId = Number(req.params.id);
      const InfoSocieteData: InfoSocieteEntity = JSON.parse(JSON.stringify(req.body));
      if (req.file) {
        const pathImage = `${API_URL}/${req.file.path}`;
        InfoSocieteData.logoEntreprise = pathImage;
      }
      const updateInfoSocieteData = await this.serviceInfoSociete.updateInfoSociete(InfoSocieteId, InfoSocieteData);
      res.status(200).json({ data: updateInfoSocieteData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public getInfoSocieteByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.idUser);
      const findOneInfoSocieteData = await this.serviceInfoSociete.findInfoSocieteByUser(userId);
      res.status(200).json({ data: findOneInfoSocieteData });
    } catch (error) {
      next(error);
    }
  };
}
export default InfoSocieteController;
